<template>
  <div @submit.prevent="handledSumitAff(affLink)" class="input-find">
    <form autocomplete="off">
      <input class="form-control" type="text" v-model="affLink" placeholder="Dán link sản phẩm…" />
      <a @click.prevent="handledSumitAff(affLink)" title="Dán link sản phẩm" class="app-search">
        <img src="../../assets/img/icon/icon_go.svg" alt="goCASHBACK" class width="18" height="18" />
      </a>
    </form>
  </div>
</template>
<script>
import ProductService from "@/api/product";
import { handleVendorLink } from "@/misc/helpers";
import Adblock from "@/components/Adblock";
export default {
  components: {
    Adblock
  },
  data() {
    return {
      affLink: ""
    };
  },
  mounted() {},
  methods: {
    async handledSumitAff(v) {
      if (this.$cookies.get("adblock")) {
        this.$store.commit("changePopupAdblock", true);
      } else if (!v) {
        this.$swal({
          icon: "info",
          title: "Bạn cần dán link sản phẩm!",
          showConfirmButton: false,
          timer: 1000
        });
      } else if (!this.$auth.loggedIn) {
        this.$auth.$storage.setLocalStorage(
          "affiliate_url",
          {affLink:v}
        );
        this.$store.commit("changePopup", true);
      } else {
        let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
        if (v && accountId) {
          ProductService.postAffLink(this.$axios, accountId, v)
            .then(resp => {
              if (resp.data.status) {
                let targetUrl = resp.data.data.target_url + `a-${accountId}`;
                let result = handleVendorLink(
                  targetUrl,
                  this.$store.state.vendorPlatform,
                  window
                );
                //  if(window.ReactNativeWebView){
                //   window.ReactNativeWebView.postMessage(res.length > 0 ? vendorPlatform[res[0]].name : '')
                // }
                switch (result.platform) {
                  case 2:
                    let payload = {
                      isPopup: true,
                      targetUrl: targetUrl,
                      vendorName: result.name
                    };
                    this.$store.commit("changeModalPlatform", payload);
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
                    window.open(targetUrl, "_blank");
                    break;
                }
              }
            })
            .catch(e => {
              if (e.response.data.data.code === "002.004.001") {
                this.$swal({
                  icon: "info",
                  title: "Link sản phẩm không hợp lệ, vui lòng kiểm tra lại.",
                  showConfirmButton: false,
                  timer: 1500
                });
              } else {
                this.$swal({
                  icon: "info",
                  title: "Vui lòng nhập lại",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.app-search {
  transform: rotate(0) translate(0, -50%);
  position: absolute;
  right: 8px;
  top: 50%;
  cursor: pointer;
}
</style>
