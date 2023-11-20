import { defineConfig, presetWind } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetWind()
  ],

  transformers: [
    transformerDirectives(),
  ],

  shortcuts: []
})
