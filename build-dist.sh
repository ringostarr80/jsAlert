#!/bin/sh

set -e

rm -rf dist
# tsc
tsc --target ES2015 --module es2015 --outDir ./dist --rootDir ./src --strict --sourceMap --declaration --esModuleInterop
mv dist/jsAlerts.js dist/jsAlerts.esm.js
mv dist/jsAlerts.js.map dist/jsAlerts.esm.js.map
mv dist/jsAlerts.d.ts dist/jsAlerts.esm.d.ts
sed -i 's/sourceMappingURL=jsAlerts.js.map/sourceMappingURL=jsAlerts.esm.js.map/g' dist/jsAlerts.esm.js
sed -i 's/"file":"jsAlerts.js"/"file":"jsAlerts.esm.js"/g' dist/jsAlerts.esm.js.map
tsc --target ES2015 --module none   --outDir ./dist --rootDir ./src --strict --sourceMap --declaration --esModuleInterop
sed -i 's/"use strict";/"use strict";\nif (typeof window["exports"] === "undefined") {\n\twindow["exports"] = {};\n}/g' dist/jsAlerts.js

cp src/jsAlerts.css dist
mkdir -p dist/Font-Awesome/css
cp src/Font-Awesome/css/all.min.css dist/Font-Awesome/css
mkdir -p dist/Font-Awesome/webfonts
cp src/Font-Awesome/webfonts/* dist/Font-Awesome/webfonts
