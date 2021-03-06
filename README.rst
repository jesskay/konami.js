=========
konami.js
=========

Because reinventing the wheel is fun. That and the other konami.js wasn't
working for a friend, while this approach was.

How to use
==========

1. Include the script into your page, either from your own domain (preferred, if
   your traffic is medium-to-high), or http://msjessi.ca/konami.js (if you don't
   need SSL, or you haven't got web space you can freely upload to).

   (You may also use konami.js as an AMD module with any compatible loader
   (such as RequireJS), in which case you should use the module reference itself
   as a constructor instead of the global "Konami" object in the examples below.)

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

4. Also optionally, you may pass in a URL instead of a function, in which case
   users will be redirected to that instead::

    var konami = new Konami("http://www.example.com/");

5. You're done! Unless you want to customize it a little, in which case, see
   below.


Customizing
===========

For 99% of cases, this won't be useful, but the options are there if you want
them.

A different code
----------------

If you only want to use keycodes in the ranges A-Z, a-z, 0-9, then you can take
a shortcut by using the ``codeFromAlphaNumString`` method on your object::

    var konami = new Konami(function() {
        // do some stuff here
    });
    konami.codeFromAlphaNumString('konami');

``codeFromAlphaNumString`` will fail and return ``false`` if given a string
containing invalid characters, or return ``true`` if it was able to successfully
set the code.

If you want to use key codes outside that range, instead change the ``code``
property on your object to the array of keycodes you'd like to use as the
trigger, for example (using the classic code in reverse except for return)::

    var konami = new Konami(function() {
        // do some stuff here
    });
    konami.code = [65, 66, 39, 37, 39, 37, 40, 40, 38, 38, 13];

Changing movement prevention dynamically
----------------------------------------

If you want your object to only consume movement keypresses some of the time,
change its ``preventMovement`` property to ``true`` or ``false`` in appropriate parts
of your code.

Changing the target function/URL
--------------------------------

You can even change the target function/URL at a point after your object's
created, by setting its ``target`` property to a different value. For example,
you could use such a change to have it call a different function the second time
it's fired, by setting ``target`` inside the original function.
