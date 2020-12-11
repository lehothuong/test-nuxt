<template>
  <div class="contentLanding h-100vh position-relative">
    <div class="contentLandingImage"></div>
    <div>
      <div class="contentLandingHeader">
        <nuxt-link to="/" class="d-block mb-2">
          <img alt="goCASHBACK" src="../../assets/img/logo.png" width="184" height="28" />
        </nuxt-link>
        <h6>Ứng Dụng Hoàn Tiền Mua Sắm Online</h6>
      </div>
      <div class="container h-100vh">
        <div class="row justify-content-lg-center h-100 align-items-center">
          <div class="contentBoxLanding position-relative">
            <div class="bg-white">
              <div class="row justify-content-lg-center m-0">
                <div class="col-lg-6 p-0 d-none d-lg-block">
                  <img
                    src="https://d604u3cjqmj8m.cloudfront.net/resources/banners/web-29.jpg"
                    class="w-100 h-100 obfit"
                  />
                </div>
                <div class="col-lg-6 p-0 d-flex login-modal bg-white">
                  <client-only>
                    <b-tabs
                      v-model="tabIndex"
                      content-class="px-lg-3 px-10-res mb-lg-4 mb-10-res w-100vw position-relative"
                    >
                      <b-tab class="py-lg-3 mt-3" title="Đăng nhập">
                        <p v-show="textError" class="login-alert-message">{{ textError }}</p>
                        <!-- v-show="!$device.isIos && !isApp" -->
                        <div class="mb-lg-0 mb-4">
                          <!-- <p class="login-title my-2">Đăng nhập với</p> -->
                          <div class="borderBottomSocial mb-3">
                            <b-button
                              @click="facebook()"
                              class="btn-social text-white rounded border-0 d-flex align-items-center w-100 mb-10-res"
                              style="background-color:#3b5998"
                            >
                              <img
                                alt="facebook"
                                src="../../assets/img/icon/icon_signup_facebook.svg"
                                width="18"
                                height="18"
                                class="mr-4"
                              />
                              Đăng nhập với Facebook
                            </b-button>
                            <b-button
                              @click="google()"
                              class="btn-social btn-gg rounded d-flex align-items-center w-100 mb-10-res"
                              style="background-color:#fff"
                            >
                              <img
                                alt="google"
                                src="../../assets/img/icon/icon_google.svg"
                                width="18"
                                height="18"
                                class="mr-4"
                              />
                              Đăng nhập với Google
                            </b-button>
                          </div>
                        </div>
                        <Login></Login>
                        <div class="footerLoginPopup">
                          Bằng cách tiếp tục, tôi xác nhận rằng tôi đã đọc và hiểu
                          các
                          <a
                            href="/thong-tin/chinh-sach-bao-mat"
                            target="_blank"
                          >điều khoản sử dụng</a>
                          và
                          <a
                            target="_blank"
                            href="/thong-tin/chinh-sach-bao-mat"
                          >Chính sách quyền riêng tư.</a>
                          <div class="mt-2">
                            Bạn chưa có tài khoản?
                            <a @click="tabIndex = 1" class="pointer">Đăng ký</a>
                          </div>
                        </div>
                      </b-tab>
                      <b-tab title="Đăng ký">
                        <b-alert
                          v-show="textNotificationRegister"
                          show
                        >{{ textNotificationRegister }}</b-alert>
                        <p
                          v-show="textErrorRegister"
                          class="login-alert-message mb-3"
                        >{{ textErrorRegister }}</p>
                        <Register @handleTabIndex="handleTabIndex"></Register>
                        <div v-if="!textNotificationRegister" class="mb-lg-0 mb-4 register-social">
                          <img class="mb-3" src="../../assets/img/signup-img.jpg" />
                          <div class="w-100 mb-3">
                            <b-button
                              @click="facebook()"
                              class="btn-social text-white rounded border-0 d-flex align-items-center w-100 mb-10-res"
                              style="background-color:#3b5998"
                            >
                              <img
                                alt="facebook"
                                src="../../assets/img/icon/icon_signup_facebook.svg"
                                width="18"
                                height="18"
                                class="mr-4"
                              />
                              Đăng ký với Facebook
                            </b-button>
                            <b-button
                              @click="google()"
                              class="btn-social btn-gg rounded d-flex align-items-center w-100 mb-10-res"
                              style="background-color:#fff"
                            >
                              <img
                                alt="google"
                                src="../../assets/img/icon/icon_google.svg"
                                width="18"
                                height="18"
                                class="mr-4"
                              />
                              Đăng ký với Google
                            </b-button>
                            <!-- isDomainApp && $device.isIos -->
                            <div
                              v-if="isDomainApp && $device.isIos"
                              class="apple"
                              data-type="continue"
                              id="appleid-signin"
                            >
                              <b-button
                                @click="apple()"
                                class="btn-social text-white rounded border-0 d-flex align-items-center w-100 justify-content-center"
                                style="background-color:#000000"
                              >
                                <img
                                  src="../../assets/img/icon/icon_signup_apple.svg"
                                  width="16"
                                  height="16"
                                  class="mr-2 p-1"
                                />
                                Sign in with Apple
                              </b-button>
                            </div>
                          </div>
                        </div>
                        <div class="footerLoginPopup">
                          Bằng cách tiếp tục, tôi xác nhận rằng tôi đã đọc và hiểu
                          các
                          <a
                            href="/thong-tin/chinh-sach-bao-mat"
                            target="_blank"
                          >điều khoản sử dụng</a>
                          và
                          <a
                            target="_blank"
                            href="/thong-tin/chinh-sach-bao-mat"
                          >Chính sách quyền riêng tư.</a>
                        </div>
                      </b-tab>
                    </b-tabs>
                  </client-only>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Register from "@/components/Register";
