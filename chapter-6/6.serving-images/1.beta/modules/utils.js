'use strict'

function getAsset (file) {
  if (!file) {
    return
  }
  const images = import.meta.globEager('/assets/images/*.{jpg,png,svg}')
  const image = images[`/assets/images/${file}`]
  if (image !== undefined) {
    return image.default
  }

  console.log(`${file} doesn't exist locally!`)
}

function getStatic (file) {
  if (!file) {
    return
  }
  return '/static/' + file
}

export {
  getAsset,
  getStatic,
}
