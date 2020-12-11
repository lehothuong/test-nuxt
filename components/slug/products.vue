<template>
  <div class="benefitBg pb-lg-5" v-show="Object.keys(data).length !== 0">
    <div class="container productDetail">
      <div class="d-none d-lg-block">
        <ol class="breadcrumb" v-show="items">
          <li
            v-for="(item,index) in items"
            :key="index"
            :class="['breadcrumb-item', item.active ? 'active' : null]"
          >
            <div v-show="item.active" v-html="item.text"></div>
            <b-link v-show="!item.active" :to="'/'+item.link" v-html="item.text"></b-link>
          </li>
          <slot></slot>
        </ol>
      </div>
      <div class="bg-white borderRadius-1">
        <div class="row pb-lg-3 pt-lg-3">
          <div class="col-lg-6">
            <div class="pl-lg-4 h-100 d-flex flex-column justify-content-between">
              <!-- <content-placeholders v-show="!data" :rounded="true">
                            <content-placeholders-img class="placeholdersDetail"/>
              </content-placeholders>-->
              <div class="slider img-1-1">
                <img class="img-small" :src="data.information.image_url" />
              </div>
              <p
                class="color-666 d-none d-lg-block"
              >Thông tin sản phẩm được cập nhật lúc {{getTimeZoneDay(data.information.updated_at)}}</p>
            </div>
          </div>
          <div class="col-lg-6 productDetailInfo pr-lg-4 pb-lg-0 pb-3">
            <h1 class="productDetailInfoTitle font-weight-bold">{{data.information.name}}</h1>
            <div class="socialProduct">
              <!-- <p>yêu thích</p> -->
              <div class="d-flex justify-content-end align-items-center">
                <p class="mr-3">Chia sẻ</p>
                <social-sharing :url="$route.currentRoute" inline-template>
                  <div>
                    <network network="facebook">
                      <img src="../../assets/img/icon/facebook.svg" width="20" height="20" />
                    </network>
                  </div>
                </social-sharing>
              </div>
            </div>
            <p class="productDetailInfoShortDes mt-lg-4 mt-2">
              {{data.information.short_description}}
              <!-- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, -->
            </p>
            <p
              class="d-block d-lg-none color-666 fontSize12 font-italic"
            >Thông tin sản phẩm được cập nhật lúc {{getTimeZoneDay(data.information.updated_at)}}</p>
            <div>
              <div
                class="productDetailBox productDetailBoxBestMobile px-lg-3 px-10-res mt-lg-2 mt-3 mr-lg-3"
              >
                <p
                  class="d-block d-lg-none productDetailBoxTitleBest text-uppercase text-center font-weight-bold"
                >Giá tốt nhất</p>
                <div class="row align-items-center">
                  <div class="col-lg-4 col-5">
                    <div class="img-97-29 slider">
                      <img
                        width="134"
                        height="39"
                        class="img-small contentObFix"
                        :src="vendorBest.image_url"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-7">
                    <p
                      class="d-none d-lg-block productDetailBoxTitleBest position-relative text-uppercase text-center font-weight-bold"
                    >Giá tốt nhất</p>
                    <div
                      class="productDetailBoxPriceDisOther productDetailBoxPriceDis mt-lg-1 text-lg-center text-left font-weight-bold d-lg-block d-flex align-items-center"
                    >
                      <p class="d-inline-block">{{formatPrice(vendorBest.discount)}}</p>
                      <a v-b-toggle.collapse-1 class="pointer">
                        <img
                          src="../../assets/img/icon/icon_info.svg"
                          width="15"
                          height="15"
                          class="d-block d-lg-none ml-2 mb-1"
                        />
                      </a>
                    </div>
                    <p
                      :class="{'d-none':vendorBest.discount === vendorBest.price}"
                      class="productDetailBoxPriceReal text-lg-center text-left"
                    >{{formatPrice(vendorBest.price)}}</p>
                  </div>
                  <div class="d-block d-lg-none col-12 d-block d-lg-none">
                    <b-collapse id="collapse-1">
                      <div class="productDetailBoxBorder mt-12-res pt-2">
                        <div class="row">
                          <div class="col pr-1">
                            <p>Giá</p>
                            <p
                              class="productDetailBoxHoverPrice"
                            >{{formatPrice(vendorBest.discount)}}</p>
                          </div>
                          <div class="col px-1">
                            <p>Hoàn tiền</p>
                            <p class="productDetailBoxHoverPrice">{{vendorBest.cashback_rate}}%</p>
                          </div>
                          <div class="col pl-1">
                            <p class="white-nowrap">Tiền hoàn lại</p>
                            <p
                              class="productDetailBoxHoverPrice"
                            >{{formatPrice(vendorBest.cashback)}}</p>
                          </div>
                        </div>
                      </div>
                    </b-collapse>
                  </div>
                  <div class="col-lg-4 col-12 text-right mt-lg-0 mt-3">
                    <a
                      :title="vendorBest.name"
                      @click.prevent="handledBuyProduct(vendorBest.target_url,vendorBest.id,vendorBest.name,vendorBest.product_id)"
                      class="btn btnBuy btnBuyActive font-weight-bold text-uppercase w-100-576"
                    >Mua ngay</a>
                  </div>
                </div>
                <div class="productDetailBoxHover d-none d-lg-block">
                  <div class="productDetailBoxBorder pt-lg-3">
                    <div class="row">
                      <div class="col-lg-3">
                        <p>Giá</p>
                        <p class="productDetailBoxHoverPrice">{{formatPrice(vendorBest.discount)}}</p>
                      </div>
                      <div class="col-lg-3">
                        <p>Hoàn tiền</p>
                        <p class="productDetailBoxHoverPrice">{{vendorBest.cashback_rate}}%</p>
                      </div>
                      <div class="col-lg-4">
                        <p>Số tiền sẽ hoàn lại</p>
                        <p class="productDetailBoxHoverPrice">{{formatPrice(vendorBest.cashback)}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="productDetailBoxAll scrollbars">
                <div
                  v-for="(item,index) in vendorList"
                  :key="index"
                  class="productDetailBox px-10-res px-lg-3 mt-10-res mt-lg-2"
                >
                  <div class="row align-items-center">
                    <div class="col-lg-4 col-5">
                      <!-- <img width="134" height="39" :src="item.image_url"/> -->
                      <div class="img-97-29 slider">
                        <img
                          width="134"
                          height="39"
                          class="img-small contentObFix"
                          :src="item.image_url"
                        />
                      </div>
                    </div>
                    <div class="col-lg-4 col-7">
                      <!-- <p v-show="index == 0" class="productDetailBoxTitleBest position-relative text-uppercase text-center font-weight-bold ">Giá tốt nhất</p> -->
                      <div
                        class="productDetailBoxPriceDisOther text-lg-center text-left font-weight-bold mb-lg-1 d-lg-block d-flex align-items-center"
                      >
                        <p class="d-inline-block">{{formatPrice(item.discount)}}</p>
                        <a v-b-toggle="`collapses-${item.id}`" class="pointer">
                          <img
                            src="../../assets/img/icon/icon_info.svg"
                            width="15"
                            height="15"
                            class="d-block d-lg-none ml-2 mb-1"
                          />
                        </a>
                      </div>
                      <p
                        :class="{'d-none':item.discount === item.price}"
                        class="productDetailBoxPriceReal text-lg-center text-left"
                      >{{formatPrice(item.price)}}</p>
                    </div>
                    <div class="col-12 d-block d-lg-none">
                      <b-collapse :id="`collapses-${item.id}`">
                        <div class="productDetailBoxBorder mt-12-res pt-2">
                          <div class="row">
                            <div class="col pr-1">
                              <p>Giá</p>
                              <p class="productDetailBoxHoverPrice">{{formatPrice(item.discount)}}</p>
                            </div>
                            <div class="col px-1">
                              <p>Hoàn tiền</p>
                              <p class="productDetailBoxHoverPrice">{{item.cashback_rate}}%</p>
                            </div>
                            <div class="col pl-1">
                              <p class="white-nowrap">Tiền hoàn lại</p>
                              <p class="productDetailBoxHoverPrice">{{formatPrice(item.cashback)}}</p>
                            </div>
                          </div>
                        </div>
                      </b-collapse>
                    </div>
                    <div class="col-lg-4 col-12 text-right mt-lg-0 mt-3">
                      <a
                        :title="item.name"
                        @click.prevent="handledBuyProduct(item.target_url,item.id,item.name,item.product_id)"
                        class="btn btnBuy font-weight-bold text-uppercase w-100-576"
                      >Mua ngay</a>
                    </div>
                  </div>
                  <div class="productDetailBoxHover d-none d-lg-block">
                    <div class="productDetailBoxBorder pt-lg-3">
                      <div class="row">
                        <div class="col-lg-3">
                          <p>Giá</p>
                          <p class="productDetailBoxHoverPrice">{{formatPrice(item.discount)}}</p>
                        </div>
                        <div class="col-lg-3">
                          <p>Hoàn tiền</p>
                          <p class="productDetailBoxHoverPrice">{{item.cashback_rate}}%</p>
                        </div>
                        <div class="col-lg-4">
                          <p>Số tiền sẽ hoàn lại</p>
                          <p class="productDetailBoxHoverPrice">{{formatPrice(item.cashback)}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductService from "@/api/product";
import TrackingService from "@/api/tracking";
import { handleVendorLink } from "@/misc/helpers";
export default {
  props: {
    data: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      items: [
        {
          text: "Trang chủ",
          link: ""
        },
        {
          text: this.data.information.category_name,
          link: "me-va-be"
        },
        {
          text: this.data.information.name,
          active: true
        }
      ],
      information: []
    };
  },

  computed: {
    vendorBest() {
      return this.data.information.vendors[0];
    },
    vendorList() {
      const arr = Array.from(this.data.information.vendors).reverse();
      const arr1 = arr.pop();
      return arr.reverse();
    }
  },
  methods: {
    growDivReverse(v1, v2, v3, number) {
      var growDiv = document.getElementById(v1);
      if (growDiv.clientHeight > number) {
        growDiv.style.height = number + "px";
      } else {
        var wrapper = document.querySelector("." + v2);
        growDiv.style.height = wrapper.clientHeight + "px";
      }
      document.getElementById(v3).value =
        document.getElementById(v3).value == "Xem thêm"
          ? "Thu gọn"
          : "Xem thêm";
    },
    async handledBuyProduct(url, id, name, product_id) {
      this.$store.commit("changeVendor", {
        vendorId: id,
        vendorName: name,
        vendorUrl: url
      });
      this.$store.commit("changeProductById", product_id);
      if (this.$cookies.get("adblock")) {
        this.$store.commit("changePopupAdblock", true);
      } else if (!this.$auth.loggedIn) {
        this.$store.commit("changePopup", true);
      } else {
        let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
        let targetUrl = url + `a-${accountId}`;
        let result = handleVendorLink(
          targetUrl,
          this.$store.state.vendorPlatform,
          window
        );
        switch (result.platform) {
          case 2:
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
            break;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.color-red {
  color: #cb0055;
}
.socialProduct {
  margin-top: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-right: 1rem;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
}
.color-666 {
  color: #666666;
}

.productDetailBoxAll {
  height: 370px;
  overflow-y: scroll;
}

.placeholdersDetail {
  width: 100%;
  padding-top: 100%;
}

.productDetailBoxHover {
  padding: 0.75rem 1rem;
  position: absolute;
  width: 100%;
  opacity: 0;
  margin-left: -16px;
  background-color: #f2f2f2;
  transition: 0.4s all;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.16);
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.productDetailBoxBorder {
  border-top: 1px solid rgba(0, 0, 0, 0.16);
}

.productDetailBoxHoverPrice {
  color: #05668d;
  font-weight: bold;
}

.productDetailInfo {
  .productDetailBox {
    position: relative;
    background-color: #f2f2f2;
    border-radius: 3px;
    transition: all 0.4s;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;

    &:hover {
      background-color: #ffffff;
      box-shadow: 0 5px 0px 0 rgba(0, 0, 0, 0.16);

      .productDetailBoxHover {
        background-color: #ffffff;
        opacity: 1;
        z-index: 1;
        display: block;
      }
    }
  }
  .productDetailInfoTitle {
    font-size: 1.25rem;
  }
  .productDetailInfoShortDes {
    color: #000000;
    margin-bottom: 2rem;
  }
  .productDetailBoxTitleBest {
    background-color: #ff599a;
    border-radius: 3px;
    color: #fff;
    line-height: 1.3;
    padding-top: 0.375rem;
    padding-bottom: 0.2rem;
    top: -21px;
    margin-bottom: calc(0% - 21px);
  }
  .productDetailBoxPriceDis {
    font-size: 1rem;
    color: #666666;
    &.productDetailBoxPriceDisOther {
      font-size: 1.25rem;
      color: #cb0055;
    }
  }
  .productDetailBoxPriceReal {
    color: #666666;
    text-decoration: line-through;
    line-height: 1;
  }
}
// .btnBuy{
//     border-radius: 5px;

//     padding: 0.375rem 1.5rem;
//     border-color: #00A896;

//     background-color: #ffffff;
//     color: #00A896;
//     &:focus{
//         box-shadow: none;
//     }
//     &.btn-secondary:not(:disabled):not(.disabled):active:focus, &.btn-secondary:not(:disabled):not(.disabled).active:focus, .show > &.btn-secondary.dropdown-toggle:focus {
//         box-shadow: none;
//     }
//     &:hover{
//         background-color: #00A896;
//         color: #ffffff;
//     }
//     &.btnGoShop{
//         padding: 0.5rem 2.2rem;
//     }
//     &.btnBuyActive{
//         background-color: #00A896;
//         color: #ffffff;
//         &:hover{
//             background-color: #ffffff;
//             color: #00A896;
//         }
//     }
// }
// .custom-modal-body{
//     max-height: calc(100vh - 250px);
//     overflow-y: auto;
//     flex-direction: column;
// }
.custom-modal-footer {
  position: sticky;
  bottom: 0;
  width: 100%;
}

@media (min-width: 992px) and (max-width: 1280px) {
  .btnBuy {
    font-size: 0.875rem;
  }
}

@media (max-width: 576px) {
  .productDetailBoxBorder {
    .productDetailBoxHoverPrice {
      font-size: 0.75rem;
    }
    p {
      font-size: 0.75rem;
    }
  }
  .productDetailBoxAll {
    height: 100% !important;
    overflow-y: unset;
  }
  .btnBuy {
    font-size: 0.875rem;
  }
  .productDetailInfo {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    .productDetailBox {
      border-radius: 3px;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      &.productDetailBoxBestMobile {
        border: solid 2px #00a896;
      }
      &:hover {
        box-shadow: none;
        background-color: #f2f2f2;
      }
    }
    .productDetailBoxPriceReal {
      font-size: 0.75rem;
    }
    .productDetailInfoTitle {
      font-size: 1rem;
      margin-top: 1rem;
    }
    .productDetailInfoShortDes {
      margin-bottom: 0.5rem;
    }
    .productDetailBoxTitleBest {
      display: inline-block;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      font-size: 9px;
      position: absolute;
      top: -10px;
      left: 25px;
      padding-top: 0.35rem;
    }
  }
  .socialProduct {
    margin-top: 0.35rem;
    margin-right: 0;
  }
}
</style>