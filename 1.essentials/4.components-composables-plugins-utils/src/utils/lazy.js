'use strict'

// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve

function preloadAsset(target) {
  if (target.nodeName === 'VIDEO') {
    const sourceElement = target.getElementsByTagName('source')[0]
    const srcAttribute = sourceElement.getAttribute('data-src')
    if (!srcAttribute) { 
      return
    }
    sourceElement.src = srcAttribute
    target.load()
  }

  if (target.nodeName === 'IMG') {
    const src = target.getAttribute('data-src')
    if (!src) { 
      return
    }
    target.src = src
  }

  if (target.nodeName === 'DIV') {
    const src = target.getAttribute('data-bg-img')
    if (!src) { 
      return
    }
    target.style.backgroundImage = `url(${src})`
  }
  return
}

function callback (entries, observer) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      // Set `data-src` to `src`.
      preloadAsset(entry.target)

      // Stop watching after loading.
      observer.unobserve(entry.target)
    }
  })
}

export default class Lazy {
  constructor (selector = '.lazy', options) {
    const defaults = {
      rootMargin: '0px 0px 50px 0px', // must be in pixel or percentage.
      threshold: 0
    }

    if (selector instanceof Element) {
      this.element = selector || null
    }

    if (selector instanceof NodeList) {
      this.nodeList = selector || null
    }

    if (typeof selector === 'string') {
      this.nodeList = document.querySelectorAll(selector)
    }

    if (this.nodeList instanceof NodeList 
      && this.nodeList.length === 0
    ) {
      this.nodeList = null
    }

    if (this.element || this.nodeList) {
      this.observer = new IntersectionObserver(callback, options || defaults)
    }
  }

  observe () {
    if (this.element) {
      this.observer.observe(this.element)
    }

    if (this.nodeList) {
      this.nodeList.forEach(item => {
        this.observer.observe(item);
      })
    }
  }
}
