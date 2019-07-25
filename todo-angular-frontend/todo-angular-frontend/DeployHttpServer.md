
#HttpServer

install http-server globally if not installed
## NPM
npm install http-server -g
## YARN
yarn add http-server -g


#Build

ng build --prod --aot --output-hashing=none


You can use http-server for doing so. First of all generate a build using the command ng build --prod --aot --output-hashing=none. This will create a dist folder in your directory structure.

After this, run http-server ./dist, which will start serving your project from dist folder.

Make sure you have installed http-server globally using

npm install http-server -g
For reference, see https://www.npmjs.com/package/http-server
