<template>
  <div class="body">
    <section>
      <aside>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-12 pr-lg-2 bannerLeft">
              <BannerLeft :bannerHomeLeft="bannerHomeLeft"></BannerLeft>
            </div>
            <div class="d-none d-lg-block col-lg-4 pl-lg-2">
              <BannerRight :bannerHomeRight="bannerHomeRight"></BannerRight>
            </div>
          </div>
        </div>
      </aside>
    </section>
    <aside>
      <EcommerceLevelHot></EcommerceLevelHot>
      <CategoryFilter></CategoryFilter>
      <BannerForChildren :bannerHomeChild="bannerHomeChild"></BannerForChildren>
      <BannerForMom :bannerHomeMom="bannerHomeMom"></BannerForMom>
      <Promo></Promo>

      <!-- <ProductBest></ProductBest> -->
      <!-- <ProductNeed></ProductNeed>
      -->
    </aside>
  </div>
</template>

<script>
import BannerLeft from "../components/homepage/BannerLeft";
import BannerRight from "../components/homepage/BannerRight";
import EcommerceLevelHot from "../components/homepage/EcommerceLevelHot";
import ProductBest from "../components/homepage/ProductBest";
import ProductNeed from "../components/homepage/ProductNeed";
import BannerForChildren from "../components/homepage/BannerForChildren";
import BannerForMom from "../components/homepage/BannerForMom";
import Promo from "../components/homepage/Promo";
import CategoryFilter from "../components/homepage/CategoryFilter";
import { handleVendorLink, hanlerDomain } from "@/misc/helpers";
import ProductService from "@/api/product";
const BannerService = () => import("@/api/banner");

export default {
  components: {
    BannerLeft,
    BannerRight,
    EcommerceLevelHot,
    ProductBest,
    ProductNeed,
    BannerForChildren,
    BannerForMom,
    Promo,
    CategoryFilter,
  },
  data() {
    return {
      banners: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn;
    },
    bannerHomeLeft() {
      return this.banners.pos_01;
    },
    bannerHomeChild() {
      return this.banners.pos_03 || null;
    },
    bannerHomeMom() {
      return this.banners.pos_04 || null;
    },
    bannerHomeRight() {
      return this.banners.pos_02;
    },
  },
  created() {
    let url = this.$route.query;
    let hostName = "";
    if (process.client) {
      hostName = window.location.hostname;
    }
    hostName = hanlerDomain(hostName);
    if (url) {
      switch (Object.keys(url)[0]) {
        case "link":
          this.postAffiliateLink(url.link, url.extId, url.vendor, hostName);
          break;
        case "ref":
          if (!this.loggedIn) {
            this.$store.commit("changeInvite", url.ref);
            this.$store.commit("changeTabIndex", 2);
            this.$store.commit("changePopup", true);
          }
          break;
      }
    }
    if (!this.loggedIn && this.$route.hash.split(/[#=]/)[1] === "ref") {
    }
    this.getBannerHome();
  },
  methods: {
    postAffiliateLink(v, v2, v3, hostName) {
      this.$auth.$storage.setLocalStorage("affiliate_url", {
        affLink: v,
        extension_id: v2,
        vendor: v3,
        host_name: hostName,
      });
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
        this.$store.commit("changePopup", true);
      } else {
        let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
        if (v && accountId) {
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
                    ProductService.patchActiveVendor(
                      this.$axios,
                      hostName,
                      v2,
                      v3
                    )
                      .catch((e) => console.log(e))
                      .finally(() => {
                        window.open(targetUrl, "_self");
                      });
                    // this.$auth.$storage.setLocalStorage("affiliate_url", "");
                    this.$auth.$storage.setLocalStorage("affiliate_url", null);
                    break;
                }
              }
            })
            .catch((e) => {
              if (e.response.data.data.code === "002.004.001") {
                this.$swal({
                  icon: "info",
                  title: "Link sản phẩm không hợp lệ, vui lòng kiểm tra lại.",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                this.$swal({
                  icon: "info",
                  title: "Vui lòng nhập lại",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
              // this.$auth.$storage.setLocalStorage(
              //   "affiliate_url",
              //   null
              // );
            });
        }
      }
    },
    getBannerHome() {
      BannerService().then((result) => {
        result.default.getBanner(this.$axios).then((resp) => {
          this.banners = resp.data.data.w_home;
        });
      });
    },
  },
};
</script>
