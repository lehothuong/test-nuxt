<template>
  <b-modal
    v-model="showPopupVerifySuccess"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-footer
    header-class="text-uppercase text-light modalHeader"
    modal-class="modalVerify"
    id="modal-logout"
    centered
    title="Đăng ký thành công"
  >
    <div>
      <div class="d-flex justify-content-center mt-3 mb-lg-4 mb-3">
        <img alt="goCASHBACK" src="../assets/img/checked.png" width="50" height="50" />
      </div>
      <p
        class="text-center mb-4"
      >Đăng ký thành viên hoàn tất. Hãy cập nhật thông tin tài khoản để luôn nhận được thông tin mới nhất từ goCASHBACK.</p>
      <a
        @click="handleRouter(1)"
        class="d-block pointer text-center text-white w-100 text-uppercase font-weight-bold my-2 rounded btnSubmit"
      >Cập nhật ngay</a>
      <a
        @click="handleHidePopup()"
        target="_blank"
        class="d-block pointer text-center w-100 text-uppercase font-weight-bold my-lg-2 rounded btnSubmitReverse"
      >Để sau</a>
    </div>
  </b-modal>
</template>
<script>
import AccountService from "@/api/account";
export default {
  data() {
    return {
      inputCode: undefined
    };
  },
  computed: {
    showPopupVerifySuccess: {
      get() {
        return this.$store.state.isPopupVerifySuccess;
      },
      set(showPopupVerifySuccess) {
        this.$store.commit("changePopupVerifySuccess", showPopupVerifySuccess);
      }
    }
  },
  mounted() {},
  methods: {
    handleRouter(value) {
      this.$store.dispatch("changeTabIndexProfile", value);
      this.$router.push("/tai-khoan");
      this.showPopupVerifySuccess = false;
    },
    handleHidePopup() {
      this.showPopupVerifySuccess = false;
      this.$router.push("/");
    }
  }
};
</script>
