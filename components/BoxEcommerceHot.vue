<template>
  <a
    :title="vendors.name"
    @click="handleEcommerceHot(vendors)"
    class="pointer"
    target="_blank"
  >
    <div class="boxEcommerceHot">
      <div class="paddingBoxEcommerceHot">
        <div class="slider img-25-9">
          <img
            v-lazy="vendors.image_url"
            :alt="vendors.name"
            class="img-small contentObFix"
          />
        </div>
      </div>
      <p class="fontSize14 mt-2">
        <span>{{ vendors.display_text }}</span>
        <span class="fontSize14 fontSize12 font-weight-bold">{{
          vendors.display_value
        }}</span>
      </p>
    </div>
  </a>
</template>
<script>
import { handleVendorLink } from "@/misc/helpers";
export default {
  props: {
    vendors: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    handleEcommerceHot(obj) {
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
        vendorUrl: targetUrl
      });


      if (this.$cookies.get("adblock")) {
        this.$store.commit("changePopupAdblock", true);
      } else if (!this.$auth.loggedIn) {
        this.$store.commit("isCommision", true);
        this.$store.commit("changePopup", true);
      } else {
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
                timer: 4000
              });
              break;
            default:
              this.$store.dispatch("changePopupAll");
              // window.open(targetUrl, '_blank');
              break;
          }
          // window.open(obj.target_url+`a-${accountId}`, '_blank');
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
