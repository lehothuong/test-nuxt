<template>
  <div class="h-100">
    <content-placeholders v-show="!bannerHomeRight" :rounded="true">
      <content-placeholders-img class="placeholders-banner-right" />
    </content-placeholders>
    <div class="h-100" v-show="bannerHomeRight">
      <b-carousel
        id="carousel-1"
        :interval="3000"
        fade
        no-indicators
        img-width="1024"
        img-height="1024"
        style="text-shadow: 1px 1px 2px #333;height:100%"
      >
        <a
          class="pointer"
          v-for="(item,index) in bannerHomeRight"
          :title="item.display_text"
          @click="handleBanner(item)"
          :key="index"
        >
          <b-carousel-slide :img-src="item.image_url"></b-carousel-slide>
        </a>
      </b-carousel>
    </div>
  </div>
</template>
<script>
import { handleVendorLink, handledWatchDomain } from "@/misc/helpers";
export default {
  props: {
    bannerHomeRight: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleBanner(obj) {
      if (obj.is_affiliate == 1) {
        let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
        let targetUrl = obj.target_url + `a-${accountId}`;
        let result = handleVendorLink(
          targetUrl,
          this.$store.state.vendorPlatform,
          window
        );
        this.$store.commit("changeVendor", {
          vendorId: result.id,
          vendorName: result.name,
          vendorUrl: targetUrl,
        });
        if (this.$cookies.get("adblock")) {
          this.$store.commit("changePopupAdblock", true);
        } else if (!this.$auth.loggedIn) {
          this.$store.commit("isCommision", true);
          this.$store.commit("changePopup", true);
        } else {
          // window.open(obj.target_url+`a-${accountId}`, '_blank');
          if (accountId) {
            
            switch (result.platform) {
              case 2:
                // let payload = {'isPopup':true,'targetUrl':targetUrl,'vendorName':result.name}
                // this.$store.commit('changeModalPlatform',payload)
                this.$store.commit("changeCheckCashBack", true);
                this.$store.dispatch("changePopupAll");
                break;
              case undefined:
                this.$swal({
                  icon: "info",
                  title:
                    "Rất tiếc, hiện tại website này không nằm trong hệ thống hoàn tiền của goCASHBACK",
                  showConfirmButton: false,
                  timer: 4000,
                });
                break;
              default:
                this.$store.dispatch("changePopupAll");
                //  window.open(obj.target_url+`a-${accountId}`, '_blank');
                break;
            }
          }
        }
      } else {
        if (obj.target_url) {
          let result = handledWatchDomain(obj.target_url);

          result
            ? window.open(obj.target_url, obj.target_type || "_blank")
            : this.$router.push({ path: obj.target_url });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>