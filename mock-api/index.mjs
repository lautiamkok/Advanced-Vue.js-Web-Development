// Require Node.js v16.9.1
// https://nodejs.org/api/esm.html
// $ sudo npm install n -g
// For the latest stable version:
// $ sudo n stable
// For the latest version:
// $ sudo n latest

import markdownJson from 'markdown-json'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync } from 'fs'
import { nanoid } from 'nanoid'

async function jsonifyMarkDown (namespace, filepath) {
  let array = filepath.split('/')
  let source = array[0]
  let directory = array[1]

  // Markdown to json.
  // https://github.com/klaytonfaria/markdown-json
  const settings = {
    name: namespace,
    cwd: './',
    src: `${source}/`,
    filePattern: `${directory}/**/*.md`,
    ignore: '**/*(drafts|archive)/**',
    dist: `${filepath}${namespace}.json`,
    metadata: true
  }
  await markdownJson(settings)

  // Retrieve the json file and get its content.
  var jsonFile = `${filepath}${namespace}.json`
  var string = readFileSync(jsonFile, 'utf8')
  var parsed = JSON.parse(string)

  // Loop the data object and add nanoid if needed alongside id, for example:
  // id: products__product-1__index
  // nanoid: 4aWJBG5wd3g59yqs3z_tj
  // https://github.com/ai/nanoid
  // https://stackoverflow.com/a/5737136/413225
  Object.keys(parsed.data).forEach(key => {
    parsed.data[key].nanoid = nanoid()

    // To replace id with nanoid.
    // parsed.data[key].id = nanoid()
  })

  return parsed.data
}

async function addData () {
  console.log('adding data...')
  const pages = await jsonifyMarkDown('pages', 'content/pages/')
  const products = await jsonifyMarkDown('products', 'content/products/')
  const posts = await jsonifyMarkDown('posts', 'content/posts/')
  const layouts = await jsonifyMarkDown('layouts', 'content/layouts/')

  // Set default data.
  const data = {
    pages,
    products,
    posts,
    layouts
  }

  // Get the current file's URL, e.g. file:///home/lau/Desktop/.../per-route/index.mjs
  // Turn the URL to path, e.g. /home/lau/Desktop/.../per-route/index.mjs
  // Get the path only, e.g. /home/lau/Desktop/.../per-route
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const file = join(__dirname, 'db.json')

  // Turn json to string before saving the data into a json file.
  const string = JSON.stringify(data)
  writeFileSync(file, string)
  console.log('data added completely.')
}
await addData()
