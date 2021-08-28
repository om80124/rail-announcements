const __IS_DEV__ = process.env.NODE_ENV !== 'production'

// These plugins will only be used in production builds
const prodPlugins = !__IS_DEV__
  ? [
      {
        resolve: 'gatsby-plugin-remove-console',
        options: {
          exclude: ['error', 'warn'],
        },
      },
      // Fixed hot reload in dev
      `gatsby-plugin-preact`,
    ]
  : []

module.exports = {
  siteMetadata: {
    siteUrl: 'https://rail-announcements.davwheat.dev',
    title: 'Rail Announcements',
    description: 'Announcements for the UK rail network',
    author: '@davwheat',
  },
  plugins: [...prodPlugins, `gatsby-plugin-react-head`, `gatsby-plugin-material-ui`, `gatsby-plugin-less`],
}