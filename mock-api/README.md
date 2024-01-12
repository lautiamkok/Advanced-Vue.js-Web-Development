# Mock API

A REST API for mocking data with Markdown documents.

## Build Setup

```bash
# 1. Install JSON Server globally if it is not previously installed
$ sudo npm install -g json-server

# 2. Convert markdown documents to JSON
$ node index.mjs

# 3.1. Serve with hot reload at localhost:3001
$ json-server --watch db.json --port 3001

# 3.2. Serve with hot reload at localhost:3001 with static assets
$ json-server --watch db.json --port 3001 --static ./content

# 3.3. Serve with hot reload at localhost:3001 with middlewares
$ json-server --watch db.json --port 3001 --middlewares middleware.js
```
