#!/bin/sh

set -e

rm -rf dist
# tsc
tsc --target ES2015 --module es2015 --outDir ./dist --rootDir ./src --strict --sourceMap --declaration --esModuleInterop
mv dist/jsAlert.js dist/jsAlert.esm.js
mv dist/jsAlert.js.map dist/jsAlert.esm.js.map
mv dist/jsAlert.d.ts dist/jsAlert.esm.d.ts
sed -i '' 's/sourceMappingURL=jsAlert.js.map/sourceMappingURL=jsAlert.esm.js.map/g' dist/jsAlert.esm.js
sed -i '' 's/"file":"jsAlert.js"/"file":"jsAlert.esm.js"/g' dist/jsAlert.esm.js.map
tsc --target ES2015 --module none   --outDir ./dist --rootDir ./src --strict --sourceMap --declaration --esModuleInterop
sed -i '' 's/"use strict";/"use strict";\nif (typeof window["exports"] === "undefined") {\n\twindow["exports"] = {};\n}/g' dist/jsAlert.js

cp src/jsAlert.css dist
mkdir -p dist/Font-Awesome/css
cp src/Font-Awesome/css/all.min.css dist/Font-Awesome/css
mkdir -p dist/Font-Awesome/webfonts
cp src/Font-Awesome/webfonts/* dist/Font-Awesome/webfonts
