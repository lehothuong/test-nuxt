<template>
  <b-modal
    v-model="modalShowBank"
    @show="showModal()"
    modal-class="bank-account-modal modalMobile"
    title="Thêm tài khoản ngân hàng"
    hide-footer
    id="modal-center"
    centered
  >
    <b-form @submit="onSubmit">
      <div class="row transactionInfoContainer">
        <div class="col-lg-6 pr-lg-2">
          <b-form-group
            id="group-name"
            label="Tên chủ TK"
            label-for="input-name"
            class="mt-lg-1 mb-lg-2"
          >
            <b-form-input
              id="input-name"
              v-model="bankAccount.bank_account_name"
              v-validate="'required'"
              :class="{'input': true, 'is-danger': errors.has('username') }"
              name="username"
              data-vv-as="Họ và tên"
              type="text"
            />
            <span
              v-show="errors.has('username')"
              class="is-danger-text"
            >{{ errors.first('username') }}</span>
          </b-form-group>
          <b-form-group
            id="group-bank"
            label="Ngân hàng"
            lazy
            label-for="dropdown-banks"
            class="mt-lg-1 mb-lg-2"
          >
            <b-dropdown
              id="dropdown-banks"
              v-bind:text="selectedBank.short_name"
              v-model="selectedBank.short_name"
              class="dropdown-input-form m-0 form-control p-0"
            >
              <b-dropdown-item
                v-for="(bank, index) in banks"
                :key="index"
                :value="bank.name"
                @click="handleBankSelect(index)"
              >{{ bank.short_name }}</b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </div>
        <div class="col-lg-6 pl-lg-2">
          <b-form-group
            id="group-number"
            label="Số tài khoản"
            label-for="input-number"
            class="mt-lg-1 mb-lg-2"
          >
            <b-form-input
              v-model="bankAccount.bank_account_number"
              v-validate="'required|numeric'"
              :class="{'input': true, 'is-danger': errors.has('accountNumber') }"
              name="accountNumber"
              data-vv-as="Số tài khoản"
              type="number"
            />
            <span
              v-show="errors.has('accountNumber')"
              class="is-danger-text"
            >{{ errors.first('accountNumber') }}</span>
          </b-form-group>
          <b-form-group
            id="group-branch"
            label="Chi nhánh"
            label-for="input-branch"
            class="mt-lg-1 mb-lg-2"
          >
            <b-form-input
              v-model="bankAccount.bank_branch"
              v-validate="'required'"
              :class="{'input': true, 'is-danger': errors.has('bankBranch') }"
              name="bankBranch"
              data-vv-as="Chi nhánh"
              type="text"
            />
            <span
              v-show="errors.has('bankBranch')"
              class="is-danger-text"
            >{{ errors.first('bankBranch') }}</span>
          </b-form-group>
        </div>
      </div>
      <b-form-group
        id="group-province"
        label="Tỉnh/Thành phố"
        label-for="dropdown-provinces"
        class="mt-lg-1 mb-lg-2 w-100"
      >
        <b-dropdown
          lazy
          block
          id="dropdown-provinces"
          v-bind:text="selectedProvince.name"
          v-model="selectedProvince.name"
          class="dropdown-input-form m-0 form-control p-0"
        >
          <b-dropdown-item
            v-for="(province, index) in provinces"
            :key="index"
            :value="province.name"
            @click="handleProvinceSelect(index)"
          >{{ province.name }}</b-dropdown-item>
        </b-dropdown>
      </b-form-group>
      <b-button type="submit" class="btn btnCashback bgGreen rounded mt-lg-3 w-100">Lưu thông tin</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import _ from "lodash";
import AccountService from "@/api/account";

