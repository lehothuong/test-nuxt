<template>
  <div>
    <b-modal
      v-model="showCommission"
      @hide="checkCashBack = false"
      modal-class="commission-modal"
      size="lg"
      header-class="commissionHeaderModal"
      content-class="commission-content"
      id="modal-lg"
      centered
    >
      <template v-slot:modal-title>
        <p class="font-weight-bold color-white text-uppercase fontSize14">Thông tin quan trọng</p>
      </template>
      <div class="mb-lg-3 custom-modal-body px-lg-3 px-10-res">
        <div class="tableCommissions">
          <div class="tableCommissionsTitle">
            <p class="font-weight-bold color-white">Tỉ lệ hoàn tiền {{this.commissions.name}}</p>
          </div>
          <div
            v-for="(item,index) in this.commissions.commissions.slice(0,5)"
            :key="index"
            class="bodyCommissions d-flex justify-content-between"
          >
            <p>{{item.name}}</p>
            <p>{{formatPercent(Math.round(item.cashback_percent * 100 * 10) /10)}}%</p>
          </div>
        </div>
        <b-button
          v-show="!isExpand && this.commissions.commissions && this.commissions.commissions.length > 5"
          v-b-toggle.collapse-1
          variant="light"
          class="w-100"
        >XEM THÊM ...</b-button>
        <b-collapse v-model="isExpand" id="collapse-1">
          <div class="tableCommissions border-top-0">
            <div
              v-for="(item,index) in this.commissions.commissions.slice(5)"
              :key="index"
              class="bodyCommissions d-flex justify-content-between"
            >
              <p>{{item.name}}</p>
              <p>{{formatPercent(Math.round(item.cashback_percent * 100 * 10) /10)}}%</p>
            </div>
          </div>
          <div
            v-show="commissions.bonuses && commissions.bonuses.length > 0"
            class="tableCommissions mt-lg-3"
          >
            <div class="tableCommissionsTitle">
              <p class="font-weight-bold color-white">Danh sách các thương hiệu có khuyến mãi thêm</p>
            </div>
            <div
              v-for="(item,index) in this.commissions.bonuses"
              :key="index"
              class="bodyCommissions d-flex justify-content-between"
            >
              <a
                class="pointer"
                v-show="item.external_link"
                :title="item.brand_name"
                @click="gotoVendorPromo(item.external_link)"
              >{{item.brand_name}}</a>
              <p v-show="!item.external_link">{{item.brand_name}}</p>
              <p>{{formatPercent(Math.round(item.bonus_percent * 100 * 100) /100)}}%</p>
            </div>
          </div>
        </b-collapse>
        <p v-show="this.commissions.notice" class="font-weight-bold text-uppercase mt-4">Lưu ý:</p>
        <div class="fullDescription" v-html="this.commissions.notice"></div>
      </div>
      <template v-slot:modal-footer>
        <div class="text-center customFooter">
          <p
            class="color-red text-center mb-2"
            v-show="checkCashBack"
          >Hoàn tiền chỉ áp dụng cho các mua sắm được thực hiện trên ứng dụng Lazada khi nhấp từ goCASHBACK trên điện thoại.</p>
          <a
            title="Đi tới shop"
            target="_blank"
            @click="handledGotoShop()"
            class="btn btnBuy btnBuyActive btnGoShop font-weight-bold text-uppercase"
          >Đi tới shop</a>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import TrackingService from "@/api/tracking";
export default {
  data() {
    return {
      isExpand: false
    };
  },
  computed: {
    showCommission: {
      get() {
        return this.$store.state.modalShowCommission;
      },
      set(showPopup) {
        if (showPopup === false) {
          this.isExpand = false;
        }
        this.$store.commit("isCommision", false);
        this.$store.commit("changePopupCommission", showPopup);
      }
    },
    commissions() {
      let commissions = {
        commissions: [],
        ...this.$store.state.vendorCommission[
          this.$store.state.vendor.vendorId
        ],
        name: this.$store.state.vendor.vendorName,
        url: this.$store.state.vendor.vendorUrl,
        id: this.$store.state.vendor.vendorId
      };
      return commissions;
    },
    checkCashBack: {
      get() {
        return this.$store.state.isCheckCashBack;
      },
      set(checkCashBack) {
        this.$store.commit("changeCheckCashBack", checkCashBack);
      }
    }
  },
  methods: {
    handledGotoShop() {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(this.commissions.name);
      }
      if (this.$store.state.productId) {
        TrackingService.trackBuyAction(
          this.$axios,
          this.$auth.getToken("local").id,
          this.$store.state.productId
        );
        this.$store.commit("changeProductById", undefined);
      }
      window.open(`${this.commissions.url}|v-${this.commissions.id}`, "_blank");
      this.$store.commit("changePopupCommission", false);
    },
    gotoVendorPromo(externalLink) {
      let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(this.commissions.name);
      }
      window.open(externalLink + `a-${accountId}`, "_blank");
    }
  }
};
</script>
<style lang="scss" scoped>
.tableCommissions {
  border: 1px solid #05668d;
  .tableCommissionsTitle {
    background-color: #05668d;
    padding: 1rem 0.75rem;
  }
  .bodyCommissions {
    border-bottom: 1px solid #05668d;
    padding: 0.3rem 1.25rem;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>