BLASTER
=======

Node.js app for blasting http-servers with requests. Cli and gui both included.
Gui-version made with appjs, so node-gyp is required (for gui only).

Usage:
------
cli:
```
node blaster http://someurl ammo caliber
```

gui:
* install node-gyp with `npm install node-gyp -g`
* install appjs with `npm install appjs`
Then run the gui:
```
node --harmony app.js
```

url defaults to localhost, ammo and caliber default to 100.

(ammo = number of requests, caliber = max sockets used)

Credits:
--------
Inspiration from Killswitch's [joker.js](https://github.com/killswitch/joker.js)

Disclaimer:
-----------
I'm not responsible for the damage you might cause with blaster.

_Blast with care._
