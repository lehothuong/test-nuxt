<template>
  <div>
    <div v-show="isLoading" class="isLoading">
      <div class="lds-dual-ring"></div>
    </div>
    <p v-if="isPhoneExisted" class="login-alert-message mb-3">
      Số điện thoại đã được đăng ký. Vui lòng chọn số khác hoặc
      <a
        @click="changeToLogin"
        class="pointer"
      >
        <u>
          <strong>ĐĂNG NHẬP</strong>
        </u>
      </a>
    </p>
    <b-form id="register-form" class="register-form">
      <b-form-group id="input-group-1" label="Họ và tên" label-for="input-1" class="mb-lg-2">
        <b-form-input
          v-validate="'required'"
          :class="{'input': true, 'is-danger': errors.has('username') }"
          name="username"
          v-model="form.username"
          id="input-1"
          placeholder="Nhập họ và tên"
          data-vv-as="Họ và tên"
          type="text"
        ></b-form-input>
        <span v-show="errors.has('username')" class="is-danger-text">{{ errors.first('username') }}</span>
      </b-form-group>
      <b-form-group id="input-group-1" label="Số điện thoại" label-for="input-1" class="mb-lg-2">
        <b-form-input
          v-validate="{min:10,max:10,regex:/(03|07|08|09|05)+([0-9]{8})\b/,required:true}"
          :class="{'input': true, 'is-danger': errors.has('phoneNumber') }"
          name="phoneNumber"
          v-model="form.phoneNumber"
          id="input-2"
          placeholder="Ví dụ: 0901234567"
          data-vv-as="Số điện thoại"
          type="number"
        ></b-form-input>
        <span
          v-show="errors.has('phoneNumber')"
          class="is-danger-text"
        >{{ errors.first('phoneNumber') }}</span>
      </b-form-group>
      <b-form-group class="w-100 mb-lg-2" label="Mật khẩu">
        <b-form-input
          v-validate="'required|min:8'"
          v-model="form.password"
          name="password"
          type="password"
          data-vv-as="Mật khẩu"
          :class="{'input': true,'is-danger': errors.has('password')}"
          placeholder="Nhập mật khẩu"
          ref="password"
        ></b-form-input>
        <span
          v-show="errors.has('password')"
          class="is-danger-text d-block d-lg-none"
        >{{ errors.first('password') }}</span>
      </b-form-group>
      <b-form-group class="w-100 mb-lg-2" label="Nhập lại mật khẩu">
        <b-form-input
          v-validate="'required|confirmed:password'"
          v-model="form.passwordConfirmed"
          name="password_confirmation"
          type="password"
          data-vv-as="Mật khẩu nhập lại"
          :class="{'input': true,'is-danger': errors.has('password_confirmation')}"
          placeholder="Nhập lại mật khẩu"
        ></b-form-input>
        <span
          v-show="errors.has('password_confirmation')"
          class="is-danger-text d-block d-lg-none"
        >{{ errors.first('password_confirmation') }}</span>
      </b-form-group>
      <div class="mb-lg-2 d-none d-lg-block">
        <span v-show="errors.has('password')" class="is-danger-text">{{ errors.first('password') }}</span>
        <span
          v-show="errors.has('password_confirmation')"
          class="is-danger-text"
        >{{ errors.first('password_confirmation') }}</span>
      </div>
      <b-form-group v-if="!isLanding && dataInviteCP" class="w-100 mb-lg-3" label="Mã giới thiệu">
        <b-form-input
          v-model="inviteCodeData"
          data-vv-as="Mã giới thiệu"
          name="inviteCodeData"
          :class="{'input': true,'is-danger': errors.has('inviteCodeData')}"
          placeholder="Mã giới thiệu"
        ></b-form-input>
        <span
          v-show="errors.has('inviteCodeData')"
          class="is-danger-text"
        >{{ errors.first('inviteCodeData') }}</span>
      </b-form-group>
      <button
        :disabled="timer>0"
        id="captcha-container"
        @click.prevent="inviteCodeData ? onSubmitAll() : onSubmit()"
        class="btn-social w-100 text-uppercase text-white"
      >
        <span v-show="timer==0">Đăng ký</span>
        <span v-show="timer!==0">Vui lòng chờ {{timer}}</span>
      </button>
    </b-form>
    <b-modal
      v-model="showPopupInvite"
      hide-footer
      header-class="text-uppercase text-light modalHeader"
      id="modal-logout"
      centered
      title="Thông báo"
    >
      <div>
        <span class="d-lg-block d-flex justify-content-center text-center my-2 fontSize15">
          Mã giới thiệu bạn nhập không đúng!
          <br />Bạn có thể tiếp tục đăng ký hoặc nhập lại mã giới
          <br />thiệu để nhận ưu đãi.
        </span>
        <div class="row">
          <div class="col-6">
            <b-button
              @click="onSubmitAgain"
              type="submit"
              class="w-100 text-uppercase font-weight-bold my-lg-3 rounded btnLogoutReverse"
            >Tiếp tục</b-button>
          </div>
          <div class="col-6">
            <b-button
              type="submit"
              @click="updatePopupInvite"
              class="w-100 text-uppercase font-weight-bold my-lg-3 rounded btnLogout"
            >Nhập lại mã</b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import AccountService from "@/api/account";
