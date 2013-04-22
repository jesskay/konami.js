konami.js
=========

Because reinventing the wheel is fun. That and the other konami.js wasn't
working for a friend, while this approach was.

How to use
----------

1. Include the script into your page, either from your own domain (preferred, if
   your traffic is medium-to-high), or http://psquid.eu/konami.js (if you don't
   need SSL, or you haven't got web space you can freely upload to).

2. In your code, create a new Konami object, passing in the function for it to
   call when the code is recognized::

    var konami = new Konami(function() {
        // do some stuff here
    });

3. Optionally, you may also pass in a second truthy parameter to have it consume
   movement keypresses, though this is usually only useful on a single-purpose
   site, rather than as an easter egg on a "real" site, where folks may actually
   want to scroll with the keyboard::

    var konami = new Konami(function() {
        // do some stuff here
    }, true);

4. You're done!
