<template>
  <div class="fadeMobile" :class="{'display_account':isCheckAccount}">
    <header class="headerMobile">
      <div class="container">
        <div class="headerMobileTop row">
          <div class="logo col-6">
            <nuxt-link to="/">
              <img alt="goCASHBACK" src="../assets/img/logo.png" />
            </nuxt-link>
          </div>
          <div class="col-6 d-flex align-items-center pl-1">
            <a
              title="Dán link sản phẩm"
              class="pointer searchMobile"
              id="menuBtnSearch"
              @click.prevent="handleToAff()"
            >
              <div class="d-flex justify-content-center align-items-center">
                <div class="input-find">
                  <form autocomplete="off">
                    <input
                      class="form-control border-0"
                      disabled
                      ref="inputs"
                      type="text"
                      placeholder="Dán link sản phẩm"
                    />
                    <div class="app-search">
                      <img
                        src="../assets/img/icon/icon_go.svg"
                        alt="goCASHBACK"
                        class
                        width="18"
                        height="18"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </a>
            <!-- <a class="pointer searchMobile" id="menuBtnAccount" @click="handledLogin(modalShow)">
                    <img class="mr-10" alt="goCASHBACK" width="24" height="24" src="../assets/img/icon/icon_account.svg" />
            </a>-->
          </div>
        </div>
      </div>
      <div class="menuMobileCenter d-flex align-items-center justify-content-between">
        <p class="pointer titleCategoryMobile" @click="displayMenuCategory()">Danh mục</p>
        <div>
          <div class="pointer" id="hamburger" @click="displayMenu()">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <ul class="categoryMobile dropdown-menu w-100 border-0" @click="displayRemoveMenuCategory()">
        <div v-for="category in categories" v-bind:key="category.id">
          <div v-show="category.sub_categories.length === 0">
            <nuxt-link
              :to="`/${category.slug}-c${category.id}`"
              class="titleCollapse noAfter pointer"
            >
              {{ category.name }}
              <span></span>
            </nuxt-link>
          </div>
          <div v-show="category.sub_categories.length !== 0" class="sub-menu">
            <a :title="category.name" v-b-toggle.collapse-3 class="titleCollapse pointer">
              {{category.name}}
              <span></span>
            </a>
            <b-collapse
              :id="`collapse-${index}`"
              v-for="(sub_cate, index) in category.sub_categories"
              :key="index"
            >
              <a
                :title="sub_cate.name"
                v-b-toggle.collapse-&#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x60;${index}&#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x26;#x60;
                class="titleCollapse titleCollapseItem pointer"
              >
                {{ sub_cate.name }}
                <span></span>
              </a>
            </b-collapse>
          </div>
        </div>
      </ul>
      <ul class="menuAccount menuCategory" @click="displayRemoveMenuAccount()">
        <div class="text-center py-3">
          <p>Số dư</p>
          <p class="cash-text">{{formatPrice(balance)}}</p>
        </div>
        <li>
          <a title="Hồ sơ cá nhân" class="pointer" @click="handleRouter(1)">
            Hồ sơ cá nhân
            <span></span>
          </a>
        </li>
        <li>
          <a title="Quản lý hoàn tiền" class="pointer" @click="handleRouter(0)">
            Quản lý hoàn tiền
            <span></span>
          </a>
        </li>
        <li>
          <a title="Rút tiền" class="pointer" @click="handleRouter(2)">
            Rút tiền
            <span></span>
          </a>
        </li>
        <li>
          <a title="Thoát" class="pointer" @click="handledLogout()">
            Thoát
            <span></span>
          </a>
        </li>
      </ul>
      <ul class="menu menuCategory" @click="displayRemoveMenu()">
        <li>
          <nuxt-link
            title="Cách nhận hoàn tiền"
            class="font-weight-bold text-uppercase"
            to="/thong-tin/cach-nhan-hoan-tien"
          >
            Cách nhận hoàn tiền
            <span></span>
          </nuxt-link>
        </li>
        <div v-show="!isDomainApp">
          <li>
            <a
              target="_blank"
              class="d-flex align-items-center font-weight-bold text-uppercase"
              href="https://gocashback.vn/cam-nang/"
            >Cẩm nang</a>
          </li>
        </div>
        <li>
          <nuxt-link
            :to="'/thong-tin/gioi-thieu-ban'"
            class="d-flex align-items-center font-weight-bold text-uppercase color-pink"
          >
            <img src="../assets/img/icon/icon_ref.svg" width="16" height="16" class="mr-2" />
            giới thiệu bạn - nhận 50k
          </nuxt-link>
        </li>
        <li>
          <a
            title="Giới thiệu"
            class="font-weight-bold text-uppercase colorTitleInfoGroup"
          >Giới thiệu</a>
        </li>
        <li v-for="item of $store.state.typeSecond" v-bind:key="item.tag">
          <nuxt-link
            :title="item.title"
            href="#contact"
            :to="'/thong-tin/'+item.tag"
          >{{ item.title }}</nuxt-link>
        </li>
        <li>
          <a title="Hỗ trợ" class="font-weight-bold text-uppercase colorTitleInfoGroup">Hỗ trợ</a>
        </li>
        <li key="fb_support">
          <a title="Hỗ trợ qua Facebook" @click="onOpenFanpage" target="_blank">
            <img
              alt="Hỗ trợ facebook"
              src="../assets/img/icon/icon_support_fb_menu.svg"
              width="15"
              height="15"
              style="margin-top: -2px; margin-right: 5px"
            />
            goCASHBACK.vn
          </a>
        </li>
        <li key="gg_support">
          <a
            title="Hỗ trợ qua Email"
            href="mailto:support@gocashback.vn?subject=Yêu%20cầu%20hỗ%20trợ"
          >
            <img
              alt="Hỗ trợ Email"
              src="../assets/img/icon/icon_support_email_menu.svg"
              width="15"
              height="15"
              style="margin-top: -2px; margin-right: 5px"
            />
            support@goCASHBACK.vn
          </a>
        </li>
        <div v-show="!isDomainApp">
          <li>
            <a
              title="Tải ứng dụng"
              class="font-weight-bold text-uppercase colorTitleInfoGroup"
            >Tải ứng dụng</a>
          </li>
          <li class="d-flex">
            <a
              title="Tải ứng dụng trên IOS"
              href="https://apps.apple.com/vn/app/gocashback/id1508702789"
              class="pointer mb-lg-2 d-block w-50 pr-2"
            >
              <img
                alt="goCASHBACK"
                class="w-100"
                src="https://d604u3cjqmj8m.cloudfront.net/resources/images/btn-ios-store.png"
              />
            </a>
            <a
              title="Tải ứng dụng trên Android"
              href="https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.hongkytech.gocashback&hl=vi"
              class="pointer d-block w-50 pl-2"
            >
              <img
                alt="goCASHBACK"
                class="w-100"
                src="https://d604u3cjqmj8m.cloudfront.net/resources/images/btn-adr-store.png"
              />
            </a>
          </li>
          <li v-if="!isDomainApp">
            <a
              class="text-center"
              target="_blank"
              href="http://online.gov.vn/Home/WebDetails/69491"
            >
              <img
                src="https://s3-ap-southeast-1.amazonaws.com/gocashback.vn/resources/images/logoSaleNoti.png"
                width="150"
                class="heightAuto"
              />
            </a>
          </li>
        </div>
      </ul>
      <!-- <a href="" class="logo">CSS Nav</a>
          <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>-->
    </header>

    <div
      id="popupSeachAff"
      class="popupAff d-flex justify-content-center align-items-center"
      :class="{'popupAffActive':isShow}"
    >
      <div class="input-find h-auto">
        <form @submit.prevent="handledSumitAff(affLink)" autocomplete="off">
          <input
            class="form-control"
            ref="inputs"
            type="text"
            v-model="affLink"
            placeholder="Dán link sản phẩm…"
          />
          <a @click.prevent="handledSumitAff(affLink)" title="Dán link sản phẩm" class="app-search">
            <img src="../assets/img/icon/icon_go.svg" alt="goCASHBACK" class width="18" height="18" />
          </a>
        </form>
      </div>
    </div>
    <div class="bgShowPopup" :class="{'bgShowPopupShow':isShow}"></div>
  </div>
