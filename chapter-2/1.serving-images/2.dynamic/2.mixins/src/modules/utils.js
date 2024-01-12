'use strict'

const baseUrl = import.meta.env.BASE_URL

function getAsset (file) {
  if (!file) {
    return
  }
  const images = import.meta.globEager('/src/assets/images/*.{jpg,png,svg}')
  return images[`${baseUrl}src/assets/images/${file}`].default
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
