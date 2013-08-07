mobile-skeleton
===============

### JQuery Mobile/RequireJS Skeleton w/ query parameter option

This project combines the following into a usable starter-kit/skeleton:

* `jQuery`
* `jQuery Mobile`
* `RequireJS`

It modifies the above in two ways:

* `RequireJS` is a non-breaking customized version of RequireJS.  It allows a defaultExt configuration option that allows you to default to .min.js extensions.  If you overwrite this with the current RequireJS release, it will still work, but it will grab the .js files instead.  This is a useful feature for me because my IDE: phpStorm automatically generates the .min.js files next to my .js files as I modify them.
* `xing/hash` is a JQuery Mobile override AMD module.  The xing/hash file disables jQuery mobile's hash listening so that its own hash listener can be used.  The xing/hash listener allows you to put query parameters into the URL such as: #somePageName?id=3.  What this means is that you can give someone a link to a specific page on your site that will load the right data based on the URL like in traditional web pages.

See `page/facility.js` for an example of how to retrieve query parameters.

In the event you are using a button rather than an anchor tag and you want to change the hash with that button, rather than writing any JavaScript, etc., `xing/hash` also sets up a listener that listens for any click on an element with `[data-toggle=page]` and will change the page to what is set in the `data-target` attribute.

## Note

I will work on extending the examples over time so that you can see a way to where something like page/facility.js can either A) show the data already loaded (if the last time you went to the page it was ?id=3 and it's the same the next time you go there), or B) load up new data when that data is not loaded.

Other dependencies, such as verifying that when a person goes to a link that they are logged in, have permission, etc., is beyond the scope of what this is for--for the time being.