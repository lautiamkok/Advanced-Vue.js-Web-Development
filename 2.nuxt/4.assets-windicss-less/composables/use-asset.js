'use strict'

export default (src) => {
  if (!src) {
    return
  }

  const array = src.split('/')
  const filename = [...array].pop()
  const images = import.meta.globEager('/assets/images/*.{jpg,jpeg,png,svg}')
  const image = images[`/assets/images/${filename}`]
  if (image !== undefined) {
    return image.default
  }
  console.log(`${filename} doesn't exist locally!`)

  // Get the image from the remote API if it has the full URL path already.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  return
}
