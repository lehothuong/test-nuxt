<template>
  <div class="benefitBg pt-lg-3 pb-lg-5 pb-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-12 pr-lg-2">
          <!-- @updatePhone="updatePhone" -->

          <ResetBefore
            :errorMsg="errorMsg"
            :timerProp="timer"
            :tokenCapcha="tokenCapcha"
            :userSessionId="userSessionId"
            :isShowAlert="isShowAlert"
            :isLoading="isLoading"
            @updateLoading="updateLoading"
            :phone="phone"
            :verifyInterval="verifyInterval"
            @updateVerifyInterval="updateVerifyInterval"
            @updateTokenCapcha="updateTokenCapcha"
            @updateInput="updateInput"
            @updateError="updateError"
            @updateTimer="updateTimer"
            @updatePhone="updatePhone"
            v-if="!isSendSMS"
          ></ResetBefore>

          <div v-else class="createPasswordContainer rounded5px h-100 position-relative">
            <div v-show="isReLoading" class="h-100 overFlowBg">
              <div class="d-flex justify-content-center align-items-center w-100 h-100 text-center">
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
            <div>
              <span class="headerTitle text-uppercase font-weight-bold">Tạo mật khẩu mới</span>
              <hr />
              <div v-show="isSuccess" class="text-center">
                <div class="d-flex justify-content-center mt-4 mb-lg-2 mb-3">
                  <img alt="goCASHBACK" src="../../assets/img/checked.png" width="50" height="50" />
                </div>
                <span class="d-block mb-3 text-center">Cập nhật mật khẩu mới thành công</span>
                <button
                  @click="handleViewProfileButton()"
                  class="text-uppercase text-white font-weight-bold my-lg-3 py-lg-2 px-lg-4 rounded5px btnCloseModal w-100-576"
                >Xem hồ sơ</button>
              </div>
              <div v-show="!isSuccess">
                <span class="d-block justify-content-center text-center mb-3">
                  Mã xác minh đã được gửi đến
                  <span class="font-weight-bold">{{ phone }}</span> (
                  <a
                    @click="updateSentPhone"
                    class="text-uppercase pointer titleChildColor"
                  >Thay đổi</a>) , vui lòng nhập mã xác minh vào ô bên dưới
                </span>
                <div
                  v-if="isShowAlert2"
                  class="alert-danger w-100 danger-container my-lg-3 py-lg-2 d-flex flex-row align-items-center"
                >
                  <span class="ml-lg-4">{{ errorMsg2 }}</span>
                </div>
                <b-form-group id="group-otp" label="Mã xác minh" label-for="input-otp">
                  <b-form-input
                    id="input-otp"
                    ref="OTP"
                    v-model="OTP"
                    type="number"
                    class="form-control"
                    trim
                    v-validate="'required|numeric|min:6|max:6'"
                    :class="{ input: true, 'is-danger': errors.has('OTP') }"
                    data-vv-as="Mã xác nhận"
                    name="OTP"
                  />
                  <!-- @click.prevent="handleSendCode" -->

                  <button
                    v-show="timer == 0"
                    id="captcha-container"
                    @click.prevent="handleSendCode"
                    class="pointer text-uppercase btnSendCode border-0 bg-transparent sendAgainCodeCreatePassword"
                  >Gửi lại mã</button>
                  <p class="text-uppercase sendAgainCodeCreatePassword" v-show="timer !== 0">
                    Gửi lại mã sau {{ timer }}
                    <span class="text-normal">s</span>
                  </p>
                  <span class="danger is-danger-text d-block">
                    {{
                    errors.first("OTP")
                    }}
                  </span>
                </b-form-group>
                <b-form-group id="group-newpass" label="Mật khẩu mới" label-for="input-newpass">
                  <b-form-input
                    v-model="newPassword"
                    data-vv-as="Mật khẩu"
                    :class="{
                      input: true,
                      'is-danger': errors.has('password')
                    }"
                    v-validate="'required|min:8|max:16'"
                    name="password"
                    type="password"
                    id="input-newpass"
                    ref="password"
                    aria-describedby="password-help-block"
                  />
                  <div v-show="errors.has('password')" class="mt-lg-1">
                    <span class="is-danger-text">{{ errors.first("password") }}</span>
                  </div>
                </b-form-group>

                <b-form-group
                  id="group-newpassretype"
                  label="Nhập lại mật khẩu mới"
                  label-for="input-newpassretype"
                >
                  <b-form-input
                    v-model="newPasswordRetype"
                    data-vv-as="Mật khẩu nhập lại"
                    :class="{
                      input: true,
                      'is-danger': errors.has('password_confirmation')
                    }"
                    v-validate="'required|confirmed:password'"
                    name="password_confirmation"
                    type="password"
                    id="input-newpassretype"
                    aria-describedby="password-help-block"
                  />
                  <div v-show="errors.has('password_confirmation')" class="mt-lg-1">
                    <span class="is-danger-text">{{ errors.first("password_confirmation") }}</span>
                  </div>
                </b-form-group>
                <b-button
                  :disabled="changePasswordButtonDisabled"
                  class="btn btnCloseModal mt-lg-2 px-lg-4 w-100-576"
                  @click="onResetPassword"
                >Cập nhật</b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-7 col-12 pl-lg-2 mt-0">
          <img
            src="../../assets/img/img_quenmatkhau-big.png"
            class="img-fluid d-lg-block d-lg-none"
            alt="goCASHBACK"
          />
        </div>
        <b-modal
          hide-footer
          header-class="text-uppercase text-light modalHeader"
          id="modal-invalid-token"
          centered
          title="Thông báo"
        >
          <div class="p-sm-1 text-center">
            <span class="d-block mb-lg-3">Lỗi token không hợp lệ.</span>
            <b-button
              type="submit"
              @click="$bvModal.hide('modal-invalid-token')"
              class="w-100 text-uppercase text-white font-weight-bold py-lg-3 my-lg-3 rounded btnCloseModal"
            >Đóng</b-button>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import AccountService from "@/api/account";
