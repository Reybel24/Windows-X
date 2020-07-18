module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/style/main.scss";'
      }
    }
  }
};
