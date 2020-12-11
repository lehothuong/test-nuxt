<template>
  <div class="position-relative">
    <b-modal
      v-model="showPhoneVerify"
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
      <div v-if="!isSent">
        <span class="d-block justify-content-center text-center mb-3">
          Bạn đang thực hiện xác mình số điện thoại. Hệ thống sẽ gửi mã xác minh đến số điện thoại
          <span
            class="font-weight-bold"
          >{{$store.state.verifyPhoneNumber}}</span> bạn dùng để đăng ký.
        </span>

        <button
          id="captcha-container"
          :aria-disabled="timer  > 0"
          @click.prevent="handleSendCode"
          class="d-block text-center w-100 text-uppercase font-weight-bold my-lg-3 my-2 rounded btnSubmit"
        >{{timer > 0?`Vui lòng chờ ${timer} giây`:"TIẾP TỤC"}}</button>
      </div>
      <div v-else>
        <div>
          <span class="d-block justify-content-center text-center mb-3">
            Mã xác minh đã được gửi đến
            <span
              class="font-weight-bold"
            >{{$store.state.verifyPhoneNumber}}</span>, vui lòng
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
              @click.prevent="handleSendCode"
              class="pointer text-uppercase titleHotGreen border-0 bg-transparent"
            >
              <div id="recaptchaWrapper">
                <div id="captcha-container" />
              </div>Gửi lại mã
            </button>
            <p v-show="timer!==0">Gửi lại mã sau {{timer}} giây</p>
          </div>
          <button
            :disabled="inputCode && inputCode.toString().length !== 6"
            @click="onVerify()"
            class="d-block text-center w-100 text-uppercase font-weight-bold my-lg-3 my-2 rounded btnSubmit"
          >Xác minh</button>
        </div>
      </div>
      <button
        @click="handledRegisterAgain()"
        class="d-block pointer text-center w-100 text-uppercase font-weight-bold my-lg-3 rounded btnSubmitReverse"
      >ĐỂ SAU</button>
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
      this.$auth.$storage.getLocalStorage("verify_code_timestamp_phone") || 0
    );
    const currentTimestamp = new Date().getTime();
    const sec = parseInt((currentTimestamp - lastTimestamp) / 1000);
    return {
      sessionCode: "",
      isSent: false,
      inputCode: undefined,
      isLoading: true,
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
    showPhoneVerify: {
      get() {
        return this.$store.state.showPhoneVerify;
      },
      set(showPhoneVerify) {
        if (!showPhoneVerify) {
          this.isSent = false;
        }
        this.$store.commit("showPhoneVerify", showPhoneVerify);
      },
    },
  },
  methods: {
    handleShownModalVerify() {
      this.initRecaptcha();
    },
    startCountDown() {
      const currentTimestamp = new Date().getTime();
      this.$auth.$storage.setLocalStorage(
        "verify_code_timestamp_phone",
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
            window.recaptchaVerifier.clear();
            document.getElementById(
              "recaptchaWrapper"
            ).innerHTML = `<div id="captcha-container"></div>`;
            this.initRecaptcha();
          },
          "error-callback": () => {
            this.$swal({
              icon: "error",
              title: "Xảy ra lỗi khi yêu cầu reCaptcha. Vui lòng thử lại",
              showConfirmButton: false,
              timer: 2000,
            });
            this.handledRegisterAgain();
            return;
          },
        }
      );
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
        this.isLoading = false;
      });
    },
    async handleSendCode() {
      this.isLoading = true;
      if (this.timer > 0) {
        this.isLoading = false;

        return;
      }
      if (typeof this.tokenCapcha === "object") {
        this.isLoading = false;

        return;
      }
      if (this.tokenCapcha == "") {
        this.isLoading = false;
        return;
      }
      let users = this.$store.state.users;
      let phone = this.$store.state.verifyPhoneNumber;
      var data = {
        phone,
        token: this.tokenCapcha,
        hash: users.hash !== "" ? users.hash : "",
      };
      const accountId = this.$auth.getToken("local").id;

      AccountService.requestVerify(this.$axios, data, accountId)
        .then((resp) => {
          const data = resp.data;
          console.log(data);
          if (data.status) {
            this.sessionCode = data.data.sessionId;
          }
          this.isSent = true;
          this.startCountDown();

          if (!data.status) {
            this.errors.add({
              field: "verifyCode",
              msg: resp.data.message,
            });
          }
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;

          this.$swal({
            icon: "error",
            title: e.response.data.message,
            showConfirmButton: true,
          });
          this.handledRegisterAgain();
        });
      this.isLoading = false;
    },

    handledRegisterAgain() {
      this.inputCode = undefined;
      this.showPhoneVerify = false;
      this.$store.commit("setVerifyPhone", "");
    },

    onVerify() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let users = this.$store.state.users;
          let data = {
            phone: this.$store.state.verifyPhoneNumber,
            verify_code: this.inputCode,
            user_session_code: this.sessionCode,
          };
          this.isLoading = true;
          const accountId = this.$auth.getToken("local").id;

          AccountService.verifyPhoneNumber(this.$axios, data, accountId)
            .then((resp) => {
              const data = resp.data;
              this.isLoading = false;

              if (data.status) {
                this.$swal({
                  icon: "success",
                  title: "Xác minh số điện thoại thành công",
                  showConfirmButton: true,
                });
                this.$store.dispatch("getProfile", {
                  id: this.$auth.getToken("local").id,
                  token: this.$auth.getToken("local").token,
                });
                this.handledRegisterAgain();
              } else {
                if (data.code == "002.001.008") {
                  this.errors.add({
                    field: "verifyCode",
                    msg: "Mã xác nhận không chính xác!",
                  });
                } else {
                  this.errors.add({
                    field: "verifyCode",
                    msg: data.message,
                  });
                }
              }
            })
            .catch((e) => {
              console.log(e);
              this.isLoading = false;
            });
        }
      });
    },
  },
};
</script>