import Login from "@/components/Login";
const BannerService = () => import("@/api/banner");
export default {
  layout: "defaultLanding",
  components: {
    Register,
    Login,
  },
  data() {
    return {
      banners: [],
      isDomainApp:false
    };
  },
  computed: {
    tabIndex: {
      get() {
        return this.$store.state.tabIndexAccount;
      },
      set(value) {
        this.$store.commit("changeTabIndex", value);
      },
    },
    textErrorRegister: {
      get() {
        return this.$store.state.textErrorRegisters;
      },
      set(value) {
        this.$store.commit("handleErrorRegister", value);
      },
    },
    textNotificationRegister: {
      get() {
        return this.$store.state.textNotificationRegisters;
      },
      set(value) {
        this.$store.commit("handleNotificationRegister", value);
      },
    },
    textError() {
      return this.$store.state.textError;
    },
  },
  created() {
    if(this.$route.path =='/landing-page/dang-ky'){
      this.$cookies.set("url_redirect", 'landing-page');
    }
    this.getBannerHome();
    this.tabIndex = 1;
  },
  mounted() {
    if (window.location.hostname == "app.gocashback.vn") {
      this.isDomainApp = true;
    }
    // this.$nextTick(()=>{
    //    if(document.querySelector('#fb-root')){
    //      document.querySelector('#fb-root').remove()
    //    }
    // })
  },

  methods: {
    handleTabIndex(tabIndex) {
      this.tabIndex = tabIndex;
    },
    getBannerHome() {
      BannerService().then((result) => {
        result.default.getBanner(this.$axios).then((resp) => {
          this.banners = resp.data.data.w_login.pos_01[0];
        });
      });
    },
    facebook() {
      this.$cookies.set("url", this.$route.fullPath);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("LOGIN_FB");
      } else {
        this.$auth
          .loginWith("facebook")
          .then((resp) => {
            //console.log(resp)
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    google() {
      this.$cookies.set("url", this.$route.fullPath);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("LOGIN_GG");
      } else {
        this.$auth
          .loginWith("google")
          .then((resp) => {})
          .catch((e) => {
            console.log(e);
            let code = e.response.data.data.code;
            if (code === "002.001.017") {
              this.$swal({
                icon: "error",
                title: "Tài khoản của bạn đã bị khoá",
                showConfirmButton: false,
                timer: 700,
              });
            }
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.register-social {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 1rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  > img {
    width: 55%;
  }
}
.contentLandingHeader {
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #ff599a;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  h6 {
    font-weight: 400 !important;
    color: #fff;
  }
}
.contentLandingImage {
  background-image: url("https://d604u3cjqmj8m.cloudfront.net/resources/banners/web-29.jpg");
  filter: blur(30px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: scale(1.1);
  &::after {
    background-color: rgba(0, 0, 0, 0.6);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.h-100vh {
  height: 100vh;
}

.contentLanding {
  overflow: hidden;
  .container {
    overflow-y: scroll;
    padding-top: 80px;
  }
}

@media (min-width: 1920px) {
  .contentBoxLanding {
    max-width: 900px;
  }
}
@media (max-width: 576px) {
  .contentBoxLanding {
    height: 100%;
    h2 {
      background-color: white;
      padding-top: 2rem;
      padding-bottom: 1rem;
      color: #333333;
    }

    .bg-white {
      height: 100%;
    }
  }
}
@media (max-width: 1920px) and (min-width: 992px) {
  .contentBoxLanding {
    max-width: 825px;
  }
}

.footerLoginPopup {
  margin-top: 1.5rem;
  font-size: 15px;
  a {
    text-decoration: underline !important;
    white-space: nowrap;
  }
}
</style>
