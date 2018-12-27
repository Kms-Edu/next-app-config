const nextConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  webpack: (config, {isServer}) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
      bufferutil: 'empty',
      'utf-8-validate': 'empty',
    }

    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    })

    if (config.mode === 'production') {
      const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      }
      
      const Critters = require('critters-webpack-plugin');
      config.plugins.concat([
        new Critters({preload: 'swap'})
      ])
            
    }
    config.module.rules.push(
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      }
    )

    //config.output.publicPath = `${prefix}${config.output.publicPath}`;

    return config
  }
}

module.exports = nextConfig
