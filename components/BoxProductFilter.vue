<template>
  <a
    class="pointer"
    :title="products.name"
    @click.prevent="handleGotoAff(products)"
  >
    <!-- {{Math.round(products.discount_rate * 100)}} -->
    <div class="boxProduct my-lg-2 my-5px-res">
      <div class="discountRateBlock" v-if="products.discount_rate * 100 > 0">
        <img :alt="products.name" src="../assets/img/icon/discount_rate.svg" />
        <div class="discountRateInfo">
          <span class="text-uppercase">Giảm</span>
          <span class="font-weight-bold discountRate"
            >{{ Math.round(products.discount_rate * 100) }}%</span
          >
        </div>
      </div>
      <div class="position-relative mb-2">
        <div class="slider img-3-2">
          <img
            :alt="products.name"
            v-lazy="products.image_url"
            class="img-small contentObFix"
          />
        </div>
        <p class="fontSize14 my-2 product-name">{{ products.name }}</p>
        <p class="priceProductSale">{{ formatPrice(products.discount) }}</p>
        <div class="priceProductReal">
          <p
            :class="{ 'd-none': products.discount === products.price }"
            v-show="isCheckBestPrice"
          >
            {{ formatPrice(products.price) }}
          </p>
        </div>
      </div>
      <div
        class="refundPrices pt-2 w-100"
        :class="{ refundPriceBorder: products.display_value }"
      >
        <div class="row justify-content-center">
          <div class="col-6">
            <div class="img-114-34 slider">
              <img
                class="img-small contentObFix"
                :src="products.vendor_image_url"
              />
            </div>
          </div>
        </div>
        <p class="refundPriceLine mt-2">
          {{ products.display_text }}&nbsp;{{ products.display_value }}
        </p>
        <a
          class="btn btnBuy btnBuyActive font-weight-bold text-uppercase w-100 mt-1"
          >Mua ngay</a
        >
      </div>
    </div>
  </a>
</template>
<script>
import { handleVendorLink } from "@/misc/helpers";
export default {
  props: {
    products: {
      type: Object
    },
    isCheckBestPrice: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      a: "sdfgsdfg"
    };
  },
  methods: {
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
              // let payload = {
              //   isPopup: true,
              //   targetUrl: targetUrl,
              //   vendorName: result.name
              // };
              // this.$store.commit("changeModalPlatform", payload);
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
              // window.open(targetUrl, "_blank");
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
.priceProductSale {
  font-size: 1rem;
  font-weight: bold;
  color: #05668d;
}
.priceProductReal {
  text-decoration: line-through;
}
.refundPrices {
  color: #ff0000;
  font-weight: 700;
  &.refundPriceBorder {
    border-top: 1px solid #f8f8f8;
  }
}

@media (max-width: 576px) {
  .btnBuy {
    &.btnBuyActive {
      font-size: 0.8rem;
      padding: 0.3rem 1.5rem;
      line-height: 1.3 !important;
      color: #ffffff !important;
      &:hover {
        background-color: #00a896;
        color: #ffffff;
      }
    }
  }
  .priceProductSale {
    font-size: 0.875rem;
  }
  .priceProductReal {
    p {
      font-size: 0.75rem;
    }
  }
  .refundPrice.refundPriceBorder {
    font-size: 0.75rem;
  }
}
</style>
