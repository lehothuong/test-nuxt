<template>
  <div class="mt-lg-4 mb-lg-5">
    <div
      v-if="$store.state.auth.user.sms_verified == 0"
      class="alert-danger w-100 my-3 py-lg-2 d-lg-flex flex-lg-row align-items-center danger-container"
    >
      <span
        class="mx-3 my-2 ml-lg-4 mr-lg-4"
      >Bạn cần xác nhận số điện thoại để thực hiện rút tiền và các chức năng khác của website.</span>
      <b-button
        @click="onNavVerify()"
        class="btn btnBlue rounded w-100-576 white-nowrap mr-lg-4 ml-lg-auto mt-auto mt-lg-0"
      >XÁC NHẬN NGAY</b-button>
    </div>
    <div class="row flex-row d-flex mb-lg-5">
      <div class="col-lg-7 col-12">
        <span class="headerTitle text-uppercase font-weight-bold">Rút tiền</span>
        <hr />
        <div class="d-none d-lg-block">
          <div
            v-if="isShowAlert"
            :class="isError?'alert-danger':'alert-success'"
            class="w-100 danger-container my-lg-3 py-lg-2 d-flex flex-row align-items-center"
          >
            <span class="ml-lg-4 mr-lg-4 mx-3">{{errorMsg}}</span>
          </div>
        </div>

        <div class="d-block d-lg-none">
          <div
            v-if="isShowAlertCashBack"
            :class="isErrorCashBack?'alert-danger':'alert-success'"
            class="w-100 danger-container my-lg-3 py-lg-2 d-flex flex-row align-items-center"
          >
            <span class="ml-lg-4 mr-lg-4 mx-3">{{errorMsgCashBackMobile}}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-3 text-center mt-lg-0 mt-2">
            <p class="mt-1 mb-lg-2">Số dư đang có</p>
            <p class="greenText mb-lg-0 mb-2">{{formatPrice(balance)}}</p>
          </div>
          <div class="col-lg-7">
            <b-form @submit="handleCashBackModal">
              <b-form-group
                id="group-cash"
                label="Số tiền muốn rút"
                label-for="input-cash"
                class="mt-lg-1 mb-lg-2"
              >
                <div class="row">
                  <div class="col-lg-7 col-6 pr-lg-2 pr-1">
                    <b-form-input
                      id="input-cash"
                      v-on:keyup="keymonitor"
                      :disabled="!isHaveBankAccount || balance < 100000"
                      v-model="cashbackAmount"
                      v-validate="{
                        required:true}"
                      :class="{'input': true, 'is-danger': errors.has('cashbackAmount') }"
                      name="cashbackAmount"
                      data-vv-as="Số tiền rút"
                      placeholder="Nhập số tiền"
                    />
                  </div>
                  <div class="col-lg-4 col-6 pl-lg-2 pl-1">
                    <b-button
                      :disabled="!isHaveBankAccount || balance < 100000"
                      type="submit"
                      class="btn btnCashback bgGreen btnCashbackSize rounded w-100-576 white-nowrap h-100"
                    >RÚT TIỀN</b-button>
                  </div>
                </div>
                <span
                  v-show="errors.has('cashbackAmount')"
                  class="is-danger-text"
                >{{ errors.first('cashbackAmount') }}</span>
              </b-form-group>
            </b-form>
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-12 mt-lg-0 mt-4">
        <span class="headerTitle text-uppercase font-weight-bold">Tài khoản ngân hàng</span>
        <hr />
        <div class="d-block d-lg-none mb-3">
          <div
            v-if="isShowAlertMobileBank"
            :class="isErrorMobileBank?'alert-danger':'alert-success'"
            class="w-100 danger-container my-lg-3 py-lg-2 d-flex flex-row align-items-center"
          >
            <span class="ml-lg-4 mr-lg-4 mx-3">{{errorMsgMobileBank}}</span>
          </div>
        </div>
        <div class="w-100">
          <div class="bank-account-container">
            <b-button
              v-if="!isHaveBankAccount"
              @click="handleChangeBankAccount()"
              variant="light"
              class="bank-account-empty border-0"
            >nhập tài khoản</b-button>
            <div
              v-else
              class="bank-account-empty border-0 row align-items-center justify-content-center"
            >
              <div class="col-3">
                <div class="img-2-1 slider">
                  <img :src="objBankInfo.bank_image_url" class="img-small" />
                </div>
              </div>
              <div class="col-7 text-left">
                <p class="bank-number">{{objBankInfo.bank_account_number}}</p>
                <p class="bank-username font-weight-normal">{{objBankInfo.bank_account_name}}</p>
              </div>
              <div class="col-2 text-right">
                <a class="pointer" @click="handleChangeBankAccount()">
                  <img src="../../assets/img/icon/icon_edit.svg" width="20" height="18" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-lg-0 mt-4">
      <span class="historyText text-uppercase font-weight-bold">Lịch sử rút tiền</span>
      <hr />
      <div class="d-none d-lg-block">
        <div
          class="w-100 d-flex flex-row justify-content-between align-items-center my-lg-2"
          v-show="total>0"
        >
          <div class="dropdown-record-amount d-flex">
            <div class="align-items-center d-flex text-nowrap">
              <span>Hiển thị</span>
            </div>
            <b-dropdown
              id="dropdown-1"
              v-bind:text="recordPerPageAmount"
              v-model="recordPerPageAmount"
              class="mx-lg-2"
            >
              <b-dropdown-item
                v-for="(option, index) in recordOptions"
                :key="index"
                :value="option"
                @click="handledRecord(option)"
              >{{ option }}</b-dropdown-item>
            </b-dropdown>
            <div class="align-items-center d-flex text-nowrap">
              <span>đơn</span>
            </div>
          </div>
          <div class="flex-row d-flex justify-content-end align-items-center">
            <span class="mr-lg-2">Tìm kiếm</span>
            <b-form-group label-align-sm="right" label-size="sm" class="mb-0">
              <b-input-group size="md">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Tìm tên hoặc"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </div>
        </div>
      </div>
      <b-table
        id="transaction-table"
        stacked="sm"
        :per-page="recordPerPageAmount"
        :current-page="currentPage"
        :filter="filter"
        no-border-collapse
        :items="items"
        :fields="tableColumn"
        :tbody-tr-class="rowClass"
        @filtered="onFiltered"
      >
        <template v-if="items && items.length === 0" v-slot:table-caption>
          <p class="text-center">Chưa có dữ liệu</p>
        </template>
        <template v-slot:cell(index)="data">{{ data.index + 1 }}</template>

        <template v-slot:cell(amount)="data">{{ formatPrice(data.item.amount) }}</template>
        <template v-slot:cell(requested_at)="data">{{ getTimeZone(data.item.requested_at)}}</template>
        <template v-slot:cell(updated_at)="data">{{ getTimeZone(data.item.updated_at)}}</template>
        <template v-slot:cell(status)="data">
          <span
            class="status-text"
            :class="statusDisplays(data.item.status).class"
          >{{ statusDisplays(data.item.status).text }}</span>
        </template>
      </b-table>
      <div
        v-show="total>0"
        class="align-items-center d-lg-flex text-center mt-lg-0 mt-3 borderTopMobileTransaction pt-lg-0 pt-2"
      >
        <span>
          Hiển thị {{ (currentPage - 1) * recordPerPageAmount + total>0?1:0 }} tới
          {{
          currentPage * recordPerPageAmount >= total
          ? total
          : currentPage * recordPerPageAmount
          }}
          của {{ total }} giao dịch
        </span>
        <b-pagination
          class="custom-pagination paginationCashback m-0 ml-auto"
          v-model="currentPage"
          :total-rows="total"
          :per-page="recordPerPageAmount"
          size="sm"
          last-number
          first-number
          aria-controls="transaction-table"
        />
      </div>
      <div class="cashback-footer my-lg-4 py-lg-3 pt-3" />
    </div>
    <InputBankAccountModal
      :banks="banks"
      :provinces="provinces"
      :bankAccount="objBankInfo"
      :hideUpdateModals="hideUpdateModals"
      @updateAlertBank="updateAlertBank"
    />
    <b-modal
      v-model="isShowCashBackVerify"
      @hide="hideModal"
      modal-class="cash-back-modal modalMobile"
      title="Yêu cầu rút tiền"
      hide-footer
      centered
    >
      <div>
        <p class="title mb-lg-4 mt-lg-2 my-4">Bạn thực sự muốn thực hiện việc rút tiền?</p>
        <div class="row footer-popup">
          <div class="col-6 pr-lg-3 pr-1">
            <b-button
              @click="hideModal()"
              class="w-100 text-uppercase font-weight-bold py-lg-2 my-lg-1 rounded btnSMSVerifyReverse"
              variant="outline-primary"
            >ĐỂ SAU</b-button>
          </div>
          <div class="col-6 pl-lg-3 pl-1">
            <b-button
              @click="debounceHandleCashBack()"
              class="w-100 text-uppercase font-weight-bold py-lg-2 my-lg-1 rounded btnSMSVerify"
              variant="primary"
            >ĐỒNG Ý</b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import InputBankAccountModal from "./InputBankAccountModal";
