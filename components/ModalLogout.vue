<template>
  <b-modal
    v-model="changeLogoutPopup"
    hide-footer
    header-class="text-uppercase text-light modalHeader"
    id="modal-logout"
    centered
    title="Đăng xuất"
  >
    <div>
      <span
        class="d-lg-block d-flex justify-content-center text-center my-4"
      >Bạn muốn thoát khỏi tài khoản?</span>
      <div class="row">
        <div class="col-6">
          <b-button
            @click="changeLogoutPopup=false"
            type="submit"
            class="w-100 text-uppercase font-weight-bold my-lg-3 rounded btnLogoutReverse"
          >Hủy</b-button>
        </div>
        <div class="col-6">
          <b-button
            type="submit"
            @click="handledLogout()"
            class="w-100 text-uppercase font-weight-bold my-lg-3 rounded btnLogout"
          >Thoát</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script>
import OneSignalService from "@/api/onesignal";

export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {
    changeLogoutPopup: {
      get() {
        return this.$store.state.modalLogout;
      },
      set(modalLogout) {
        this.$store.commit("changeLogout", modalLogout);
      },
    },
  },
  methods: {
    async handledLogout() {
      this.changeLogoutPopup = false;
      let deviceInfo = this.$auth.$storage.getLocalStorage("device-info");
      if (deviceInfo) {
        await OneSignalService.removeOnesignalWithAccount(
          this.$axios,
          deviceInfo
        );
      }
      await this.$auth.logout();
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.$cookies.get("local2")}`;
      // this.$auth.$storage.setLocalStorage("is_us", "");
      // this.$store.commit("updateAccountId", undefined);
      this.$route.path == "/"
        ? this.$router.push("/")
        : this.$route.router.go("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.btnLogoutReverse {
  border: solid 1px #05668d;
  background-color: #ffffff;
  color: #05668d;
  padding: 0.75rem 1rem;
  &:hover,
  &:focus,
  &:active {
    background-color: #f2f2f2 !important;
    box-shadow: none !important;
    outline: none;
    color: #05668d !important;
  }
}

.btnLogout {
  border: solid 1px #05668d;
  background-color: #05668d;
  color: #ffffff;
  padding: 0.75rem 1rem;
  &:hover,
  &:focus,
  &:active {
    background-color: #044862 !important;
    box-shadow: none !important;
    outline: none;
  }
}
</style>