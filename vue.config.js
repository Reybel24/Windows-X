module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/style/main.scss";'
      }
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
};