const AccountService = () => import("@/api/account");
const Helper = require("../../plugins/helpers");

export default {
  components: {
    InputBankAccountModal,
  },
  props: {
    isChange: {
      type: Boolean,
    },
    cashback: {
      type: Object,
      default: () => {},
    },
    banks: {
      type: Array,
      default: () => [],
    },
    provinces: {
      type: Array,
      default: () => [],
    },
    transactions: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    // cashbackAmount: function(newVal, oldVal) {
    //   let me = this;
    //   document
    //     .getElementById("input-cash")
    //     .addEventListener("keyup", function(event) {
    //       me.cashbackAmount = event.target.value
    //         .replace(/\D/g, "")
    //         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //       console.log(me.cashbackAmount);
    //     });
    // },
    transactions: function (newTransactions, oldTransactions) {
      if (newTransactions) {
        const data = newTransactions.withdraws;
        // this.balance = newTransactions.balance;
        this.items = data;
        this.total = data.length;
        this.pageAmount = Math.ceil(data.length / this.recordPerPageAmount);
      }
    },
  },
  mounted() {},
  computed: {
    balance() {
      return this.$store.state.balance;
    },
    objBankInfo() {
      return this.$store.state.bankInfo ? this.$store.state.bankInfo : {};
    },
    isHaveBankAccount() {
      if (this.$store.state.bankInfo) {
        const result = Object.keys(this.$store.state.bankInfo || {}).length > 0;
        if (!result) {
          this.showError(
            "Bạn cần nhập tài khoản ngân hàng để thực hiện việc rút tiền"
          );
        } else {
          if (this.$store.state.balance < 100000 && !this.isDrawOut) {
            this.showError(
              "Bạn cần tối thiểu 100.000đ để thực hiện việc rút tiền"
            );
          }
        }
        return result;
      }
    },
  },
  data() {
    return {
      isShowCashBackVerify: false,
      filter: null,
      isShowAlert: false,
      isError: false,
      isDrawOut: false,
      isShowAlertMobileBank: false,
      isErrorMobileBank: false,
      isShowAlertCashBack: false,
      isErrorCashBack: false,
      errorMsg: "",
      errorMsgMobileBank: "",
      errorMsgCashBackMobile: "",
      cashbackAmount: undefined,
      // balance: 0,
      tableColumn: [
        {
          key: "account_name",
          label: "Người nhận",
          sortable: false,
        },
        {
          key: "amount",
          label: "Số tiền",
          sortable: true,
        },
        {
          key: "requested_at",
          label: "Ngày tạo",
          sortable: true,
        },
        {
          key: "updated_at",
          label: "Cập nhật",
          sortable: true,
        },
        {
          key: "status",
          label: "Trạng thái",
          sortable: true,
        },
      ],
      items: [],
      isFirst: false,
      recordOptions: [10, 20, 50],
      bankImageUrl: "",
      bankAccountName: "",
      bankAccountNumber: "",
      total: 0,
      currentPage: 1,
      recordPerPageAmount: "10",
      pageAmount: 0,
    };
  },
  methods: {
    rowClass(item, type) {
      // if (!item || type !== 'row') return
      if (this.isFirst && this.items[0] === item) return "table-first";
    },
    onFiltered(filteredItems) {
      this.total = filteredItems.length;
      this.currentPage = 1;
    },
    keymonitor(event) {
      let me = this;
      document
        .getElementById("input-cash")
        .addEventListener("keyup", function (event) {
          me.cashbackAmount = event.target.value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        });
    },
    statusDisplays(id) {
      switch (id) {
        case 1:
          return {
            class: "pending",
            text: "ĐANG XỬ LÝ",
          };
        case 2:
          return {
            class: "success",
            text: "ĐÃ THANH TOÁN",
          };
        case 3:
          return {
            class: "failed",
            text: "KHÔNG THANH TOÁN",
          };
        default:
          return {
            class: "failed",
            text: "KHÔNG THANH TOÁN",
          };
      }
    },
    updateAlertBank(val) {
      if (this.balance > 100000) {
        this.isShowAlert = val;
      }
    },
    showError(msg) {
      this.isShowAlert = true;
      this.isError = true;
      this.errorMsg = msg;
    },
    showSuccess(msg) {
      this.isShowAlert = true;
      this.isError = false;
      this.errorMsg = msg;
    },
    showSuccessMobileCashBack(msg) {
      this.isShowAlertCashBack = true;
      this.isErrorCashBack = true;
      this.errorMsgCashBackMobile = msg;
    },
    showErrorMobileCashBack(msg) {
      this.isShowAlertCashBack = true;
      this.isErrorCashBack = false;
      this.errorMsgCashBackMobile = msg;
    },
    showErrorMobileUpdateBank(msg) {
      this.isShowAlertMobileBank = true;
      this.isErrorBank = true;
      this.errorMsgMobileBank = msg;
    },
    showErrorMobileUpdateBank(msg) {
      this.isShowAlertMobileBank = true;
      this.isErrorBank = false;
      this.errorMsgMobileBank = msg;
    },
    hideMsg() {
      this.isShowAlert = false;
    },
    handleChangeBankAccount() {
      this.$store.commit(
        "changeBankAccountPopup",
        !this.$store.state.showBankAccountPopup
      );
    },
    handleCashBackModal(e) {
      if (
        this.$store.state.auth.user &&
        this.$store.state.auth.user.sms_verified == 0
      ) {
        this.$swal({
          icon: "info",
          title:
            "Bạn cần xác minh số điện thoại trước khi thực hiện chức năng này",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
      e.preventDefault();
      let balanceFormat = this.balance;
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (parseInt(this.cashbackAmount.replace(/\./g, "")) < 100000) {
            this.errors.add({
              field: "cashbackAmount",
              msg: "Số tiền rút phải lớn hơn hoặc bằng 100.000đ",
            });
            return;
          } else if (this.errors.items.length > 0) {
            return;
          } else if (this.cashbackAmount === 0) {
            this.errors.add({
              vvfield: "cashbackAmount",
              msg: "Số tiền rút phải lớn hơn hoặc bằng 100000đ",
            });
            return;
          } else if (
            parseInt(this.cashbackAmount.replace(/\./g, "")) > this.balance
          ) {
            this.errors.add({
              field: "cashbackAmount",
              msg: `Số tiền rút phải nhỏ hơn số dư đang có.`,
            });
            return;
          }
          this.isShowCashBackVerify = true;
        }
      });
    },
    hideModal() {
      this.isShowCashBackVerify = false;
    },
    hideUpdateModals(data) {
      if (data) {
        Object.assign(this.objBankInfo, data);
        this.showSuccess("Cập nhật thông tin tài khoản thành công");
        this.showErrorMobileUpdateBank(
          "Cập nhật thông tin tài khoản thành công"
        );
      } else {
        this.showError("Cập nhật thông tin tài khoản thất bại");
        this.showErrorMobileUpdateBank("Cập nhật thông tin tài khoản thất bại");
      }
      this.$store.commit("changeBankAccountPopup", false);
    },
    handledRecord(option) {
      this.recordPerPageAmount = `${option}`;
      this.pageAmount = Math.ceil(this.total / option);
    },
    handleCashBack() {
      const accountId = this.$auth.getToken("local").id;
      AccountService().then((result) => {
        const { requestTransaction } = result.default;
        requestTransaction(
          this.$axios,
          { amount: parseInt(this.cashbackAmount.replace(/\./g, "")) },
          accountId
        ).then((res) => {
          if (res.status) {
            this.isFirst = true;
            setTimeout(() => {
              this.isFirst = false;
            }, 2000);
            this.$emit("hanlerChange", true);
            this.isDrawOut = true;
            const data = res.data;
            this.$store.commit("updateBalance", data.balance);
            this.cashbackAmount = undefined;
            this.items = data.withdraws;
            // this.$store.commit('updateBalance',data.balance);
            this.showSuccess(
              "Yêu cầu rút tiền của bạn đã được ghi nhận trên hệ thống. Thông tin sẽ được xử lý trong khoảng 15 đến 20 ngày làm việc."
            );
            this.showSuccessMobileCashBack(
              "Yêu cầu rút tiền của bạn đã được ghi nhận trên hệ thống. Thông tin sẽ được xử lý trong khoảng 15 đến 20 ngày làm việc."
            );
            this.$validator.reset();
            this.hideModal();
          } else {
            if (res.data) {
              if (res.data.code === "002.005.004") {
                this.hideModal();
                // this.modalSMSVerify = true;
              } else {
                this.showError(`Lỗi ${res.data.message}`);
                this.showErrorMobileCashBack(`Lỗi ${res.data.message}`);
                this.hideModal();
              }
            } else {
              this.hideModal();
            }
          }
        });
      });
    },
    onNavVerify() {
      console.log(this.$store.state.auth.user);
      this.$store.commit("showPhoneVerify", true);
      this.$store.commit("setVerifyPhone", this.$store.state.auth.user.phone);
    },
  },
  created() {
    this.debounceHandleCashBack = Helper.debounce(this.handleCashBack, 300);
  },
};
</script>

