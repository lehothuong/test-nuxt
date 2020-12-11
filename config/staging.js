// import axios from 'axios';
module.exports = {
  axios: {
    baseURL: "https://api-staging.gocashback.vn"
  },
  server: {
    port: 3000 // default: 3000
  },
  proxy: true,
  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      user: "/tai-khoan",
      callback: false,
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/v2/accounts/authentication",
            method: "post",
            propertyName: "data.token"
          },
          user: false,
          logout: false
        }
      },
      facebook: {
        client_id: "2959254037497665",
        userinfo_endpoint: false,
        scope: ["public_profile", "email"],
        redirect_uri:
          "https://web-staging.gocashback.vn/social-auth/callback?provinkey=facebook",
        token_key: "access_token",
        token_type: "Bearer"
      },
      google: {
        client_id:
          "264926724995-tgagfba4p6auiv0ril43fgd4frn3sigu.apps.googleusercontent.com",
        redirect_uri:
          "https://web-staging.gocashback.vn/social-auth/callback?provinkey=google",
        userinfo_endpoint: false,
        token_key: "access_token",
        token_type: "Bearer"
      }
    }
  },
  build: {
    vendor: ["axios"],
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: "src"
        }
      }
    },
    // filenames: {
    //   app: "[name].[chunkhash].js"
    // },

    extractCSS: true,
    html: {
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        decodeEntities: false,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },

    optimization: {
      minimize: true,
      occurrenceOrder: true,
      usedExports: true,
      concatenateModules: true,
      moduleIds: "named",
      removeAvailableModules: true,
      removeEmptyChunks: true,
      sideEffects: true,
      runtimeChunk: true,
      splitChunks: {
        maxSize: 5120000,
        minSize: 30000,
        chunks: "all",
        automaticNameDelimiter: ".",
        automaticNameMaxLength: 30,
        maxAsyncRequests: 7,
        name: true,
        cacheGroups: {
          vendors: {
            name: true,
            test: /[\\/]node_modules[\\/]/,
            chunks: "all"
          },
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      });
    }
  }
};
