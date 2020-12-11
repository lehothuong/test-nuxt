<template>
  <div>
    <b-form @submit="onSubmit" class="login-form">
      <b-form-group id="input-login-1" label="Số điện thoại" label-for="input-for-1">
        <b-form-input
          id="input-for-1"
          v-model="form.phoneNumber"
          v-validate="'required'"
          :class="{ input: true, 'is-danger': errors.has('phoneNumber') }"
          data-vv-as="Số điện thoại"
          type="number"
          name="phoneNumber"
          ref="phoneNumber"
        ></b-form-input>
        <span v-show="errors.has('phoneNumber')" class="is-danger-text">
          {{
          errors.first("phoneNumber")
          }}
        </span>
      </b-form-group>

      <b-form-group id="input-login-2" label="Mật khẩu" label-for="input-for-2" class="mb-lg-2">
        <b-form-input
          v-model="form.password"
          data-vv-as="Mật khẩu"
          :class="{ input: true, 'is-danger': errors.has('password') }"
          v-validate="'required|min:8|max:16'"
          name="password"
          type="password"
          id="input-for-2"
          aria-describedby="password-help-block"
        ></b-form-input>
        <span v-show="errors.has('password')" class="is-danger-text">
          {{
          errors.first("password")
          }}
        </span>
      </b-form-group>
      <div class="d-flex align-items-center justify-content-between" id="checkboxes-4">
        <b-form-checkbox v-model="form.remember_password">Lưu đăng nhập</b-form-checkbox>
        <a class="forgot-password float-right pointer" href="/tao-mat-khau-moi">Quên mật khẩu</a>
      </div>
      <b-button
        type="submit"
        class="btn-social w-100 text-uppercase btn-login text-white mt-3"
      >Đăng nhập</b-button>
    </b-form>
  </div>
</template>
<script>
import ProductService from "@/api/product";
import { handleVendorLink } from "@/misc/helpers";
export default {
  data() {
    return {
      form: {
        phoneNumber: "",
        password: "",
        remember_password: false,
      },
    };
  },
  methods: {
    async onSubmit(evt) {
      this.$cookies.set("url", this.$route.fullPath);
      evt.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit("handleError", "");
          this.$auth
            .loginWith("local", {
              data: {
                phone_number: this.form.phoneNumber,
                password: this.form.password,
                remember_password: this.form.remember_password,
              },
            })
            .then((resp) => {
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
              // this.$store.dispatch("getBalance", user.id);
              if(this.$cookies.get("url_redirect") && this.$cookies.get("url_redirect") === 'landing-page'){
                this.$router.push('/')
              }
              if (this.$route.fullPath !== "") {
                this.$router.push({ path: this.$route.fullPath });
              } else {
                this.$router.push("/");
              }
              if (this.$store.state.isCommision) {
                this.$store.dispatch("changePopupAll");
              }
              this.$store.commit("changePopup", false);
              this.$store.commit("handleError", undefined);
              this.$swal({
                icon: "success",
                title: "Đăng nhập thành công",
                showConfirmButton: false,
                timer: 700,
              });
              let aff = this.$auth.$storage.getLocalStorage("affiliate_url");
              if (aff) {
                this.submitAffiliate(
                  resp.data.data.id,
                  aff.affLink,
                  aff.extension_id,
                  aff.vendor,
                  aff.host_name
                );
              }
            })
            .catch((e) => {
              let code = e.response.data.data.code;
              if (code == "002.001.002") {
                this.$store.commit(
                  "handleError",
                  "Sai số điện thoại hoặc mật khẩu!"
                );
              } else if (code === "002.001.017") {
                this.$store.commit(
                  "handleError",
                  "Số điện thoại của bạn đã bị khoá"
                );
              } else if (code === "002.001.016") {
                this.$store.commit(
                  "handleError",
                  "Số điện thoại của bạn không tồn tại"
                );
              } else if (code === "002.001.023") {
                this.$store.commit(
                  "handleError",
                  "Bạn đã đăng nhập không thành công nhiều lần, vui lòng thử lại sau vài phút."
                );
              } else if (code === "002.001.024") {
                this.$store.commit(
                  "handleError",
                  "Đăng nhập không thành công, có vẻ bạn đã quên mật khẩu! Hãy sử dụng chức năng quên mật khẩu để khởi tạo mật khẩu mới."
                );
              } else {
                this.$store.commit(
                  "handleError",
                  "Vui lòng kiểm tra lại số điện thoại  và mật khẩu"
                );
              }
            });
          // this.$router.push(this.localePath({ path: 'danh-sach-san-pham' }))
        }
      });
    },
    submitAffiliate(accountId, v, v1, v2, hostName) {
      ProductService.postAffLink(this.$axios, accountId, v)
        .then((resp) => {
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
                ProductService.patchActiveVendor(this.$axios, hostName, v1, v2)
                  .catch((e) => console.log(e))
                  .finally(() => {
                    var redirectType = "_blank";
                    if (v1) {
                      redirectType = "_self";
                    }
                    window.open(targetUrl, redirectType);
                  });
                // this.$auth.$storage.setLocalStorage("affiliate_url", '');
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
    },
  },
};
</script>
<style lang="scss" scoped>
.login-form {
  label {
    font-size: 0.875rem;
    color: #333333;
  }
}
.forgot-password {
  font-size: 0.875rem;
  text-align: right;
  color: #cb0055;
  text-decoration: underline !important;
}
</style>
