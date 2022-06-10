'use strict'

import { example1, example2 } from './utils'

export default class Sample {
  constructor (options) {
    this.data = {}
  }

  async multiply (number) {
    console.log(await example1())
    console.log(await example2())
    return number * 2
  }
}
