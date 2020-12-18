
module.exports = {

  async redirects() {
    return [
      // Path Matching - will match `/old-blog/a`, but not `/old-blog/a/b`
      {
        source: '/post/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
    ]
  },
}