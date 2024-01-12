# Build Setup

Note that this app requires the JSON API & Server.

## Vue

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production
$ npm run build
```

## JSON API & Server

```bash
# install JSON Server globally if it is not previously installed
$ sudo npm install -g json-server

# convert markdown to JSON
$ node index.mjs

# serve with hot reload at localhost:3001
$ json-server --watch db.json --port 3001
```
