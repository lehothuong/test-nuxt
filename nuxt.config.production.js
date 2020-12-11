const gtmID = "G-X5CMTF51RW";
const gtmHeadTag = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmID}');`;
// const gtmBodyTag = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}" height="0" width="0" style="display:block;visibility:hidden"><div class="global" style="position: absolute; width: 100%;height: 100%;background-color: #f8f8f8;z-index: 9999;display: flex;align-items: center;justify-content: center;"><div style="border-radius: 5px;width: 447px;height: 169px;border: 1px solid #ccc;background-color: #fff;padding: 2rem;"><h6 style="margin-bottom: 0.55rem;padding-bottom: 0.5rem;border-bottom: 1px solid #ccc;">Yêu cầu Javascript</h6><p>Chúng tôi rất tiếc, nhưng trang web sẽ không hoạt động đúng nếu không bật JavaScript. Xin vui lòng bật JavaScript và bấm (F5) để tải lại trang</p></div></div></iframe>`
const gtmBodyTag = `<div class="global" style="position: fixed; width: 100%;height: 100%;background-color: #f8f8f8;z-index: 9999;display: flex;align-items: center;justify-content: center;"><div style="border-radius: 5px;width: 340px;height: 169px;border: 1px solid #ccc;background-color: #fff;padding: 2rem;"><h6 style="font-weight: 700;margin-bottom: 0.55rem;padding-bottom: 0.5rem;border-bottom: 1px solid #ccc;">Yêu cầu Javascript</h6><p>Chúng tôi rất tiếc, nhưng trang web sẽ không hoạt động đúng nếu không bật JavaScript. Xin vui lòng bật JavaScript và bấm (F5) để tải lại trang</p></div></div>`;

let config = {};
let environment = process.env.NODE_ENV;

if (process.env.NODE_ENV === "production") {
  config = require("./config/production");
  // config = require("./config/staging");
}
// else if(process.env.NODE_STAGING === "staging") {
//   config = require("./config/staging");
// }
else {
  config = require("./config/development");
}

