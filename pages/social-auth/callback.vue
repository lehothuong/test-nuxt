<template>
  <div class="benefitBg pt-lg-3 pb-lg-5">
    <div class="container bg-white rounded5px pt-lg-5">
      <div class="text-center">
        <p>Đợi chút nhé, sẵn sàng mua sắm nào!</p>
        <img alt="goCASHBACK" class="mt-lg-4 pb-lg-5" src="../../assets/img/img-waiting.png" />
      </div>
      <!-- <h1>You are Secure</h1>
      <b-button to="/" variant="success">Callback</b-button>-->
    </div>
  </div>
</template>
<script>
import AccountService from "@/api/account";
import OneSignalService from "@/api/onesignal";
import ProductService from "@/api/product";
import { handleVendorLink } from "@/misc/helpers";

export default {
  middleware: ["auth-access"],
  mounted() {
    // document.addEventListener('AppleIDSignInOnSuccess', (data) => {
    //     const provinkeyAP = 'apple-login'
    //     this.loginSocialData(data.detail.authorization.id_token,provinkeyAP);
    // });
    this.$auth.setStrategy("local");
    if (process.client) {
      const provinkeyGG = "google";
      const provinkeyFB = "facebook";
      const provinkeyApple = "apple";
      // console.log(this.$route.hash)
      if (this.$route.hash != "") {
        let stringFBandApple = this.$route.hash.split("=")[1];
        let stringGG = this.$route.hash.split("=")[2];
        if (this.$route.query && this.$route.query.provinkey) {
          let query = Object.assign({}, this.$route.query);
          if (this.$route.query.provinkey == provinkeyGG)
            if (!this.$auth.loggedIn) {
              this.loginSocialData(stringGG.split("&")[0], "gg-login");
            } else {
              this.linkSocialData(stringGG.split("&")[0], "gg-login");
            }
          else {
            let loginType = "fb-login";
            if (this.$route.query.provinkey == provinkeyApple) {
              loginType = "apple-login";
            }
            if (!this.$auth.loggedIn) {
              this.loginSocialData(stringFBandApple.split("&")[0], loginType);
            } else {
              this.linkSocialData(stringFBandApple.split("&")[0], loginType);
            }
          }
          // delete query.provinkey;
          // this.$router.replace({ query });
        }
      }
    }
  },
  methods: {
    async clearToken() {
      let deviceInfo = this.$auth.$storage.getLocalStorage("device-info");
      if (deviceInfo) {
        await OneSignalService.removeOnesignalWithAccount(
          this.$axios,
          deviceInfo
        );
      }
      await this.$auth.logout();
      // this.$axios.setHeader('Authorization', null)
    },
    async loginSocialData(token, provinKey) {
      // console.log(token,provinKey)
  

      await this.clearToken();
      try {
        AccountService.postLoginSocial(this.$axios, token, provinKey)
          .then((resp) => {
            console.log(resp)
            if (resp.data.data.code == "002.001.017") {
              this.$swal({
                icon: "error",
                title: "Tài khoản của bạn đã bị khoá",
                showConfirmButton: false,
              });
              return;
            } else {
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
              // this.$auth.setUser(user);
              this.$store.dispatch("getProfile", {
                id: user.id,
                token: "Bearer " + resp.data.data.token,
              });

              // this.$store.dispatch("getBalance", user.id);
             
              // this.$store.dispatch("changePopupAll");
              this.$store.commit("handleError", undefined);
              this.$swal({
                icon: "success",
                title: "Đăng nhập thành công",
                showConfirmButton: false,
                timer: 1000,
              });
              let aff = this.$auth.$storage.getLocalStorage("affiliate_url");
              if (aff) {
                this.submitAffiliate(user.id,aff.affLink,aff.extension_id,aff.vendor,aff.host_name);
              }
              
            }
            if (!this.$cookies.get("url")) {
                this.$router.push({ path: this.$cookies.get("url") });
              } else {
                this.$router.push("/");
              }
            this.$store.commit("changePopup", false);
          })
          .catch((e) => {
            this.$auth.setStrategy("local");
            this.$router.push("/");
            let code = e.response.data.data.code;
            if (code == "002.001.006") {
              this.$store.dispatch(
                "loginSocicalError",
                "Đăng nhập không thành công"
              );
            } else if (code === "002.001.017") {
              this.$swal({
                icon: "error",
                title: "Tài khoản của bạn đã bị khoá",
                showConfirmButton: false,
              });
            } else if (code == "002.001.020") {
              let platform = "";
              switch (provinKey) {
                case "gg-login":
                  this.$store.commit("changeCallbackSocialLink", {
                    gg_uid: e.response.data.data.gg_uid,
                    name: e.response.data.data.name,
                    email: e.response.data.data.email,
                  });
                  platform = "Google";
                  break;
                case "fb-login":
                  this.$store.commit("changeCallbackSocialLink", {
                    fb_uid: e.response.data.data.fb_uid,
                    name: e.response.data.data.name,
                    email: e.response.data.data.email,
                  });
                  platform = "Facebook";
                  break;
                case "apple-login":
                  this.$store.commit("changeCallbackSocialLink", {
                    apple_uid: e.response.data.data.apple_uid,
                    name: e.response.data.data.name,
                    email: e.response.data.data.email,
                  });
                  platform = "Apple";
                  break;
                default:
                  platform = "";
                  break;
              }
              this.$store.commit("changeTabIndex", 1);
              this.$store.dispatch(
                "loginSocicalErrorRegister",
                `Vui lòng điền thông tin để tiếp tục tạo tài khoản liên kết với tài khoản ${platform}.`
              );
            }else{
              this.$swal({
                icon: "error",
                title: "Đăng nhập không thành công",
                showConfirmButton: false,
              });
            }
          });
      } catch (error) {
        this.$router.push("/");
        this.$store.dispatch("loginSocicalError", "Đăng nhập không thành công");
      }
    },
     submitAffiliate(accountId,v,v1,v2,hostName) {
      ProductService.postAffLink(this.$axios, accountId, v)
        .then(resp => {
          if (resp.data.status) {
            let targetUrl = resp.data.data.target_url + `a-${accountId}`;
            let result = handleVendorLink(
              targetUrl,
              this.$store.state.vendorPlatform,
              window
            );
            //  if(window.ReactNativeWebView){
            //   window.ReactNativeWebView.postMessage(res.length > 0 ? vendorPlatform[res[0]].name : '')
            // }
            switch (result.platform) {
              case 2:
                let payload = {
                  isPopup: true,
                  targetUrl: targetUrl,
                  vendorName: result.name
                };
                this.$store.commit("changeModalPlatform", payload);
                break;
              case undefined:
                this.$swal({
                  icon: "info",
                  title:
                    "Rất tiếc, hiện tại website này không nằm trong hệ thống hoàn tiền của goCASHBACK",
                  showConfirmButton: false,
                  timer: 4000
                });
                break;
              default:
                ProductService.patchActiveVendor(this.$axios,hostName,v1,v2)
                  .catch(e => console.log(e))
                  .finally(()=>{
                    window.open(targetUrl,"_self");
                  })
                 this.$auth.$storage.setLocalStorage(
                  "affiliate_url",
                  null
                );
                break;
            }
          }
        })
        .catch(e => {
          if (e.response.data.data.code === "002.004.001") {
            this.$swal({
              icon: "info",
              title: "Link sản phẩm không hợp lệ, vui lòng kiểm tra lại.",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            this.$swal({
              icon: "info",
              title: "Vui lòng nhập lại",
              showConfirmButton: false,
              timer: 1500
            });
          }
          //  this.$auth.$storage.setLocalStorage(
          //   "affiliate_url",
          //   null
          // );
        })
    },
    linkSocialData(token, provinKey) {
      console.log(this.$cookies.get("url"))
      if(this.$cookies.get("url") && this.$cookies.get("url") == '/tai-khoan'){
        try {
          const accountId = this.$auth.getToken("local").id;
          const tokenPrevent = this.$auth.getToken("local").token;
          this.$axios.setHeader("Authorization", tokenPrevent);
          this.$auth.ctx.app.$axios.setHeader("Authorization", tokenPrevent);
          this.$store.dispatch("getProfile", {
            id: accountId,
            token: tokenPrevent,
          });
          AccountService.linkSocial(this.$axios, token, accountId, provinKey)
            .then((resp) => {
              if (resp.status) {
                this.$store.state.auth.user[resp.type] = true;
              }
              this.$store.dispatch("changeTabIndexProfile", 1);
              this.$router.push("/tai-khoan");
            })
            .catch((e) => {
              let code = e.response.data.data.code;
              if (this.$cookies.get("url") !== "") {
                this.$router.push({ path: this.$cookies.get("url") });
                this.$store.dispatch("changeTabIndexProfile", 1);
              } else {
                this.$router.push("/");
              }
              if (
                code == "002.001.021" ||
                code == "002.001.006" ||
                code == "002.001.005" ||
                code == "002.001.019"
              ) {
                if (code == "002.001.021") {
                  let type = "";
                  switch (type) {
                    case "gg-login":
                      type = "Google";
                      break;
                    case "apple-login":
                      type = "Apple";
                      break;
                    case "fb-login":
                      type = "Facebook";
                      break;
                  }
                  this.$swal({
                    icon: "error",
                    title: `Tài khoản ${type} này đã được liên kết với tài khoản khác, vui lòng thử lại.`,
                    showConfirmButton: false,
                  });
                } else {
                  this.$swal({
                    icon: "error",
                    title: "Liên kết thất bại, hãy thử lại !",
                    showConfirmButton: false,
                  });
                }
              }
              
            });
        } catch (error) {
          console.log(error);
          this.$router.push("/");
        }
      }
      else{
        this.$router.push("/");
      }
    },
  },
};
</script>
<style scoped></style>
