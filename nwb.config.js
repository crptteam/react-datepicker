module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactDatePicker',
      externals: {
        react: 'React'
      }
    }
  },
  compat: {
    enzyme: true
  }
};