import ResetBefore from "@/components/passwordReset/ResetBefore";
import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions";

export default {
  components: {
    ResetBefore,
  },
  data() {
    const lastTimestamp = parseInt(
      this.$auth.$storage.getLocalStorage("verify_timestamp_forgot") || 0
    );
    const currentTimestamp = new Date().getTime();
    const sec = parseInt((currentTimestamp - lastTimestamp) / 1000);
    return {
      //UI
      isShowAlert: false,
      isLoading: false,
      isReLoading: false,
      errorMsg: "",
      isShowAlert2: false,
      errorMsg2: "",
      //form 1
      phone: "",
      isSendSMS: false,
      timer: sec > 60 ? 0 : 60 - sec,
      verifyInterval: null,
      tokenCapcha: "",
      tokenReCapcha: "",
      //form 2
      userSessionId: "",
      OTP: "",
      newPassword: "",
      newPasswordRetype: "",
      isSuccess: false,
    };
  },
  computed: {
    changePasswordButtonDisabled() {
      return (
        this.newPassword == "" ||
        this.newPasswordRetype == "" ||
        this.newPassword != this.newPasswordRetype
      );
    },
  },
  watch: {
    isSendSMS: function (newVal, oldVal) {
      if (newVal) {
        this.initRecaptchaSecond();
      }
    },
  },
  updated() {
    //  if(this.isSendSMS) this.initRecaptchaSecond()
  },
  mounted() {
    // this.initRecaptcha();
    // if(this.isSendSMS) this.initRecaptchaSecond()
    if (this.verifyInterval) {
      clearInterval(this.verifyInterval);
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
    updateLoading(val) {
      this.isLoading = val;
    },
    updateTimer(val) {
      this.timer = val;
    },
    updateVerifyInterval(val) {
      this.verifyInterval = val;
    },
    updateTokenCapcha(val) {
      this.tokenCapcha = val;
    },
    updateSentPhone() {
      this.phone = "";
      this.isSendSMS = false;
    },
    handleViewProfileButton() {
      this.$store.dispatch("changeTabIndexProfile", 1);
      this.$router.push("/tai-khoan");
    },
    updateError(val) {
      this.showError(val);
    },
    showError(msg) {
      this.isShowAlert = true;
      this.errorMsg = msg;
    },
    showError2(msg) {
      this.isShowAlert2 = true;
      this.errorMsg2 = msg;
    },
    initRecaptchaSecond() {
      window.recaptchaVerifier = null;
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "captcha-container",
        {
          size: "invisible",
          callback: async (res) => {
            if (this.phone === "" || this.timer > 0) {
              return;
            }
            if (res) {
              this.tokenReCapcha = res;
              await this.handleSendCode();
            } else {
              console.log("error", res);
            }
          },
          "expired-callback": async () => {
            window.recaptchaVerifier.clear();
            this.initRecaptchaSecond();
          },
        }
      );
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    },
    onResetPassword() {
      this.isReLoading = true;
      AccountService.resetPassword(this.$axios, {
        phone: this.phone,
        user_session_code: this.userSessionId,
        verify_code: this.OTP,
        new_password: this.newPassword,
      })
        .then((res) => {
          if (res.status) {
            this.$auth.setStrategy("local");
            this.$auth.setToken("local", {
              id: res.data.id,
              token: `Bearer ${res.data.token}`,
            });
            this.$store.dispatch("getProfile", {
              id: res.data.id,
              token: "Bearer " + res.data.token,
            });
            this.isSuccess = true;
            this.userSessionId = "";
            this.OTP = "";
            this.newPassword = "";
            this.newPasswordRetype = "";
            this.userSessionId = "";
          } else {
            this.showError2(
              "Mã xác minh không chính xác, vui lòng kiểm tra lại."
            );
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.isReLoading = false;
        });
    },
    updatePhone() {
      this.onSubmit();
    },
    updateInput(val) {
      this.phone = val;
    },
    startCountDown() {
      const currentTimestamp = new Date().getTime();
      this.$auth.$storage.setLocalStorage(
        "verify_timestamp_forgot",
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
    async handleSendCode() {
      if (typeof this.tokenReCapcha === "object") {
        return;
      }
      if (this.tokenReCapcha == "") {
        return;
      }
      this.startCountDown();
      const hashData = this.$store.state.forgotPassword.hash
        ? { hash: this.$store.state.forgotPassword.hash }
        : {};
      var data = {
        phone: this.phone,
        token: this.tokenReCapcha,
        // ...hashData
      };
      const resp = await AccountService.sendResetPasswordRequest(
        this.$axios,
        data
      );
    },
    async onSubmit() {
      // window.recaptchaVerifier.clear()
      const isValidate = await this.$validator.validateAll();
      if (isValidate) {
        if (typeof this.tokenCapcha === "object") {
          return;
        }
        if (this.tokenCapcha == "") {
          return;
        }
        const hashData = this.$store.state.forgotPassword.hash
          ? { hash: this.$store.state.forgotPassword.hash }
          : {};
        var data = {
          phone: this.phone,
          token: this.tokenCapcha,
          ...hashData,
        };
        // this.isLoading = true;
        const resp = await AccountService.sendResetPasswordRequest(
          this.$axios,
          data
        );
        // this.isLoading = false;
        if (resp.status) {
          const { sessionId, hash } = resp.data;
          this.userSessionId = sessionId;
          this.$store.commit("changeForgotPasswordHash", hash);
          const currentTimestamp = new Date().getTime();
          this.$auth.$storage.setLocalStorage(
            "verify_timestamp_forgot",
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
          this.isSendSMS = true;
          this.isLoading = false;
          // this.initRecaptchaSecond()
        } else {
          this.isLoading = false;
          if (
            resp.data.code === "002.001.007" ||
            resp.data.code === "002.001.022"
          ) {
            this.showError(resp.data.message);
          } else if (
            resp.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER"
          ) {
            this.showError("Bạn đã thử quá nhiều lần");
          } else {
            this.showError("Vui lòng thử lại!");
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.viewContainer {
  background-color: #f8f8f8;
  padding: 1rem 10rem 3rem 10rem;
}
.headerTitle {
  font-size: 1.125rem;
  color: #05668d;
}
hr {
  margin-top: 0.3rem;
  margin-bottom: 0.8rem;
  border: 0;
  border-top-color: currentcolor;
  border-top-style: none;
  border-top-width: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.createPasswordContainer {
  background-color: white;
  padding: 1.25rem;
  transition: 0.3s all;
}
.btnCloseModal {
  background-color: #00a896;
  border: 0;
  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled).active,
  .show > &.dropdown-toggle {
    background-color: #008073 !important;
    box-shadow: none;
  }
  &:focus {
    background-color: #008073 !important;
    box-shadow: none;
  }
  &:hover {
    background-color: #008073 !important;
  }
}
.bgBlue {
  text-overflow: ellipsis;
  background-color: #05668d;
  width: 30%;
  height: calc(1.5em + 1rem + 1px);
  line-height: 0;
}

.btnVerify {
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 0.875rem;
  text-transform: uppercase;
  border: none;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.input-wrapper {
  display: flex;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  padding-right: 0px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-right-width: 0px;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  .form-control {
    flex: 1;
    border-width: 0px !important;
    padding-left: 0px !important;
  }
}
</style>
