<template>
  <section class="mt-lg-5 mt-4">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <div class="flex-row d-flex">
          <img class="iconHot" src="../../assets/img/icon/fire.svg" width="16" height="21" />
          <h5 class="titleHot ml-lg-2 pl-lg-1 pl-2">Mua sắm ĐƯỢC hoàn tiền</h5>
        </div>
        <!-- <nuxt-link to="">
                <h6 class="titleSeeMore">Xem tất cả</h6>
        </nuxt-link>-->
      </div>
      <div v-if="vendors.length === 0" class="m-0 e-commerce-container mt-lg-3 mt-10-res">
        <div>
          <content-placeholders class="placeholder-box" :rounded="true">
            <content-placeholders-img class="placeholders-banner" />
          </content-placeholders>
        </div>
      </div>
      <div v-else class="mt-lg-3 mt-10-res position-relative">
        <div v-if="$device.isDesktop" class="d-none d-lg-block">
          <div
            class="growAll"
            :class="vendors && vendors.length > 18 ? 'hotHeight':''"
            id="hotBox-1"
          >
            <div class="row m-0 e-commerce-container eCommerceHomepage subHot-1">
              <div class="col-lg-2 col-6 p-0" v-for="(item,index) in vendors" :key="'hmV-'+index">
                <BoxEcommerceHot :vendors="item"></BoxEcommerceHot>
              </div>
            </div>
          </div>
          <div class="text-center" v-show="vendors && vendors.length > 18">
            <div class="moreHotEveryDay" id="hot-1">
              <input
                type="button"
                class="btn btnMoreRead w-100"
                id="moreHot-1"
                value="Xem thêm"
                @click.prevent="growDivReverse('hotBox-1','subHot-1','moreHot-1',245,'hot-1')"
              />
            </div>
          </div>
        </div>
        <div v-if="$device.isMobile" class="d-block d-lg-none">
          <div
            class="growAll"
            :class="vendors && vendors.length > 4 ? 'hotHeight':''"
            id="hotBoxMobile-1"
          >
            <div class="row m-0 e-commerce-container eCommerceHomepage subHotMobile-1">
              <div class="col-lg-2 col-6 p-0" v-for="(item,index) in vendors" :key="'hmV-'+index">
                <BoxEcommerceHot :vendors="item"></BoxEcommerceHot>
              </div>
            </div>
          </div>
          <div class="text-center" v-show="vendors && vendors.length > 4">
            <div class="moreHotEveryDay" id="hotMobile-1">
              <input
                type="button"
                class="btn btnMoreRead w-100"
                id="moreHotMobile-1"
                value="Xem thêm"
                @click.prevent="growDivReverse('hotBoxMobile-1','subHotMobile-1','moreHotMobile-1', 164,'hotMobile-1')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import BoxEcommerceHot from "../BoxEcommerceHot";
const VendorService = () => import("@/api/vendor");
export default {
  components: {
    BoxEcommerceHot
  },
  data() {
    return {
      vendors: []
    };
  },
  created() {
    this.getVendorHotEveryday();
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
    getVendorHotEveryday() {
      VendorService().then(result => {
        result.default.getHotVendorEveryday(this.$axios).then(resp => {
          this.vendors = resp.data.data;
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@media (min-width: 992px) {
  .hotHeight {
    height: 245px;
  }
  .placeholder-box {
    width: 100%;
    height: 100%;
    .vue-content-placeholders-img {
      height: 100% !important;
      padding-top: 22%;
    }
  }
}

@media (max-width: 576px) {
  .hotHeight {
    height: 164px;
  }
  .placeholder-box {
    .vue-content-placeholders-img {
      padding-top: 58%;
    }
  }
}

.e-commerce-container {
  // background-color: #fff;
  // border:1px solid #d9d9d9;
  border-radius: 0.25rem;
  // border: 1px solid #d9d9d9;

  .col-lg-2 {
    background-color: #fff;
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
</style>