export default {
  ...config,
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "goCASHBACK - Thỏa sức mua sắm, Hoàn tiền liền tay",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, target-densityDpi=device-dpi"
      },
      {
        name: "keywords",
        content: "mua sắm nhận hoàn tiền, mua hàng online, hoàn tiền, nhận hoàn tiền, so sánh giá, xem giá tốt, mã giảm giá, giảm giá, chiết khấu, mã voucher, cash back"
      },
      {
        hid: "description",
        name: "description",
        content: "Mua sắm online và nhận hoàn tiền lên đến 15% từ goCASHBACK"
      },
      {
        hid: "image",
        property: "image",
        content: "https://d604u3cjqmj8m.cloudfront.net/resources/images/img-thumb-default.jpg"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://gocashback.vn"
      },
      {
        hid: "fb:app_id",
        property: "fb:app_id",
        content: "2959254037497665"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "goCASHBACK - Thỏa sức mua sắm, Hoàn tiền liền tay"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Mua sắm online và nhận hoàn tiền lên đến 15% từ goCASHBACK"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://d604u3cjqmj8m.cloudfront.net/resources/images/img-thumb-default.jpg"
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: "https://d604u3cjqmj8m.cloudfront.net/resources/images/img-thumb-default.jpg"
      }
    ],
    link: [{
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swa' }
    ],

    script: [{
        src: "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
      },
      {
        src: "https://apis.google.com/js/client.js"
      },
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'data-ad-client': "ca-pub-1622625342438585",
        async: true
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=AW-613926557",
        async: true
      },
      {
        hid: "gtmHead",
        innerHTML: gtmHeadTag
      }
    ],
    noscript: [{
      hid: "gtmBody",
      innerHTML: gtmBodyTag,
      body: false
    }],
    __dangerouslyDisableSanitizersByTagID: {
      gtmHead: ["innerHTML"],
      gtmBody: ["innerHTML"]
    }
  },
  webfontloader: {
    // google: {
    //   families: ["Nunito+Sans:400;600;700"] //Loads Lato font with weights 400 and 700
    // }
    custom: {
      families: [
          'Nunito+Sans:n4,n6,n7',
          'Roboto:n5'
      ],
      urls: [
          // for each Google Fonts add url + options you want
          // here add font-display option
          'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Roboto:wght@500&display=swap',
          'https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap'
      ]
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#00A896"
  },
  /*
   ** Global CSS
   */
  css: ["ant-design-vue/dist/antd.css"],
  resetOnError: false,
  rewriteRedirects: true,
  fullPathRedirect: false,
  cookie: {
    prefix: "auth.", // Default token prefix used in building a key for token storage in the browser's localStorage.
    options: {
      // path: '/', // Path where the cookie is visible. Default is '/'.
      // expires: 5, // Can be used to specify cookie lifetime in Number of days or specific Date. Default is session only.
      // domain: '', // Domain (and by extension subdomain/s) where the cookie is visible. Default is domain and all subdomains.
      // secure - false, // Sets whether the cookie requires a secure protocol (https). Default is false, should be set to true if possible.
    }
  },
  watchLoggedIn: true,
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/day.js",
    "@/plugins/antd-ui",
    "@/plugins/mixin",
    "@/plugins/vee-validate",
    "@/plugins/helpers",
    "@/plugins/auth.js",
    "@/plugins/firebase.js",
    "@/plugins/axios",
    {
      src: "@/plugins/v-calendar.js",
      mode: "client"
    },
    {
      src: "@/plugins/hotjar.js",
      mode: "client"
    },
    {
      src: '@/plugins/vue-fb-customer-chat.js',
      ssr: false
    },
    {
      src: '@/plugins/gtag.js',
      mode: 'client'
    },
    {
      src: '@/plugins/pixelRegister.js',
      mode: "client"
    },
    {
      src: '@/plugins/nuxt-client-init.js',
      mode: false
    },

    // { src: "@/plugins/freshChat.js", mode: "client" }
  ],
  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://gocashback.vn",
    filter({
      routes
    }) {
      return routes.map(route => {
        route.url = `${route.url}/`;
        return route;
      });
    },
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false
    // routes: routes
  },
  // serverMiddleware: [
  //   '@/middleware/auth'
  // ],
  router: {
    // perfetchLinks:true,
    // scrollBehavior: function(to, from, savedPosition) {
    //   return { x: 0, y: 0 };
    // },
    middleware: ["auth-access"]
  },
  env: {
    NODE_STAGING: "staging",
    client_id: "cbweb_8411c6b02a12cacf0966e3b85d82f0ff",
    client_secret: "16e7c87aa0bbe707580cbdd092509dad"
  },
  css: ["@/assets/scss/main.scss"],
  manifest: {
    name: "goCASHBACK - Thỏa sức mua sắm, Hoàn tiền liền tay",
    short_name: "goCASHBACK",
    lang: "vi",
    display: "standalone",
    description: "Mua sắm online và nhận hoàn tiền lên đến 15% từ goCASHBACK",
    theme_color: "#ff599a"
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  //   auth: {
  //     plugins: [ '@/plugins/auth.js' ]
  //  },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/pwa",
    "vue-sweetalert2/nuxt",
    "cookie-universal-nuxt",
    ["bootstrap-vue/nuxt"],
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-webfontloader",
    "@nuxtjs/device"
  ],
  robots: {
    UserAgent: "*",
    Allow: "/"
  },
  /*
   ** Build configuration
   */

  rules: {
    "no-console": "off"
  },
  render: {
    http2: {
      push: true
    },

    static: {
      maxAge: "1y",
      setHeaders(res, path) {
        if (path.includes("sw.js")) {
          res.setHeader("Cache-Control", `public, max-age=${15 * 60}`);
        }
      }
    }
  }
};
