<template>
  <section>
    <client-only>
      <header v-if="$device.isDesktop" class="d-none d-lg-block">
        <div class="top-header">
          <div class="container">
            <div class="row py-2">
              <div class="col-lg-8 d-flex align-items-center w-100">
                <div class="logo mr-3">
                  <nuxt-link to="/">
                    <img alt="goCASHBACK" src="../assets/img/logo.png" />
                  </nuxt-link>
                </div>
                <Affiliate></Affiliate>
              </div>
              <div class="menu col-lg-4">
                <nav class="w-100" :class="{ 'd-flex justify-content-end': !loggedIn }">
                  <ul>
                    <li v-show="!loggedIn">
                      <a
                        title="Đăng nhập"
                        class="login text-white"
                        @click="handledLogin(modalShow)"
                      >Đăng nhập</a>
                    </li>
                    <li v-show="!loggedIn">
                      <a
                        title="Đăng ký"
                        class="login text-white"
                        @click="handledRegister(modalShow)"
                      >Đăng ký</a>
                    </li>
                    <b-dropdown
                      v-if="loggedIn"
                      id="dropdown-1"
                      class="dropdown-profile w-100 flex-row d-flex"
                      variant="transparent"
                    >
                      <template v-slot:button-content>
                        <p class="user-name text-truncate text-right">XIN CHÀO, {{ profile.name }}</p>
                      </template>
                      <div class="cash-info">
                        <p class="cash-title">Số tiền</p>
                        <p class="cash-text">{{ formatPrice(balance) }}</p>
                      </div>
                      <b-dropdown-divider />
                      <b-dropdown-item class="text-normal" @click="handleRouter(1)">Hồ sơ cá nhân</b-dropdown-item>
                      <b-dropdown-divider />
                      <b-dropdown-item
                        class="text-normal"
                        @click="handleRouter(0)"
                      >Quản lý hoàn tiền</b-dropdown-item>
                      <!-- <b-dropdown-divider />
                      <b-dropdown-item>Thông tin tài khoản</b-dropdown-item>-->
                      <b-dropdown-divider />
                      <b-dropdown-item class="text-normal" @click="handleRouter(2)">Rút tiền</b-dropdown-item>
                      <b-dropdown-divider />
                      <b-dropdown-item class="text-normal" @click="handleRouter(3)">Giới thiệu</b-dropdown-item>
                      <b-dropdown-divider />
                      <b-dropdown-item @click="modalLogoutPopup = true">Thoát</b-dropdown-item>
                    </b-dropdown>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="bgSubHeader">
          <div class="container sub-header">
            <div class="d-flex px-auto w-100">
              <div class="category">
                <b-dropdown
                  menu-class="category-bd"
                  id="dropdown-1"
                  ref="dropdown"
                  text="Danh mục"
                  class="w-100 category-menu"
                >
                  <div v-for="category in categories" v-bind:key="category.id">
                    <b-dropdown-item
                      v-show="category.sub_categories.length === 0"
                      :to="`/${category.slug}-c${category.id}`"
                    >
                      <!-- <nuxt-link
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="true"
                      >-->
                      <span>{{ category.name }}</span>
                      <!-- </nuxt-link> -->
                    </b-dropdown-item>
                    <b-dropdown-item v-show="category.sub_categories.length !== 0" class="sub-menu">
                      <li class="dropdown" x-placement="right-start">
                        <a
                          href="#"
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          <span class="nav-label">{{ category.name }}</span>
                          <span class="caret"></span>
                        </a>
                        <ul
                          class="dropdown-menu dropdown-menu-child m-0 border-left-0 rounded-right"
                        >
                          <li
                            v-for="(sub_cate, index) in category.sub_categories"
                            v-bind:item="sub_cate"
                            v-bind:index="index"
                            v-bind:key="sub_cate.slug"
                          >
                            <a href="#">{{ sub_cate.name }}</a>
                          </li>
                        </ul>
                      </li>
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
              </div>
              <nuxt-link
                class="ml-lg-4 d-flex align-items-center font-weight-bold"
                to="/thong-tin/cach-nhan-hoan-tien"
              >CÁCH NHẬN HOÀN TIỀN</nuxt-link>
              <a
                target="_blank"
                class="ml-lg-4 d-flex align-items-center font-weight-bold text-uppercase"
                href="https://gocashback.vn/cam-nang/"
              >Cẩm nang</a>
              <nuxt-link
                :to="'/thong-tin/gioi-thieu-ban'"
                class="ml-lg-4 d-flex align-items-center font-weight-bold text-uppercase color-pink"
              >
                <img src="../assets/img/icon/icon_ref.svg" width="16" height="16" class="mr-2" />
                giới thiệu bạn - nhận 50k
              </nuxt-link>
              <!-- <nuxt-link
                :to="'/nut-hoan-tien'"
                class="d-flex align-items-center font-weight-bold text-uppercase color-pink ml-auto"
              >
                <img src="../assets/img/icon/chrome.svg" width="16" height="16" class="mr-2" />
                Nút hoàn tiền
              </nuxt-link>-->
            </div>
          </div>
        </div>
      </header>
    </client-only>
    <b-modal
      v-model="modalShow"
      @hide="hideModal"
      modal-class="login-modal loginOverflow"
      hide-footer
      id="modal-center"
      centered
    >
      <div class="row m-0 bg-res-white" style="min-height: 600px;">
        <div class="col-lg-6 borderRightPopup p-0 d-none d-lg-block overflow-hidden">
          <div class="banner-login h-100">
            <a class="pointer d-block" :title="banners.display_text" @click="handleBanner(banners)">
              <img :alt="banners.display_text" :src="banners.image_url" class="w-100 h-100 obfit" />
              <!-- <img alt="goCASHBACK" src="../assets/img/img_signup.jpg" class="w-100 h-100 obfit" /> -->
            </a>
          </div>
          <!-- <img alt="goCASHBACK" src="../assets/img/img_signup.jpg" class="w-100 h-100 obfit" /> -->
        </div>
        <div class="col-lg-6 px-0">
          <b-tabs
            v-model="tabIndex"
            content-class="px-lg-3 px-10-res mb-lg-4 mb-10-res position-relative"
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
                      src="../assets/img/icon/icon_signup_facebook.svg"
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
                      src="../assets/img/icon/icon_google.svg"
                      width="18"
                      height="18"
                      class="mr-4"
                    />
                    Đăng nhập với Google
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
                        src="../assets/img/icon/icon_signup_apple.svg"
                        width="16"
                        height="16"
                        class="mr-2 p-1"
                      />
                      Sign in with Apple
                    </b-button>
                  </div>
                </div>
              </div>
              <Login></Login>
              <div class="footerLoginPopup">
                Bằng cách tiếp tục, tôi xác nhận rằng tôi đã đọc và hiểu các
                <a
                  href="/thong-tin/chinh-sach-bao-mat"
                  target="_blank"
                >điều khoản sử dụng</a>
                và
                <a
                  target="_blank"
                  href="/thong-tin/chinh-sach-bao-mat"
                >Chính sách quyền riêng tư.</a>
                <div class="mt-3">
                  Bạn chưa có tài khoản?
                  <a @click="tabIndex = 1" class="pointer">Đăng ký</a>
                </div>
              </div>
            </b-tab>
            <b-tab class="pt-3" title="Đăng ký">
              <!-- <p v-show="textNotificationRegister" class="mb-3">{{textNotificationRegister}}</p> -->
              <b-alert show>
                <p class="mb-2" v-show="dataInviteCP">
                  Bạn đã được mời tham gia goCASHBACK.
                  Đăng ký ngay hôm nay để nhận ưu đãi 50.000đ!
                </p>
                <p>{{textNotificationRegister}}</p>
              </b-alert>
              <p v-show="textErrorRegister" class="login-alert-message mb-3">{{ textErrorRegister }}</p>
              <Register
                :dataInviteCP="dataInviteCP"
                @handleErrorRegister="handleErrorRegister"
                @handleTabIndex="handleTabIndex"
              ></Register>
              <div v-if="!textNotificationRegister" class="mb-lg-0 mb-4 register-social">
                <img class="mb-3" src="../assets/img/signup-img.jpg" />
                <div class="w-100 mb-3">
                  <b-button
                    @click="facebook()"
                    class="btn-social text-white rounded border-0 d-flex align-items-center w-100 mb-10-res"
                    style="background-color:#3b5998"
                  >
                    <img
                      alt="facebook"
                      src="../assets/img/icon/icon_signup_facebook.svg"
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
                      src="../assets/img/icon/icon_google.svg"
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
                        src="../assets/img/icon/icon_signup_apple.svg"
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
                Bằng cách tiếp tục, tôi xác nhận rằng tôi đã đọc và hiểu các
                <a
                  href="/thong-tin/chinh-sach-bao-mat"
                  target="_blank"
                >điều khoản sử dụng</a>
                và
                <a
                  target="_blank"
                  href="/thong-tin/chinh-sach-bao-mat"
                >Chính sách quyền riêng tư.</a>
                <!-- <div class="mt-3">
                  Bạn chưa có tài khoản?
                    <a
                      @click="tabIndex = 0"
                      class="pointer"
                    >Đăng nhập</a>
                </div>-->
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script>
import Login from "@/components/Login";
import Register from "@/components/Register";
import Affiliate from "@/components/homepage/Affiliate";
const ProductService = () => import("@/api/product");
const AccountService = () => import("@/api/account");
const BannerService = () => import("@/api/banner");
export default {
  name: "header-desktop",
  components: {
    Login,
    Register,
    Affiliate,
  },
  data() {
    return {
      showForgot: true,
      emailForgotPassword: "",
      emailForgotPasswordWarning: "",
      alreadySendEmail: false,
      categories: [],
      isApp: false,
      modalLogout: false,
      isDomainApp: false,
      banners: [],
      // textError: undefined,
      // textErrorRegister: undefined
    };
  },
  created() {
    if (this.$route.hash === "#app") {
      this.isApp = true;
    }
    this.getBannerHome();
    this.getListCategories();
  },
  mounted() {
    if (window.location.hostname == "app.gocashback.vn") {
      this.isDomainApp = true;
    }
  },
  updated() {},
  watch: {},
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
    loggedIn() {
      return this.$auth.loggedIn;
    },
    balance() {
      return this.$store.state.balance;
    },
    modalLogoutPopup: {
      get() {
        return this.$store.state.modalLogout;
      },
      set(modalLogout) {
        this.$store.commit("changeLogout", modalLogout);
      },
    },
    dataInviteCP: {
      get() {
        return this.$store.getters.invitedCode;
      },
      set(newVal) {
        this.$store.commit("changeInvite", newVal);
      },
    },
    modalShow: {
      // return this.$store.state.showPopup
      get() {
        return this.$store.state.showPopup;
      },
      set(showPopup) {
        this.$store.commit("changePopup", showPopup);
      },
    },
    modalForgotShow: {
      get() {
        return this.$store.state.showPopupForgotPassword;
      },
      set(showPopup) {
        this.$store.commit("changePopupForgotPassword", showPopup);
      },
    },
    profile() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    handleBanner(obj) {
      if (obj.is_affiliate == 1) {
        let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
        let targetUrl = obj.target_url + `a-${accountId}`;
        let result = handleVendorLink(
          targetUrl,
          this.$store.state.vendorPlatform,
          window
        );
        this.$store.commit("changeVendor", {
          vendorId: result.id,
          vendorName: result.name,
          vendorUrl: targetUrl,
        });
        if (this.$cookies.get("adblock")) {
          this.$store.commit("changePopupAdblock", true);
        } else if (!this.$auth.loggedIn) {
          this.$store.commit("isCommision", true);
          this.$store.commit("changePopup", true);
        } else {
          // window.open(obj.target_url+`a-${accountId}`, '_blank');
          if (accountId) {
            switch (result.platform) {
              case 2:
                // let payload = {'isPopup':true,'targetUrl':targetUrl,'vendorName':result.name}
                // this.$store.commit('changeModalPlatform',payload)
                this.$store.commit("changeCheckCashBack", true);
                this.$store.dispatch("changePopupAll");
                break;
              case undefined:
                this.$swal({
                  icon: "info",
                  title:
                    "Rất tiếc, hiện tại website này không nằm trong hệ thống hoàn tiền của goCASHBACK",
                  showConfirmButton: false,
                  timer: 4000,
                });
                break;
              default:
                this.$store.dispatch("changePopupAll");
                //  window.open(obj.target_url+`a-${accountId}`, '_blank');
                break;
            }
          }
        }
      } else {
        if (obj.target_url) {
          let result = handledWatchDomain(obj.target_url);
          result
            ? window.open(obj.target_url, obj.target_type || "_blank")
            : this.$router.push({ path: obj.target_url });
        }
      }
    },
    getBannerHome() {
      BannerService().then((result) => {
        result.default.getBanner(this.$axios).then((resp) => {
          this.banners = resp.data.data.w_login.pos_01[0];
        });
      });
    },
    handleRouter(value) {
      this.$store.dispatch("changeTabIndexProfile", value);
      this.$router.push("/tai-khoan");
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
    async apple() {
      this.$cookies.set("url", this.$route.fullPath);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("LOGIN_APPLE");
      } else {
        this.$router.push("/social-auth/callback");
        if (!window.AppleID) {
          err(
            '"https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" needs to be included as a <script>'
          );
          return;
        } else {
          window.AppleID.auth.init({
            clientId: "com.gocashback.web",
            scope: "name email",
            redirectURI: `${window.location.href}social-auth/callback`,
            state: "",
            usePopup: true,
          });
        }
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
    handleErrorRegister(error) {
      this.textErrorRegister = error;
    },
    // handleError(error) {
    //   this.textError = error;
    // },
    onOver() {
      this.$refs.dropdown.visible = true;
    },
    onLeave() {
      this.$refs.dropdown.visible = false;
    },
    handleTabIndex(tabIndex) {
      this.tabIndex = tabIndex;
    },
    handledLogin() {
      this.tabIndex = 0;
      this.$store.commit("changePopup", !this.$store.state.showPopup);
    },
    handledRegister() {
      this.tabIndex = 1;
      this.$store.commit("changePopup", !this.$store.state.showPopup);
    },

    hideModal() {
      this.$store.commit("changeCallbackSocialLink", {});
      this.$store.commit("changePopup", false);
      this.textErrorRegister = undefined;
      this.textNotificationRegister = undefined;
      this.$store.commit("handleError", undefined);
      this.tabIndex = 0;
    },

    getListCategories() {
      ProductService().then((result) => {
        result.default
          .getListCategories(this.$axios)
          .then((resp) => {
            this.categories = resp.data.data;
          })
          .then(() => {});
      });
    },
    forgotPassword() {
      AccountService().then((result) => {
        result.default
          .sendResetPasswordRequest(this.$axios, this.emailForgotPassword)
          .then((res) => {
            this.emailForgotPasswordWarning = "";
            this.alreadySendEmail = true;
          })
          .catch((e) => {
            this.emailForgotPasswordWarning = "Email không tồn tại.";
          });
      });
    },
    closeModalForgot() {
      this.$store.commit(
        "changePopupForgotPassword",
        !this.$store.state.showPopupForgotPassword
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.banner-login {
  background-color: #fe599b;
  > a {
    position: absolute;
    bottom: 0;
  }
}
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
header {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  .top-header {
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #ff599a;
  }
  .bgSubHeader {
    background-color: #fff;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 0.25rem;
  }
  .sub-header {
    > a {
      align-items: center;
      display: flex;
      font-weight: bold !important;
      color: #333333;
    }
  }
  .category {
    background-color: #f2f2f2;
    .dropdown-menu > li > a {
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.36;
      letter-spacing: normal;
      text-align: left;
      color: #333333;
    }
  }
}

.login {
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
}

.logo {
  img {
    width: 184px;
    height: 28px;
  }
}
.menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    display: flex;
    align-items: center;

    li {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      a {
        white-space: nowrap;
        text-transform: uppercase;
      }
    }
  }
}

.apple {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  svg {
    rect {
      ry: 3px !important;
    }
  }
}

.user-name {
  text-align: left;
  color: #ffffff;
  font-size: 0.875rem;
  padding-right: 0.75rem;
}

.dropdown-divider {
  margin: 0 0.5rem;
}

.footerLoginPopup {
  margin-top: 1.5rem;
  font-size: 15px;
  a {
    text-decoration: underline !important;
    white-space: nowrap;
  }
}

.infoShopping {
  display: block;
  font-size: 17px;
  font-weight: bold;
  border: 1px solid #707070;
  width: 29px;
  height: 29px;
  border-radius: 50%;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
  }
}
.borderRightPopup {
  border-right: 1px solid #c6c6c6;
}

.bgLeftModal {
  background-color: #ededed;
}

.login-alert-message {
  font-size: 0.875rem;
  text-align: center;
  color: #ff0000;
}

.login-title {
  font-size: 0.875rem;
  text-align: center;
  color: #333333;
}

.btnForgotPassword {
  background-color: #00a896;
  border: 0;
  transition: 0.3s all;
  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled).active,
  .show > &.dropdown-toggle {
    background-color: #008073 !important;
    box-shadow: none;
  }
  &:focus {
    background-color: #008073;
    box-shadow: none;
  }
  &:hover {
    background-color: #008073 !important;
  }
}
.borderBottomSocial {
  border-bottom: 1px solid #d0d0d0;
  padding-bottom: 1rem;
}

@media (max-width: 576px) {
  .footerLoginPopup {
    font-size: 0.75rem;
  }
}
</style>