<style lang="scss" scoped>
.bgBlue {
  background-color: #05668d;
}

.btnVerify {
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 0.875rem;
  text-transform: uppercase;
  border: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.headerTitle {
  font-size: 1.125rem;
  color: #05668d;
}
hr {
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  border: 0;
  border-top-color: currentcolor;
  border-top-style: none;
  border-top-width: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.subscribe {
  display: flex;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
}
.historyText {
  // text-transform: uppercase;
  font-size: 1.125rem;
  color: #05668d;
}
.transactionInfoContainer {
  margin-bottom: 4rem;
  justify-content: center;
}
.bank-account-container {
  // height: 4.5rem;
  padding: 0.75rem;
  border-radius: 5px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
  background-color: #fafafa;
}
.bank-account-empty {
  text-transform: uppercase;
  background-color: transparent !important;
  font-size: 0.875rem;
  font-weight: bold;
  letter-spacing: normal;
  text-align: center;
  color: #05668d !important;
  &:focus,
  &:active {
    box-shadow: none !important;
  }
}
.danger-container {
  height: 3rem;
  border-radius: 3px;
  @media (max-width: 576px) {
    height: 6rem;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
}
.greenText {
  font-size: 1.25rem;
  font-weight: bold;
  color: #00a896;
}

.bgGreen {
  background-color: #00a896;
}

.bank-number {
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
  color: #333333;
}

.bank-username {
  text-transform: uppercase;
  font-size: 1rem;
  color: #333333;
}
.status-text {
  font-size: 0.875rem;
  font-weight: bold;
}
.success {
  color: #00a896;
}
.pending {
  color: #ff771c;
}
.failed {
  color: #c94b3d;
}
@media (max-width: 576px) {
  .historyText {
    font-size: 0.9375rem;
  }
}
</style>
