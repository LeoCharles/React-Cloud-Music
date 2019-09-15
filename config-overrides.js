const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  // 配置别名
  addWebpackAlias({
    '@': resolve('src'),
    'views': resolve('src/views'),
    'components': resolve('src/components'),
  })
);