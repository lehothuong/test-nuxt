<template>
  <div class="position-relative">
    <b-modal
      v-model="showPopupVerify"
      @shown="handleShownModalVerify"
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
      hide-footer
      header-class="text-uppercase text-light modalHeader"
      modal-class="modalVerify"
      centered
      title="Xác minh số điện thoại"
    >
      <div v-show="isLoading" class="isLoading">
        <div class="lds-dual-ring"></div>
      </div>
      <div>
        <span class="d-block justify-content-center text-center mb-3">
          Mã xác minh đã được gửi đến
          <span
            class="font-weight-bold"
          >{{$store.state.users.phoneNumber}}</span>, vui lòng
          nhập mã xác minh vào ô bên dưới
        </span>
        <div class="text-center mb-lg-4 pb-lg-2">
          <p class="mb-1">Mã xác minh</p>
          <div class="mb-4 position-relative">
            <input
              autofocus
              ref="verifyCode"
              v-model="inputCode"
              type="number"
              id="input-verifyCode"
              class="form-control"
              trim
              v-validate="'required|numeric|min:6|max:6'"
              :class="{ input: true, 'is-danger': errors.has('verifyCode') }"
              data-vv-as="Mã xác nhận"
              name="verifyCode"
            />
            <span class="danger is-danger-text d-block">
              {{
              errors.first("verifyCode")
              }}
            </span>
          </div>
          <button
            v-show="timer==0"
            id="captcha-container"
            @click.prevent="handleSendCode"
            class="pointer text-uppercase titleHotGreen border-0 bg-transparent"
          >Gửi lại mã</button>
          <p v-show="timer!==0">Gửi lại mã sau {{timer}} giây</p>
        </div>
        <button
          :disabled="inputCode && inputCode.toString().length !== 6"
          @click="onVerify()"
          class="d-block text-center w-100 text-uppercase font-weight-bold my-lg-3 my-2 rounded btnSubmit"
        >Xác minh</button>
        <button
          @click="handledRegisterAgain()"
          class="d-block pointer text-center w-100 text-uppercase font-weight-bold my-lg-3 rounded btnSubmitReverse"
        >Dùng số khác</button>
      </div>
    </b-modal>
  </div>
</template>
<script>
import AccountService from "@/api/account";
import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions";
export default {
  data() {
    const lastTimestamp = parseInt(
      this.$auth.$storage.getLocalStorage("verify_code_timestamp") || 0
    );
    const currentTimestamp = new Date().getTime();
    const sec = parseInt((currentTimestamp - lastTimestamp) / 1000);
    return {
      inputCode: undefined,
      isLoading: false,
      verifyInterval: null,
      tokenCapcha: "",
      timer: sec > 60 ? 0 : 60 - sec,
    };
  },
  mounted() {
    // this.initRecaptcha();

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
  computed: {
    showPopupVerify: {
      get() {
        return this.$store.state.isPopupVerify;
      },
      set(showPopupVerify) {
        this.$store.commit("changePopupVerify", showPopupVerify);
      },
    },
  },
  methods: {
    handleShownModalVerify() {
      this.startCountDown();
      this.initRecaptcha();
    },
    startCountDown() {
      const currentTimestamp = new Date().getTime();
      this.$auth.$storage.setLocalStorage(
        "verify_code_timestamp",
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
      var data = {
        phone: this.$store.state.users.phoneNumber,
        token: this.tokenCapcha,
        hash:
          this.$store.state.users.hash !== ""
            ? this.$store.state.users.hash
            : "",
      };
    },
    initRecaptcha() {
      window.recaptchaVerifier = null;
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "captcha-container",
        {
          size: "invisible",
          callback: async (res) => {
            if (this.timer > 0) {
              return;
            }
            if (res) {
              this.tokenCapcha = res;
              await this.handleSendCode();
            } else {
              console.log("error", res);
            }
          },
          "expired-callback": async () => {
            this.initRecaptcha();
          },
        }
      );
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    },
    async handleSendCode() {
      if (typeof this.tokenCapcha === "object") {
        return;
      }
      if (this.tokenCapcha == "") {
        return;
      }
      this.startCountDown();
      let users = this.$store.state.users;
      var data = {
        phone: users.phoneNumber,
        token: this.tokenCapcha,
        hash: users.hash !== "" ? users.hash : "",
      };
      AccountService.register(this.$axios, data)
        .then((resp) => {
          this.$store.commit("changeSectionId", "");
          this.$store.commit("changeUsers", {
            ...users,
            sessionId: resp.data.data.sessionId,
            // sessionId: resp.data.data.sessionId,
            // phoneNumber: users.phoneNumber,
            // name: users.name,
            // password: users.password,
            // callbackSocialLinkModify: user.callbackSocialLinkModify
          });
        })
        .catch((e) => {
          let code = e.response.data.data.code;
          console.log(code);
        });
    },
    handledRegisterAgain() {
      this.inputCode = undefined;
      this.$store.commit(
        "changeCallbackSocialLink",
        this.$store.state.users.callbackSocialLinkModify
      );
      this.showPopupVerify = false;
      this.$store.commit("changePopupRegisterAgain", true);
    },
    onVerify() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let users = this.$store.state.users;
          let data = {
            ...this.$store.state.users.callbackSocialLinkModify,
            name: users.name,
            phone: users.phoneNumber,
            password: users.password,
            verify_code: this.inputCode,
            invite_code: users.inviteCode,
            user_session_code: users.sessionId,
          };
          this.isLoading = true;
          AccountService.phoneRegistration(this.$axios, data)
            .then((resp) => {
              if (resp.data.data.code === "002.001.020") {
                this.$store.dispatch("changePopup", true);
              }
              this.inputCode = undefined;
              this.$store.commit("changePopupVerify", true);
              this.$store.commit("changePopup", false);
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
              // this.$store.dispatch(
              //   "getBalance",
              //   this.$auth.getToken(store.state.auth.strategy).token
              // );
              // this.$auth.fetchUser();
              this.$store.commit("changePopupVerifySuccess", true);
              this.showPopupVerify = false;

              if (this.$route.path !== "") {
                this.$router.push({ path: this.$route.path });
              } else {
                this.$router.push("/");
              }
              // this.$store.dispatch("getProfile", user.id);
              this.$store.commit("changePopup", false);
              this.$store.dispatch("changePopupAll");
              this.isLoading = false;
            })
            .catch((e) => {
              let code = e.response.data.data.code;
              if (code == "002.001.008") {
                this.errors.add({
                  field: "verifyCode",
                  msg: "Mã xác nhận không chính xác!",
                });
              } else {
                this.errors.add({
                  field: "verifyCode",
                  msg: "Xin vui lòng xác nhận lại!",
                });
              }
              this.isLoading = false;
            });
        }
      });
    },
  },
};
</script>