</template>
<script>
import ProductService from "@/api/product";
import { handleVendorLink } from "@/misc/helpers";
import Adblock from "@/components/Adblock";
import OneSignalService from "@/api/onesignal";

export default {
  components: {
    Adblock,
  },
  data() {
    return {
      isShow: false,
      affLink: "",
      isShowMenu: false,
      categories: [],
      isCheckAccount: false,
      isDomainApp: false,
    };
  },
  mounted() {
    let me = this;
    if (window.location.hostname == "app.gocashback.vn") {
      this.isDomainApp = true;
    }
    document.addEventListener("click", function (e) {
      // console.log('teste')
      if (document.getElementById("menuBtnSearch").contains(e.target)) {
        me.isShow = true;
      } else {
        if (!document.getElementById("popupSeachAff").contains(e.target)) {
          me.affLink = "";
          me.isShow = false;
        }
      }
    });
  },
  created() {
    this.getListCategories();
  },
  computed: {
    balance() {
      return this.$store.state.balance;
    },
  },
  methods: {
    onInviteFriend() {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("Cẩm nang");
      }
      window.open("https://gocashback.vn/cam-nang/gioi-thieu-ban-be");
    },
    onOpenFanpage() {
      if (window.location.hostname == "app.gocashback.vn") {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage("OPEN_FAN_PAGE");
        }
      } else {
        window.open("https://www.facebook.com/gocashback.vn/", "_blank");
      }
    },
    handleToAff() {
      this.$refs.inputs.focus();
    },
    async handledLogout() {
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
        : this.$router.router.go("/");
    },
    handleRouter(value) {
      this.$store.dispatch("changeTabIndexProfile", value);
      this.$router.push("/tai-khoan");
    },
    getListCategories() {
      ProductService.getListCategories(this.$axios).then((resp) => {
        this.categories = resp.data.data;
      });
    },
    displayRemoveMenu() {
      var body = document.getElementsByTagName("body")[0];
      body.classList.contains("display_menu")
        ? body.classList.remove("display_menu")
        : "";
    },
    displayRemoveMenuCategory() {
      var body = document.getElementsByTagName("body")[0];
      body.classList.contains("display_menu_category")
        ? body.classList.remove("display_menu_category")
        : "";
    },
    displayRemoveMenuAccount() {
      this.isCheckAccount = false;
    },
    displayMenu() {
      var body = document.getElementsByTagName("body")[0];
      body.classList.contains("display_menu_category")
        ? body.classList.remove("display_menu_category")
        : "";
      !body.classList.contains("display_menu")
        ? body.classList.add("display_menu")
        : body.classList.remove("display_menu");
    },
    displayMenuCategory() {
      var body = document.getElementsByTagName("body")[0];
      body.classList.contains("display_menu")
        ? body.classList.remove("display_menu")
        : "";
      !body.classList.contains("display_menu_category")
        ? body.classList.add("display_menu_category")
        : body.classList.remove("display_menu_category");
    },
    handledSumitAff(v) {
      if (this.$cookies.get("adblock")) {
        this.$store.commit("changePopupAdblock", true);
      } else if (!v) {
        this.$swal({
          icon: "info",
          title: "Bạn cần dán link sản phẩm!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!this.$auth.loggedIn) {
        this.$auth.$storage.setLocalStorage("affiliate_url", v);
        this.$store.commit("changePopup", true);
      } else {
        // window.open("https://html.com/attributes/a-target/", '_blank');
        let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
        if (v && accountId) {
          const googleWindow = window;
          ProductService.postAffLink(this.$axios, accountId, v)
            .then((resp) => {
              if (resp.data.status) {
                let targetUrl = resp.data.data.target_url + `a-${accountId}`;
                let result = handleVendorLink(
                  targetUrl,
                  this.$store.state.vendorPlatform,
                  window
                );
                switch (result.platform) {
                  case 2:
                    let payload = {
                      isPopup: true,
                      targetUrl: targetUrl,
                      vendorName: result.name,
                    };
                    this.$store.commit("changeModalPlatform", payload);
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
                    // windowReference.location = targetUrl
                    if (window.ReactNativeWebView) {
                      window.ReactNativeWebView.postMessage(result.name);
                    }
                    googleWindow.location.replace(targetUrl);
                    break;
                }
              }
              this.affLink = "";
            })
            .catch((e) => {
              console.log("e", e);
              if (e.response.data.data.code === "002.004.001") {
                this.$swal({
                  icon: "info",
                  title: "Link sản phẩm không hợp lệ, vui lòng kiểm tra lại.",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.menuMobileCenter {
  height: 40px;
  background-color: #fff;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}
.popupAff {
  transition: 0.3s all;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: transparent;
  padding-left: 10px;
  padding-right: 10px;
  &.popupAffActive {
    opacity: 1;
    z-index: 20;
    background-color: white;
  }
}
.bgShowPopup {
  transition: 0.2s all;
  position: fixed;
  background-color: transparent;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.bgShowPopupShow {
    z-index: 18;
    opacity: 0.7;
    background-color: #000000;
  }
}
.app-search {
  transform: rotate(0) translate(0, -50%);
  position: absolute;
  right: 8px;
  top: 50%;
  cursor: pointer;
}

// .searchMobile:checked ~ .popupAff {
//   display: block;
// }

.headerMobile {
  background-color: #fff;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 16;
}

.headerMobileTop {
  height: 60px;
  background-color: #ff599a;
  align-items: center;
  justify-content: space-between;
  .iconSearchMobile {
    transform: rotate(270deg);
  }
  .logo {
    img {
      width: 100%;
      height: 100%;
      max-width: 184px;
      max-height: 28px;
    }
  }
}

.mr-10 {
  margin-right: 10px;
}

.display_menu {
  .headerMobile {
    z-index: 1040 !important;
  }
}

.display_menu_category {
  .headerMobile {
    z-index: 1040 !important;
  }
}

// .menu li a:hover,
// .menu .menu-btn:hover {
//   background-color: #f4f4f4;
// }

/* menu */
.display_menu .fadeMobile .menu {
  //   visibility: visible;
  //   opacity: 1;
  // transition: 0.3s all;
  display: block;
}

.display_menu_category {
  .fadeMobile .categoryMobile {
    display: block;

    // visibility: visible;
    // opacity: 1;
    // transition: 0.3s all;
  }
}

.fadeMobile .menu {
  // visibility: hidden;
  // opacity: 0;
  // transition: 0.3s all;
  // height: 100vh;
  height: calc(100vh - 100px);
  overflow-y: auto;
  display: none;
}

.fadeMobile .categoryMobile {
  // visibility: hidden;
  // opacity: 0;
  // transition: 0.3s all;
  height: calc(100vh - 100px);
  display: none;
}

.display_account {
  .menuAccount {
    display: block;
  }
}

.menuAccount {
  position: absolute;
  width: 100%;
  height: auto;
  top: 60px;
  height: calc(100vh - 60px);
  display: none;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}

/* menu btn */

header .titleCategoryMobile {
  cursor: pointer;
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: bold;
  &:after {
    content: "";
    display: inline-block;
    margin-top: 0;
    width: 7px;
    height: 7px;
    border-top: 2px solid #333 !important;
    border-right: 2px solid #333;
    border-left: none;
    transform: rotate(135deg);
    margin-left: 0.5rem;
    vertical-align: 0.15rem;
  }
}
header #hamburger span {
  height: 2px;
  margin-top: 0;
  margin-bottom: 4px;
  background-color: #333;
  display: block;
  transition: 0.33s;
  &:nth-child(1) {
    width: 21px;
  }
  &:nth-child(2) {
    width: 21px;
  }
  &:nth-child(3) {
    width: 21px;
  }
}
.display_menu header #hamburger {
  span:nth-child(1) {
    transform: rotate(45deg) translate(2px, 2px);
  }
  span:nth-child(2) {
    transform: rotate(-45deg) translate(2px, -2px);
  }
  span:nth-child(3) {
    transform: rotate(45deg) translate(6px, -9px);
    display: none;
  }
}

/* 48em = 768px */

@media (min-width: 48em) {
  .menu li {
    float: left;
  }
  .menu li a {
    padding: 20px 30px;
  }
  .menu {
    clear: none;
    float: right;
    max-height: none;
  }
}
</style>
