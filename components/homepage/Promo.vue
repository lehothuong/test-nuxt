<template>
  <section :class="{'d-none':listVendorCoupon.length === 0}" class="mt-lg-5 mt-4 pb-lg-5 pb-3">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <div class="flex-row d-flex">
          <img
            class="iconHot"
            src="../../assets/img/icon/icon_khuyenmai.svg"
            width="21"
            height="21"
          />
          <h5 class="titleHot titleChildColor ml-lg-2 pl-lg-1 pl-2">
            Thông tin khuyến mãi
          </h5>
        </div>
        <!-- <nuxt-link to="">
                <h6 class="titleSeeMore">Xem tất cả</h6>
        </nuxt-link>-->
      </div>
      <div v-if="isLoading" class="row-12 mx-2-minus mt-10-res mt-lg-2">
        <div
          class="d-none d-lg-block col-6 px-lg-2"
          v-for="(item, index1) in 6"
          :key="'p-' + index1"
        >
          <content-placeholders :rounded="true" class="placeholder-box py-lg-2">
            <content-placeholders-img />
          </content-placeholders>
        </div>
        <div
          class="d-block d-lg-none col-12 px-10-res py-6px-res"
          v-for="(item, index1) in 6"
          :key="'pm-' + index1"
        >
          <content-placeholders :rounded="true" class="placeholder-box">
            <content-placeholders-img />
          </content-placeholders>
        </div>
      </div>
      <div v-else>
        <div class="row-12 mt-1 mt-lg-2 mx-2-minus">
          <div
            class="col-lg-6 col-12 px-lg-2 py-lg-2 py-6px-res d-lg-flex flex-lg-column"
            v-for="(item, index) in listVendorCoupon.slice(0, 6)"
            :key="`${index}-${item.id}`"
          >
            <div class="boxPromo h-100">
              <div class="row">
                <div class="col-lg-4 col-12 pr-10px">
                  <div class="row justify-content-center">
                    <div class="col-lg-12 col-5">
                      <div class="img-25-9 slider">
                        <img
                          class="img-small"
                          v-lazy="item.vendor_image_url"
                          :alt="item.name"
                        />
                      </div>
                    </div>
                    <div class="col-12 text-center">
                      <p
                        class="fontSize14 mt-2 color-red"
                        v-show="item.display_value"
                      >
                        <span>{{ item.display_text }}</span>
                        <span class="fontSize14 fontSize12 font-weight-bold">{{
                          item.display_value
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-8 col-12 pl-10px">
                  <span class="borderPromo"></span>
                  <p
                    class="titleChildColor titlePromoSize font-weight-bold mt-lg-0 mt-2"
                  >
                    {{ item.name }}
                  </p>
                  <p class="mt-2 timeToDate">
                    <span v-show="item.from_date"
                      >Từ {{ getTimeZone(item.from_date) }}</span
                    >
                    <span v-show="item.to_date">
                      <span :class="{ 'text-capitalize': !item.from_date }"
                        >đến</span
                      >
                      {{ getTimeZone(item.to_date) }}
                    </span>
                  </p>
                  <p class="mt-2" v-show="item.extra_info">
                    {{ item.extra_info }}
                  </p>
                  <p class="mt-2" v-show="item.code">
                    Mã giảm giá:
                    <span
                      class="text-uppercase titleHotGreen font-weight-bold"
                      >{{ item.code }}</span
                    >
                  </p>
                  <a
                    @click="handleGotoAff(item)"
                    class="btn btnBuy btnBuyActive font-weight-bold text-uppercase w-100-576 mt-3 mb-lg-1 fontSize14 lineHeight18"
                    >Xem ngay</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <client-only>
          <b-collapse v-model="visible" id="collapse-4">
            <div class="row-12 mx-2-minus">
              <div
                class="col-lg-6 col-12 px-lg-2 py-lg-2 py-6px-res d-lg-flex flex-lg-column"
                v-for="(item, index) in listVendorCoupon.slice(6, -1)"
                :key="`${index}-${item.id}`"
              >
                <div class="boxPromo h-100">
                  <div class="row">
                    <div class="col-lg-4 col-12 pr-10px">
                      <div class="row justify-content-center">
                        <div class="col-lg-12 col-5">
                          <div class="img-25-9 slider">
                            <img
                              class="img-small"
                              :src="item.vendor_image_url"
                              :alt="item.name"
                            />
                          </div>
                        </div>
                        <div class="col-12 text-center">
                          <p
                            class="fontSize14 mt-2 color-red"
                            v-show="item.display_value"
                          >
                            <span>{{ item.display_text }}</span>
                            <span
                              class="fontSize14 fontSize12 font-weight-bold"
                              >{{ item.display_value }}</span
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-8 col-12 pl-10px">
                      <span class="borderPromo"></span>
                      <p
                        class="titleChildColor titlePromoSize font-weight-bold mt-lg-0 mt-2"
                      >
                        {{ item.name }}
                      </p>
                      <p class="mt-2 timeToDate">
                        <span v-show="item.from_date"
                          >Từ {{ getTimeZone(item.from_date) }}</span
                        >
                        <span v-show="item.to_date">
                          <span :class="{ 'text-capitalize': !item.from_date }"
                            >đến</span
                          >
                          {{ getTimeZone(item.to_date) }}
                        </span>
                      </p>
                      <p class="mt-2" v-show="item.extra_info">
                        {{ item.extra_info }}
                      </p>
                      <p class="mt-2" v-show="item.code">
                        Mã giảm giá:
                        <span
                          class="text-uppercase titleHotGreen font-weight-bold"
                          >{{ item.code }}</span
                        >
                      </p>
                      <a
                        @click="handleGotoAff(item)"
                        class="btn btnBuy btnBuyActive font-weight-bold text-uppercase w-100-576 mt-3 mb-lg-1 fontSize14 lineHeight18"
                        >Xem ngay</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-collapse>
        </client-only>
        <div
          class="text-center"
          v-if="listVendorCoupon && listVendorCoupon.length > 6"
        >
          <div class="moreHotEveryDay morePromo" id="childBanner-1">
            <a
              :class="visible ? null : 'collapsed'"
              :aria-expanded="visible ? 'true' : 'false'"
              aria-controls="collapse-4"
              class="btn btnMoreRead w-100 pointer"
              @click="visible = !visible"
              >{{ visible ? "Thu gọn" : "Xem thêm" }}</a
            >
            <!-- <input
              type="button"
              :class="visible ? null : 'collapsed'"
              :aria-expanded="visible ? 'true' : 'false'"
              aria-controls="collapse-4"
              class="btn btnMoreRead w-100"
              id="moreChild-1"
              value="Xem thêm"
              @click="visible = !visible"
            />-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import PromoBanner from "@/api/promo";
import { handleVendorLink } from "@/misc/helpers";
export default {
  data() {
    return {
      listVendorCoupon: [],
      isLoading: false,
      visible: false
    };
  },
  created() {
    this.getVendorCoupon();
  },
  methods: {
    getVendorCoupon() {
      this.isLoading = true;
      PromoBanner.getVendorCoupon(this.$axios).then(resp => {
        this.listVendorCoupon = resp.data.data.coupons;
        this.isLoading = false;
      });
    },
    handleGotoAff(obj) {
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
                timer: 4000
              });
              break;
            default:
              this.$store.dispatch("changePopupAll");
              //  window.open(obj.target_url+`a-${accountId}`, '_blank');
              break;
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.placeholder-box {
  width: 100%;
  // height: 100%;
  .vue-content-placeholders-img {
    height: 100% !important;
    padding-top: 34.5%;
  }
}
.e-commerce-container {
  background-color: #fff;
  // border:1px solid #d9d9d9;
  border-radius: 0.25rem;
  // border: 1px solid #d9d9d9;

  .col-lg-2 {
    border: 1px solid #d9d9d9;
    transition: 0.3s all;
    // border-left:1px solid transparent ;
    &:first-child {
      border-left: 1px solid #d9d9d9;
    }
    &:hover {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      border: solid 1px #05668d;
    }
  }
}

@media (max-width: 576px) {
  .placeholder-box {
    .vue-content-placeholders-img {
      padding-top: 73%;
    }
  }
}
</style>