import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions";
export default {
  props: {
    dataInviteCP: {
      type: String,
      default: undefined,
    },
  },
  data() {
    const lastTimestamp = parseInt(
      this.$auth.$storage.getLocalStorage("verify_timestamp") || 0
    );
    const currentTimestamp = new Date().getTime();
    const sec = parseInt((currentTimestamp - lastTimestamp) / 1000);
    return {
      showPopupInvite: false,
      isPhoneExisted: false,
      isLoading: false,
      inviteCodeData: "",
      timer: sec > 60 ? 0 : 60 - sec,
      verifyInterval: null,
      tokenCapcha: "",
      isLanding: false,
      form: {
        username: "",
        phoneNumber: "",
        password: "",
        passwordConfirmed: "",
      },
    };
  },
  created() {
    if (this.$route.name === "landing-page-dang-ky") {
      this.isLanding = true;
    }
  },
  mounted() {
    this.inviteCodeData = this.dataInviteCP;
    //this.initRecaptcha();
    if (this.$store.state.useOtherPhone) {
      this.$emit("handleTabIndex", 1);
      this.form.username = this.$store.state.users.name;
      this.form.phoneNumber = this.$store.state.users.phoneNumber;
      this.$store.commit("changePopupRegisterAgain", false);
    }
    if (Object.keys(this.$store.state.callbackSocialLink).length > 0) {
      this.form.username = this.$store.state.callbackSocialLink.name;
    }
    if (this.timer > 0) {
      this.verifyInterval = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.timer = 0;
          clearInterval(this.verifyInterval);
        }
      }, 1000);
    }
  },
  methods: {
    updatePopupInvite() {
      this.errors.add({
        field: "inviteCodeData",
        msg: "Xin vui lòng nhập lại mã giới thiệu!",
      });
      this.showPopupInvite = false;
    },
    async onSubmitAll() {
      AccountService.postAccountReferallValidation(
        this.$axios,
        this.inviteCodeData
      )
        .then((resp) => {
          if (resp.data.status) {
            this.onSubmit();
          }
        })
        .catch((e) => {
          let code = e.response.data.data.code;
          if (code == "002.006.001") {
            this.showPopupInvite = true;
          }
        });
    },
    changeToLogin() {
      this.$emit("handleTabIndex", 0);
      this.isPhoneExisted = false;
    },
    initRecaptcha() {
      window.recaptchaVerifier = null;
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "captcha-container",
        {
          size: "invisible",
          callback: async (res) => {
            if (this.form.phoneNumber === "") {
              return;
            }
            if (res) {
              this.tokenCapcha = res;
              await this.onRegister();
            } else {
              console.log("error", res);
            }
          },
          "expired-callback": async () => {
            //this.initRecaptcha();
          },
        }
      );
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    },
    async onRegister() {
      if (!this.inviteCodeData) {
        await this.onSubmit();
      } else {
        await this.onSubmitAll();
      }
    },
    onSubmitAgain() {
      this.inviteCodeData = "";
      this.showPopupInvite = false;
      this.onSubmit();
    },
    async onSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // if (typeof this.tokenCapcha === "object") {
          //   return;
          // }

          // if (this.tokenCapcha == "") {
          //   return;
          // }

          var data = {
            phone: this.form.phoneNumber,
            ...this.$store.state.callbackSocialLink,
            name: this.form.username,
            password: this.form.password,
            invite_code: this.inviteCodeData,
            // token: this.tokenCapcha,
            // hash:
            //   this.$store.state.users.phoneNumber === this.form.phoneNumber &&
            //   this.$store.state.users.hash !== ""
            //     ? this.$store.state.users.hash
            //     : "",
          };
          this.isLoading = true;
          this.isPhoneExisted = false;
          AccountService.phoneRegistration(this.$axios, data)
            .then((resp) => {
              Cookies.remove("invite_code");

              this.$store.commit("changeUsers", {
                // sessionId: resp.data.data.sessionId,
                // hash: resp.data.data.hash,
                phoneNumber: this.form.phoneNumber,
                name: this.form.username,
                password: this.form.password,
                inviteCodeData: this.inviteCodeData || undefined,
                callbackSocialLinkModify: this.$store.state.callbackSocialLink,
              });
              // this.$store.commit("changePopupVerify", true);
              this.$store.commit("changePopup", false);
              this.isLoading = false;
              this.$store.commit("changeUsers", {});
              let user = {
                expired_duration: resp.data.data.expired_duration,
                phone: resp.data.data.phone,
                id: resp.data.data.id,
                name: resp.data.data.name,
                email: resp.data.data.email,
              };
              this.$auth.setToken("local", {
                id: user.id,
                token: `Bearer ${resp.data.data.token}`,
              });
              this.$store.dispatch("getProfile", {
                id: user.id,
                token: "Bearer " + resp.data.data.token,
              });
              this.$store.commit("changePopupVerifySuccess", true);

              if (this.$route.path !== "") {
                this.$router.push({ path: this.$route.path });
              } else {
                this.$router.push("/");
              }
            })
            .catch((e) => {
              let code = e.response.data.data.code;
              if (code == "002.001.018") {
                this.isPhoneExisted = true;
                // this.$emit(
                //   "handleErrorRegister",
                //   "Số điện thoại đã được đăng ký!"
                // );
              } else if (code == "002.001.007") {
                this.$emit(
                  "handleErrorRegister",
                  "Có vẻ bạn đã gửi yêu cầu nhiều lần, vui lòng thử lại sau"
                );
                const currentTimestamp = new Date().getTime();
                this.$auth.$storage.setLocalStorage(
                  "verify_timestamp",
                  currentTimestamp
                );
                this.timer = 60;
                clearInterval(this.verifyInterval);
                this.verifyInterval = setInterval(() => {
                  this.timer--;
                  if (this.timer <= 0) {
                    this.timer = 0;
                    clearInterval(this.verifyInterval);
                  }
                }, 1000);
              } else {
                if (code == "002.001.025") {
                  this.$emit(
                    "handleErrorRegister",
                    "Số điện thoại không hợp lệ!"
                  );
                } else {
                  this.$emit("handleErrorRegister", "Vui lòng thử lại!");
                }
              }
              this.isLoading = false;
            });
        }
      });
    },
  },
  beforeDestroy() {
    this.$store.commit("changePopup", false);
    //document.getElementById("register-form").remove();
  },
};
</script>
<style lang="scss" scoped>
.fontSize15 {
  font-size: 0.9375rem;
}
.btnLogoutReverse {
  border: solid 1px #00a896;
  background-color: #ffffff;
  color: #00a896;
  padding: 0.75rem 1rem;
  &:hover,
  &:focus,
  &:active {
    background-color: #f2f2f2 !important;
    box-shadow: none !important;
    outline: none;
    color: #00a896 !important;
  }
}

.btnLogout {
  border: solid 1px #00a896;
  background-color: #00a896;
  color: #ffffff;
  padding: 0.75rem 1rem;
  &:hover,
  &:focus,
  &:active {
    background-color: #008073 !important;
    box-shadow: none !important;
    outline: none;
  }
}
.form-control {
  margin-bottom: 0.25rem;
}
.login-alert-message {
  font-size: 0.875rem;
  text-align: center;
  color: #ff0000;
}
</style>