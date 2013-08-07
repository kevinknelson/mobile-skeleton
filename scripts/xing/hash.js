define(['jquery','jqueryMobile'],function($) {
    //region MAKE LOCAL VARS TO ALLOW MINIFIER TO SHRINK MORE:
    var windowInstance      = window,
        documentInstance    = document,
    //endregion

    //region PRIVATE MEMBERS/METHODS (NOTE, ASSUMING COMMA IS ABOVE TO NOT NEED var)
    _get                = {},
    _currentHash        = null,
    _getKeyValuePair    = function( arr ) {
        return { key:arr[0], value:arr[1] };
    },
    _setUrlParams       = function( queryStringParams ) {
        _get                = {};
        var params          = queryStringParams.split('&');
        $.each( params, function( index, param )  {
            var keyValue    = _getKeyValuePair(param.split('='));
            if( typeof _get[keyValue.key] == 'undefined' ) {
                _get[keyValue.key]   = keyValue.value;
            }
            else if( typeof _get[keyValue.key] == 'object' ) {
                _get[keyValue.key].push(keyValue.value);
            }
            else {
                _get[keyValue.key]  = [ _get[keyValue.key], keyValue.value ];
            }
            _get[keyValue[0]] = keyValue[1];
        } );
    },
    //endregion

    //region LITERAL CLASS DEFINITION: hash (NOTE, ASSUMING COMMA IS ABOVE TO NOT NEED var)
    hash         = {
        get             : function( key ) {
            return typeof _get[key] == 'undefined' ? null : _get[key];
        },
        changePage      : function(hash) {
            var urlSplit        = hash.split('?');
            var pageId          = urlSplit[0];
            if( typeof urlSplit[1] != 'undefined' ) {
                _setUrlParams(urlSplit[1]);
            }
            var $page       = $(pageId);
            var script      = $page.data('script');
            if( script != null && _currentHash != hash ) {
                requirejs([script], function() {
                    $page.trigger('scriptloaded');
                });
            }
            if( typeof hash != 'undefined' && hash != _currentHash ) {
                _currentHash            = hash;
                $.mobile.changePage(hash);
            }
        }
    };
    //endregion

    //region EVENT HANDLERS
    $.mobile.hashListeningEnabled = false; // turn off mobile's hash listening and turn on our own
    $(windowInstance).on('hashchange',function(e) {
        if( windowInstance.location.hash != _currentHash ) {
            hash.changePage(windowInstance.location.hash);
        }
    });
    //instead of changing hash directly, we can make buttons with data-toggle=page and data-target='#hashPath'
    $(documentInstance).on('click.page','[data-toggle=page]',function(e) {
        windowInstance.location.hash = $(this).data('target');
    });
    //stop query parameters from going through jquery's processing to avoid errors
    $(documentInstance).bind("pagebeforechange", function( e, data ) {
        if( typeof data.toPage === "string" && data.toPage.indexOf('?') > -1 ) {
            data.options.dataUrl    = data.toPage;
            data.toPage             = data.toPage.split('?')[0];
        }
    });
    //check the URL when DOM ready so we can reload pages by path
    $(documentInstance).ready( function() {
        hash.changePage(windowInstance.location.hash);
    });
    //endregion

    return hash;
});