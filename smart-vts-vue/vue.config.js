const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        ws: true,
        onProxyReq(proxyReq) {
          console.log('Proxying request to:', proxyReq.path);
        },
        onError(err, req, res) {
          console.error('Proxy error:', err);
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Add this line
      },
    },
  },
});

