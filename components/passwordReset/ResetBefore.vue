<template>
  <div class="h-100">
    <div class="createPasswordContainer rounded5px h-100 position-relative">
      <div v-show="isLoadingProp" class="h-100 overFlowBg">
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
        <span class="headerTitle text-uppercase font-weight-bold">Quên mật khẩu</span>
        <hr />
        <p class="text-center">
          Vui lòng nhập số điện thoại đã đăng ký, hệ thống sẽ gửi mã xác minh để
          bạn thiết lập lại mật khẩu.
        </p>
        <div
          v-if="isShowAlert"
          class="alert-danger w-100 danger-container my-lg-3 py-lg-2 d-flex flex-row align-items-center"
        >
          <span class="ml-lg-4">{{ errorMsg }}</span>
        </div>
        <b-form-group
          class="mt-lg-3"
          id="group-phone"
          label="Số điện thoại"
          label-for="input-phone"
        >
          <div class="input-wrapper subscribe align-items-center">
            <b-form-input
              id="input-phone"
              trim
              v-validate="{min:10,max:10,regex:/(03|07|08|09|05)+([0-9]{8})\b/,required:true}"
              data-vv-as="Số điện thoại"
              name="phoneData"
              ref="phoneData"
              class="w-100 border-0"
              placeholder="Ví dụ: 0901234567"
              type="number"
              v-model="phoneData"
            />
            <b-button
              id="captcha-container"
              :disabled="timer > 0 || errors.has('phoneData') || !phoneData"
              @click.prevent="onSubmit"
              class="btn btnVerify bgBlue ml-auto"
            >
              <span v-show="timer == 0">GỬI MÃ</span>
              <span v-show="timer !== 0">{{ timer }}</span>
            </b-button>
          </div>
          <span
            v-show="errors.has('phoneData')"
            class="is-danger-text"
          >{{ errors.first("phoneData") }}</span>
        </b-form-group>
      </div>
    </div>
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
  props: {
    tokenCapcha: {
      type: String,
    },
    verifyInterval: {
      type: Number,
    },
    timerProp: {
      type: Number,
    },
    errorMsg: {
      type: String,
    },
    phone: {
      type: String,
    },
    isShowAlert: {
      type: Boolean,
    },
    isLoading: {
      type: Boolean,
    },
  },
  computed: {
    tokenCapchaData: {
      get() {
        return this.tokenCapcha;
      },
      set(newVal) {
        this.$emit("updateTokenCapcha", newVal);
      },
    },
    isLoadingProp: {
      get() {
        return this.isLoading;
      },
      set(newVal) {
        this.$emit("updateLoading", newVal);
      },
    },
    phoneData: {
      get() {
        return this.phone;
      },
      set(newVal) {
        this.$emit("updateInput", newVal);
      },
    },
    verifyIntervalProp: {
      get() {
        return this.verifyInterval;
      },
      set(newVal) {
        this.$emit("updateVerifyInterval", newVal);
      },
    },
    timer: {
      get() {
        return this.timerProp;
      },
      set(newVal) {
        this.$emit("updateTimer", newVal);
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.initRecaptcha();
    // this.initRecaptchaSecond()
    if (this.timer > 0) {
      this.verifyIntervalProp = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.timer = 0;
          clearInterval(this.verifyIntervalProp);
        }
      }, 1000);
    }
  },
  methods: {
    onSubmit() {
      this.isLoadingProp = true;
      this.$emit("updatePhone");
    },
    initRecaptcha() {
      window.recaptchaVerifier = null;
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "captcha-container",
        {
          size: "invisible",
          callback: async (res) => {
            if (this.phone === "") {
              return;
            }
            if (res) {
              this.tokenCapchaData = res;
              await this.onSubmit();
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
