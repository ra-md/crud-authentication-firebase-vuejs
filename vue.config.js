// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin({
      	match (originalTag, { kebabTag, camelTag, path, component }) {
      		if (kebabTag.startsWith('core-')) {
      			return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
      		}
      	}
      }),
      // new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({
      	'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
  },
}