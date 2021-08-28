/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

/**
 * Customise webpack config.
 */
exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /.jsonc$/,
          use: [
            {
              loader: `jsonc-loader`,
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@data': path.resolve(__dirname, 'src/data'),
        '@atoms': path.resolve(__dirname, 'src/atoms'),
        '@helpers': path.resolve(__dirname, 'src/helpers'),
        '@announcement-data': path.resolve(__dirname, 'src/announcement-data'),
      },
    },
  })
}