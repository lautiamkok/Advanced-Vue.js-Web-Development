// https://cli.vuejs.org/guide/webpack.html
var webpack = require('webpack')
var path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Styles: path.resolve(__dirname, './src/assets/stylesheets/'),
      }
    },
  },

  // https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
  css: {
    loaderOptions: {
      // pass options to sass-loader
      // @/ is an alias to src/
      // so this assumes you have a file named `src/variables.sass`
      // Note: this option is named as "prependData" in sass-loader v8
      sass: {
        // additionalData: `@import "~@/variables.sass"`
      },
      // by default the `sass` option will apply to both syntaxes
      // because `scss` syntax is also processed by sass-loader underlyingly
      // but when configuring the `prependData` option
      // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
      // in that case, we can target the `scss` syntax separately using the `scss` option
      scss: {
        // additionalData: `@import "~@/variables.scss";`
      },

      less:{
        additionalData: `@import "~Styles/less/variables.less";`
      }
    }
  }
}
