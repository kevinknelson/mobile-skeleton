require.config({
    baseUrl: 'scripts',
    defaultExt: '.min.js',
    paths: {
        jquery:         'lib/jquery',
        jqueryMobile:   'lib/jquery-mobile'
    },
    shim: {
        'jqueryMobile': {
            deps: ['jquery'],
            exports: 'jQuery.mobile'
        }
    }
});

requirejs(['jquery','jqueryMobile','xing/hash'],function($,$mobile,hash) {

});