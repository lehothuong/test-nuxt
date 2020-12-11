<template>
  <div>
    <div>
      <HeaderDesktop class="d-none d-lg-block"></HeaderDesktop>
      <client-only>
        <HeaderMobile
          v-if="$device.isMobile"
          class="d-block d-lg-none"
        ></HeaderMobile>
      </client-only>
      <nuxt class="body-content" />
      <client-only>
        <Footer v-if="$device.isDesktop" class="d-none d-lg-block"></Footer>
        <Navigation
          v-if="$device.isMobile"
          class="d-block d-lg-none"
        ></Navigation>
      </client-only>
    </div>
    <client-only>
      <Adblock v-if="$device.isDesktop" class="d-none d-lg-block"></Adblock>
    </client-only>
    <ModalLogout></ModalLogout>
    <ModalVendorPlatform></ModalVendorPlatform>
    <ModalCommission></ModalCommission>
    <ModalVerify></ModalVerify>
    <ModalVerifySuccess></ModalVerifySuccess>
    <div class="gotoTop">
      <button @click.prevent="handleGotoTop()" id="goTop">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <g transform="translate(18783 2180)">
              <rect
                width="14"
                height="14"
                transform="translate(-18783 -2180)"
                fill="#fff"
                opacity="0"
              />
              <path
                d="M.585-7.421l.614.614a.375.375,0,0,0,.536-.005L4.158-9.336V1.443a.375.375,0,0,0,.375.375h.875a.375.375,0,0,0,.375-.375V-9.336L8.207-6.812a.375.375,0,0,0,.536.005l.614-.614a.375.375,0,0,0,0-.531L5.236-12.072a.375.375,0,0,0-.531,0L.585-7.951A.375.375,0,0,0,.585-7.421Z"
                transform="translate(-18780.475 -2167.818)"
                fill="#05668d"
              />
            </g>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>
<script>
import HeaderDesktop from "../components/HeaderDesktop";
import HeaderMobile from "../components/HeaderMobile";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ModalLogout from "@/components/ModalLogout";
import Adblock from "@/components/Adblock";
import ModalVendorPlatform from "@/components/ModalVendorPlatform";
import ModalCommission from "@/components/ModalCommission";
import ModalVerify from "@/components/ModalVerify";
import ModalVerifySuccess from "@/components/ModalVerifySuccess";
import OneSignalService from "@/api/onesignal";

export default {
  
  components: {
    HeaderDesktop,
    Footer,
    Adblock,
    HeaderMobile,
    Navigation,
    ModalLogout,
    ModalVendorPlatform,
    ModalCommission,
    ModalVerify,
    ModalVerifySuccess,
  },
  data() {
    return {
      status: "",
    };
  },
  computed: {},
  watch: {
    "$auth.loggedIn": function (newVal, oldVal) {
      if (oldVal) {
        this.handledCallApi();
      }
    },
  },
  methods: {
    checkAdBlockFc(v) {
      this.checkAdBlock = v;
    },
  },
  created() {
    this.handledCallApi();
  },
  async mounted() {
    let me = this;

    var adblockDetect = require("adblock-detect");
    var btnTop = document.querySelector("#goTop");
    var btnReveal = function () {
      var fbIcon = document.querySelector(".fb_dialog");
      var fbBox = document.querySelector(".fb-customerchat iframe");
      if (window.scrollY >= 300) {
        btnTop.classList.add("is-visible");
        fbIcon ? fbIcon.classList.add("b-45") : "";
        fbBox ? fbBox.classList.add("b-90") : "";
      } else {
        btnTop.classList.remove("is-visible");
        fbIcon ? fbIcon.classList.remove("b-45") : "";
        fbBox ? fbBox.classList.remove("b-90") : "";
      }
    };
    window.addEventListener("scroll", btnReveal);

    window.addEventListener("gcb-message", async (event) => {
      const data = JSON.parse(event.data);
      if (data.one_signal_id) {
        this.$auth.$storage.setLocalStorage("device-info", event.data);
        await OneSignalService.updateOnesignal(this.$axios, data);
      }
    });

    adblockDetect(
      function (adblockDetected) {
        if (adblockDetected) {
          me.$cookies.set("adblock", true);
          me.$store.commit("changePopupAdblock", true);
        } else {
          me.$cookies.set("adblock", false);
        }
      },
      {
        testInterval: 40,
        testRuns: 5,
      }
    );
  },
  methods: {
    async handledCallApi() {
      if (this.$auth.loggedIn) {
        // this.$axios.setHeader(
        //   "Authorization",
        //   this.$auth.getToken("local").token
        // );
        if (!this.$auth.getToken("local").id) {
          let deviceInfo = this.$auth.$storage.getLocalStorage("device-info");
          if (deviceInfo) {
            await OneSignalService.removeOnesignalWithAccount(
              this.$axios,
              deviceInfo
            );
          }
          this.$auth.logout();
        } else {
          this.$store.dispatch("getProfile", {
            id: this.$auth.getToken("local").id,
            token: this.$auth.getToken("local").token,
          });
        }
      }
    },
    handleGotoTop() {
      if (window.scrollY != 0) {
        document.getElementById("__nuxt").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#goTop {
  position: fixed;
  z-index: 1039;
  width: 32px;
  height: 32px;
  right: 20px;
  bottom: 20px;
  border-radius: 50% !important;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  border: none;
  opacity: 0;
  transition: 0.2s all;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus,
  &:active {
    outline: 0;
    box-shadow: none;
  }
  &:hover {
    background-color: #05668d;
    svg {
      path {
        fill: #fff;
      }
    }
  }
}
#goTop.is-visible {
  opacity: 1;
}
@media (max-width: 576px) {
  #goTop {
    bottom: 75px;
    right: 15px;
  }
}
</style>
