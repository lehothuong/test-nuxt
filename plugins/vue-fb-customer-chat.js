import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'

if(window.location.hostname == "gocashback.vn"){
  Vue.use(VueFbCustomerChat, {
    page_id: 112226593802513, //  change 'null' to your Facebook Page ID,
    theme_color: '#ff599a', // theme color in HEX
    locale: 'vi_VN', // default 'vi_VN'
  });
}


