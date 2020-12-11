import Vue from "vue";
// import Antd from 'ant-design-vue/lib'
// Vue.use(Antd)

import _ from "lodash";
Vue.use(_);

var SocialSharing = require("vue-social-sharing");
Vue.use(SocialSharing);

import dayjs from "dayjs";
Vue.use(dayjs);

import VueContentPlaceholders from "vue-content-placeholders";
Vue.use(VueContentPlaceholders);

import VueLazyload from "vue-lazyload";

import Clipboard from 'v-clipboard'
Vue.use(Clipboard)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "https://d604u3cjqmj8m.cloudfront.net/resources/images/no-photo.png",
  attempt: 1,
  listenEvents: ["scroll"],
  lazyComponent: true
});