export default {
  props: {
    bankAccount: {
      type: Object,
      default: {},
    },
    banks: {
      type: Array,
      default: () => [],
    },
    provinces: {
      type: Array,
      default: () => [],
    },
    hideUpdateModals: {
      type: Function,
      default: () => {},
    },
  },
  watch: {
    // bankAccount: function(newBankInfo, oldBankInfo) {
    //   const isHaveBankAccount = Object.keys(this.bankAccount || {}).length > 0;
    //   // const selectedBank = this.banks.filter(bank => {
    //   //   return bank.id === this.bankAccount.bank_id;
    //   // })[0];
    //   (this.accountName = this.bankAccount.bank_account_name || ""),
    //     (this.accountNumber = this.bankAccount.bank_account_number || ""),
    //     (this.bankBranch = this.bankAccount.bank_branch || ""),
    //     // (this.selectedBank = selectedBank || this.banks[0]);
    //     (this.selectedProvince = isHaveBankAccount
    //       ? {
    //           id: this.bankAccount.province_id,
    //           name: this.bankAccount.province_name
    //         }
    //       : this.provinces[0] || {});
    // }
  },
  computed: {
    modalShowBank: {
      get() {
        return this.$store.state.showBankAccountPopup;
      },
      set(showBankAccountPopup) {
        this.$store.commit("changeBankAccountPopup", showBankAccountPopup);
      },
    },
  },
  mounted(){
  },
  methods: {
    showModal() {
      let bank = Array.from(this.banks).filter(
        (bank) => bank.id == this.$store.state.bankInfo.bank_id
      )[0];
      this.selectedBank = bank ? bank : {};
      let province = Array.from(this.provinces).filter(
        (province) => province.id == this.$store.state.bankInfo.province_id
      )[0];
      this.selectedProvince = province || {};
    },
    handleBankSelect(index) {
      this.selectedBank = this.banks[index];
    },
    handleProvinceSelect(index) {
      this.selectedProvince = this.provinces[index];
    },
    hideModal(isUpdated = false, code = 400) {
      this.modalShowBank = false;
      // if (isUpdated === true && code === 204) {
      //   const updateData = {
      //     bank_account_name: this.accountName,
      //     bank_account_number: this.accountNumber,
      //     bank_image_url: this.selectedBank.image_url,
      //     bank_branch: this.bankBranch,
      //     bank: this.selectedBank
      //   };
      //   this.hideUpdateModals(updateData);
      // } else {
      //   this.hideUpdateModals();
      // }
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$validator.validateAll().then((res) => {
        if (res) {
          const updateData = {
            bank_branch: this.bankAccount.bank_branch,
            bank_account_name: this.bankAccount.bank_account_name,
            bank_account_number: this.bankAccount.bank_account_number,
            bank_id: this.selectedBank.id,
            province_id: this.selectedProvince.id,
          };
          const accountId = this.$auth.getToken("local").id;
          AccountService.updateBankAccount(
            this.$axios,
            updateData,
            accountId
          ).then((res) => {
            this.$store.commit("changBankInfo", {
              bank_branch: this.bankAccount.bank_branch,
              bank_account_name: this.bankAccount.bank_account_name,
              bank_image_url: this.selectedBank.image_url,
              bank_account_number: this.bankAccount.bank_account_number,
              bank_id: this.selectedBank.id,
              bank_name: this.selectedBank.name,
              province_id: this.selectedProvince.id,
              province_name: this.selectedProvince.name,
            });
            this.$emit("updateAlertBank", false);
            this.hideModal(true, res.status);
          });
        } else {
          switch (false) {
            case this.accountName:
              this.errors.add({
                vvfields: "accountName",
                msg: "Tên chủ tài khoản là bắt buộc",
              });
              break;
            case this.accountNumber:
              this.errors.add({
                vvfields: "accountNumber",
                msg: "Số tài khoản là bắt buộc",
              });
              break;
            case this.bankBranch:
              this.errors.add({
                vvfields: "bankBranch",
                msg: "Chi nhánh là bắt buộc",
              });
              break;
          }
        }
      });
    },
  },
  data() {
    return {
      bankBranch: "",
      accountName: "",
      accountNumber: "",
      selectedBank: {},
      selectedProvince: {},
    };
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.bgGreen {
  background-color: #00a896;
}
</style>