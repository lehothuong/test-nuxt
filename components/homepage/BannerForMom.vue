<template>
  <section :class="{'d-none':!bannerHomeMom}" class="mt-lg-5 mt-4">
    <div class="container">
      <div class="flex-row d-flex">
        <img
          class="iconChild"
          alt="goCASHBACK"
          src="../../assets/img/icon/icon_mom.svg"
          width="16"
          height="21"
        />
        <h5 class="titleHot ml-lg-2 pl-lg-1 pl-2">deal ngon dành cho mẹ</h5>
      </div>
      <div class="row mx-2-minus" v-if="!bannerHomeMom">
        <div class="col-lg-6 mt-lg-3 mt-10-res px-lg-2" v-for="(item, index) in 2" :key="index">
          <content-placeholders :rounded="true">
            <content-placeholders-img class="placeholdersBannerHome" />
          </content-placeholders>
        </div>
      </div>
      <div v-else>
        <div
          class="growAll"
          :class="
            bannerHomeMom && bannerHomeMom.length > 2 ? 'bannerMomHeight' : ''
          "
          id="bannerMomBox-1"
        >
          <div class="row mx-2-minus subBannerMom-1">
            <div
              class="col-lg-6 mt-lg-3 mt-10-res px-lg-2"
              v-for="(item, index) in bannerHomeMom"
              :key="index"
            >
              <a
                class="pointer boxBannerMom"
                :title="item.display_text"
                @click="handleBanner(item)"
              >
                <div
                  class="slider img-542-200"
                  v-lazy-container="{
                    selector: 'img',
                    error:
                      'https://d604u3cjqmj8m.cloudfront.net/resources/images/no-photo-banners.png'
                  }"
                >
                  <img :alt="item.display_text" :data-src="item.image_url" class="img-small" />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="text-center" v-if="bannerHomeMom && bannerHomeMom.length > 2">
          <div class="moreHotEveryDay" id="childBanner-1">
            <input
              type="button"
              class="btn btnMoreRead w-100"
              id="moreMom-1"
              value="Xem thêm"
              @click.prevent="
                growDivReverse(
                  'bannerMomBox-1',
                  'subBannerMom-1',
                  'moreMom-1',
                  $device.isDesktop ? 220 : 280,
                  'childBanner-1'
                )
              "
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { handleVendorLink, handledWatchDomain } from "@/misc/helpers";
export default {
  props: {
    bannerHomeMom: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    growDivReverse(v1, v2, v3, number, v4) {
      var growDiv = document.getElementById(v1);
      if (growDiv.clientHeight > number) {
        growDiv.style.height = number + "px";
        // growDiv.classList.add("contentSlider")
      } else {
        var wrapper = document.querySelector("." + v2);
        growDiv.style.height = wrapper.clientHeight + "px";
        // growDiv.classList.remove("contentSlider");
      }
      document.getElementById(v3).value =
        document.getElementById(v3).value == "Xem thêm"
          ? "Thu gọn"
          : "Xem thêm";
      document.getElementById(v3).value == "Xem thêm"
        ? document.getElementById(v4).classList.remove("changeHotEveryday")
        : document.getElementById(v4).classList.add("changeHotEveryday");
    },
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
          this.$store.commit("isCommision", true);
          this.$store.commit("changePopupAdblock", true);
        } else if (!this.$auth.loggedIn) {
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
@media (min-width: 992px) {
  .bannerMomHeight {
    height: 220px;
  }
}

@media (max-width: 576px) {
  .bannerMomHeight {
    height: 280px;
  }
}
.boxBannerMom {
  border-radius: 5px;
  display: block;
  //  border: solid 1px transparent;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    // border: solid 1px #05668D;
  }
  img {
    border-radius: 5px;
  }
}
</style>
