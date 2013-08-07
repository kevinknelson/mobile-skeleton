JQuery Mobile / RequireJS AMD Skeleton
===============

## Features
* Query parameters (e.g. #page-name?id=3) so that stateless, external links are possible.
* Lazy-load of page scripts.  Don't load the script for #page2 until the user visits #page2

The most important aspects of this project are that it is an AMD approach to JQuery Mobile.  When you change pages, if that page has a data-script attribute, it will lazy load that script file on the first page load automatically.  This eliminates the need to load all of your scripts before you need them.  Using RequireJS for AMD allows us to, additionally, load up requirements for individual pages (e.g. a datetimepicker) only as needed.

This project combines the following into a usable starter-kit/skeleton by combining:

* `jQuery`
* `jQuery Mobile`
* `RequireJS`

It modifies the above in two ways:

* `RequireJS` is a non-breaking customized version of RequireJS.  It allows a defaultExt configuration option that allows you to default to .min.js extensions.  If you overwrite this with the current RequireJS release, it will still work, but it will grab the .js files instead.  This is a useful feature for me because my IDE: phpStorm automatically generates the .min.js files next to my .js files as I modify them.
* `xing/hash` is a JQuery Mobile override AMD module.  You should NOT use JQuery mobiles changePage method and instead use xing/hash.  The xing/hash file disables jQuery mobile's hash listening so that its own hash listener can be used.  The xing/hash listener will
  * change the page (it makes a sub-call to jQuery.mobile.changePage after wiring up the other features)
  * allow query parameters in the URL (e.g. #page-name?id=3)
  * lazy-load the page script needed for that specific page if one is specified on the data-role=page tag.

See index.html data-role=page tags for examples of including page scripts.

See `page/facility.js` for an example of how to retrieve query parameters.

In the event you are using a button rather than an anchor tag and you want to change the hash with that button, rather than writing any JavaScript, etc., `xing/hash` also sets up a listener that listens for any click on an element with `[data-toggle=page]` and will change the page to what is set in the `data-target` attribute.

## Note

I will work on extending the examples over time so that you can see a way to where something like page/facility.js can either A) show the data already loaded (if the last time you went to the page it was ?id=3 and it's the same the next time you go there), or B) load up new data when that data is not loaded.

Other dependencies, such as verifying that when a person goes to a link that they are logged in, have permission, etc., is beyond the scope of what this is for--for the time being.

* * *

Author: Kevin K. Nelson [http://xingcreative.com](http://xingcreative.com/)
* hopefully obvious, but just in case, I'm not claiming to have authored jQuery or RequireJS

Copyright © 2013 Kevin K. Nelson | MIT license