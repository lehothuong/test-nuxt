<template>
  <div>
    <div
      v-if="$store.state.auth.user.sms_verified == 0"
      class="alert-danger w-100 my-3 py-lg-2 d-lg-flex flex-lg-row align-items-center danger-container"
    >
      <span
        class="mx-3 my-2 ml-lg-4 mr-lg-4"
      >Bạn cần xác nhận số điện thoại để thực hiện rút tiền và các chức năng khác của website.</span>
      <b-button
        @click="onNavVerify()"
        class="btn btnBlue rounded w-100-576 white-nowrap mr-lg-4 ml-lg-auto mt-auto mt-lg-0"
      >XÁC NHẬN NGAY</b-button>
    </div>
    <div class="row mt-lg-4 pb-lg-3 viewContainer">
      <div class="col-lg-8 info-container">
        <span class="headerTitle text-uppercase font-weight-bold">Thông tin tài khoản</span>
        <hr />
        <div
          v-if="isShowAlert"
          :class="isError ? 'alert-danger' : 'alert-success'"
          class="w-100 danger-container my-lg-3 py-lg-2 d-flex flex-row align-items-center"
        >
          <span class="ml-lg-4">{{ errorMsg }}</span>
        </div>
        <b-form @submit="onSaveInfo">
          <div class="row">
            <div class="col-lg-6 col-12">
              <b-form-group id="group-username" label="Họ và tên" label-for="input-username">
                <b-form-input
                  id="input-username"
                  v-model="profile.name"
                  class="mt-lg-1 mb-lg-2"
                  trim
                  v-validate="'required'"
                  :class="{ input: true, 'is-danger': errors.has('userName') }"
                  data-vv-as="Họ và tên"
                  name="userName"
                  ref="userName"
                />
                <span
                  v-show="errors.has('userName')"
                  class="is-danger-text"
                >{{ errors.first("userName") }}</span>
              </b-form-group>
              <b-form-group id="group-phone" label="Điện thoại" label-for="input-phone">
                <p>{{ profile.phone }}</p>
                <b-button
                  v-if="$store.state.auth.user.sms_verified == 0"
                  @click="modalChangePhone = true"
                  class="changeBtn"
                >THAY ĐỔI</b-button>
              </b-form-group>
              <div class="mt-lg-2">
                <b-form-group id="group-email" label="Email" label-for="input-email">
                  <b-form-input
                    v-model="profile.email"
                    class="mt-lg-1 mb-lg-4"
                    :class="{ input: true, 'is-danger': errors.has('email') }"
                    trim
                    v-validate="'email'"
                    type="email"
                    data-vv-as="Email"
                    name="email"
                    ref="email"
                  />
                  <span
                    v-show="errors.has('email')"
                    class="is-danger-text"
                  >{{ errors.first("email") }}</span>
                </b-form-group>
              </div>
            </div>

            <div class="col-lg-6 col-12">
              <b-form-group id="group-address" label="Địa chỉ" label-for="input-address">
                <b-form-input id="input-address" v-model="profile.address" class="mt-lg-1 mb-lg-2" />
              </b-form-group>
              <b-form-group id="group-dob" label="Ngày sinh" label-for="input-dob">
                <div
                  class="justify-content-center"
                  :class="[
                    { 'input border border-red-600': errors.has('dob') },
                    { subscribe: !errors.has('dob') },
                    { 'mb-lg-2': errors.has('dob') }
                  ]"
                >
                  <vc-date-picker
                    locale="vi"
                    id="input-dob"
                    class="w-100"
                    :input-debounce="500"
                    v-model="userDOB"
                  >
                    <input
                      id="date"
                      v-validate="'required'"
                      slot-scope="{ inputProps, inputEvents }"
                      data-vv-as="Ngày sinh"
                      v-bind="inputProps"
                      v-on="inputEvents"
                      name="dob"
                      ref="dob"
                      locale="vi"
                      class="appearance-none border flex-row-reverse pl-lg-2 w-100 h-100 form-control"
                      placeholder="Ngày sinh"
                    />
                  </vc-date-picker>
                </div>
                <span v-show="errors.has('dob')" class="is-danger-text">{{ errors.first("dob") }}</span>
              </b-form-group>
              <div class="row mt-lg-2">
                <div class="col-6 pr-1">
                  <b-form-group id="group-gender" label="Giới tính" label-for="input-gender">
                    <b-form-select v-model="profile.gender" :options="listGender"></b-form-select>
                    <!-- <b-dropdown
                      id="input-gender"
                      class="mt-lg-1 dropdown-input-form form-control p-0"
                      :text="profile.gender"
                    >
                      <b-dropdown-item v-for="option in listGender" :key="option.text" :value="option.text"
                        >{{option.text}}</b-dropdown-item
                      >
                      <b-dropdown-item @click="userGender = 'Nữ'"
                        >Nữ</b-dropdown-item
                      >
                    </b-dropdown>-->
                  </b-form-group>
                </div>
                <div class="col-6 pl-1">
                  <b-form-group id="group-noti" label="Nhận thông báo" label-for="input-noti">
                    <b-form-select v-model="profile.transaction_noty" :options="ListReceiveNoti"></b-form-select>
                    <!-- <b-dropdown
                      id="input-noti"
                      class="mt-lg-1 dropdown-input-form form-control p-0"
                      :text="isReceiveNoti"
                    >
                      <b-dropdown-item @click="isReceiveNoti = 'Có'"
                        >Có</b-dropdown-item
                      >
                      <b-dropdown-item @click="isReceiveNoti = 'Không'"
                        >Không</b-dropdown-item
                      >
                    </b-dropdown>-->
                  </b-form-group>
                </div>
              </div>
            </div>
          </div>
          <b-button
            type="submit"
            class="btn btnCashback bgGreen mt-lg-2 mt-3 w-100-576"
          >Lưu thông tin</b-button>
        </b-form>
      </div>
      <div class="col-lg-4 mt-lg-0 pt-lg-0 mt-4 pt-2 pb-lg-0 pb-4">
        <span class="headerTitle text-uppercase font-weight-bold">LIÊN KẾT TÀI KHOẢN</span>
        <hr />
        <div>
          <b-button
            v-if="!profile.fb_linked"
            @click="facebook()"
            class="btn-social text-white rounded border-0 d-flex align-items-center mt-2 w-100 mb-2"
            style="background-color:#3b5998"
          >
            <img
              alt="facebook"
              src="../../assets/img/icon/icon_signup_facebook.svg"
              width="16"
              height="16"
              class="mr-4"
            />
            FACEBOOK
          </b-button>
          <b-button
            v-else
            @click="facebook()"
            class="btn-socialrounded border-1 d-flex align-items-center justify-content-between w-100 mb-2"
            style="background-color:#ffffff;border-color:#3b5998 "
          >
            <p class="text-fb align-items-center d-flex">
              <img
                alt="google"
                src="../../assets/img/icon/icon_facebook_color.svg"
                width="18"
                height="18"
                class="mr-2"
              />
              FACEBOOK
            </p>
            <p class="delete-link-text">Huỷ kết nối</p>
          </b-button>
        </div>
        <div>
          <b-button
            v-if="!profile.gg_linked"
            @click="google()"
            class="btn-social btn-gg rounded border-0 d-flex align-items-center w-100 mb-2"
            style="background-color:#fff"
          >
            <img
              alt="google"
              src="../../assets/img/icon/icon_google.svg"
              width="18"
              height="18"
              class="mr-4"
            />
            GOOGLE
          </b-button>
          <b-button
            v-else
            @click="google()"
            class="btn-socialrounded border-1 d-flex align-items-center justify-content-between w-100 mb-2"
            style="background-color:#ffffff;border-color:#ea4335 "
          >
            <p class="text-gg align-items-center d-flex">
              <img
                alt="google"
                src="../../assets/img/icon/icon_google.svg"
                width="18"
                height="18"
                class="mr-2"
              />
              GOOGLE
            </p>
            <p class="delete-link-text">Huỷ kết nối</p>
          </b-button>
        </div>
        <div v-if="isDomainApp && $device.isIos">
          <div v-if="!profile.apple_linked" class="apple" data-type="continue" id="appleid-signin">
            <b-button
              @click="apple()"
              class="btn-social text-white rounded border-0 d-flex align-items-center w-100 justify-content-center mb-2"
              style="background-color:#000000"
            >
              <img
                src="../../assets/img/icon/icon_signup_apple.svg"
                width="13"
                height="13"
                class="mr-lg-1"
              />
              APPLE
            </b-button>
          </div>
          <b-button
            v-else
            @click="apple()"
            class="btn-socialrounded border-1 d-flex align-items-center justify-content-between w-100 mb-2"
            style="background-color:#ffffff;border-color:#000000 "
          >
            <p class="text-apple align-items-center d-flex">
              <img
                alt="google"
                src="../../assets/img/icon/icon_apple_color.svg"
                width="18"
                height="18"
                class="mr-2"
              />
              APPLE
            </p>
            <p class="delete-link-text">Huỷ kết nối</p>
          </b-button>
        </div>

        <p class="mt-3">
          Liên kết tài khoản goCASHBACK với mạng xã hội giúp bạn đăng nhập nhanh
          hơn.
        </p>
        <p class="headerTitle text-uppercase font-weight-bold mt-5">THÔNG TIN ĐĂNG NHẬP</p>
        <hr />
        <b-button
          class="btn btnCashback bgGreen mt-2 w-100"
          @click="showChangePassword()"
        >Đổi mật khẩu</b-button>
      </div>
    </div>
    <b-modal
      v-model="isShowChangePassword"
      @hide="hideModal"
      modal-class="cash-back-modal modalMobile"
      title="THAY ĐỔI MẬT KHẨU"
      hide-footer
      centered
    >
      <div>
        <!-- <hr /> -->
        <div
          v-if="isShowAlertPassword"
          :class="isErrorPassword ? 'alert-danger' : 'alert-success'"
          class="w-100 danger-container my-lg-3 py-lg-2 d-flex flex-row align-items-center"
        >
          <span class="ml-lg-4">{{ errorMsgPassword }}</span>
        </div>
        <b-form-group id="group-oldpass" label="Mật khẩu cũ" label-for="input-oldpass">
          <b-form-input
            id="input-oldpass"
            v-model="oldPassword"
            debounce="500"
            type="password"
            class="mt-lg-1 mb-lg-2"
          />
          <div v-if="oldPasswordWarning != ''" class="mb-lg-2">
            <span class="warningText">{{ oldPasswordWarning }}</span>
            <br />
          </div>
        </b-form-group>
        <b-form-group id="group-newpass" label="Mật khẩu mới" label-for="input-newpass">
          <b-form-input
            id="input-newpass"
            v-model="newPassword"
            debounce="500"
            @update="onNewPasswordChange"
            type="password"
            class="mt-lg-1 mb-lg-2"
          />
          <div v-if="newPasswordWarning != ''" class="mb-lg-2">
            <span class="warningText">{{ newPasswordWarning }}</span>
            <br />
          </div>
        </b-form-group>

        <b-form-group
          id="group-verifynewpass"
          label="Xác nhận mật khẩu mới"
          label-for="input-verifynewpass"
        >
          <b-form-input
            id="verifynewpass"
            v-model="newPasswordRetype"
            debounce="500"
            @update="onNewPasswordRetypeChange"
            type="password"
            class="mt-lg-1 mb-lg-2"
          />
          <div v-if="newPasswordRetypeWarning != ''">
            <span class="warningText">{{ newPasswordRetypeWarning }}</span>
            <br />
          </div>
        </b-form-group>
        <b-button
          :disabled="changePasswordButtonDisabled"
          class="btn btnCashback bgGreen mt-2 w-100"
          @click="onChangePassword"
        >Đổi mật khẩu</b-button>
      </div>
    </b-modal>
    <b-modal
      v-model="objSocial.showLinkSocial"
      hide-footer
      header-class="text-uppercase text-light modalHeader"
      modal-class="modalVerify"
      id="modal-link"
      centered
      title="Hủy kết nối"
    >
      <div class="mx-1">
        <p
          class="text-center mb-4 mt-3 titleLinkSocial"
        >Bạn muốn hủy kết nối tài khoản với {{objSocial.textLinkSocial}}?</p>
        <div class="row">
          <div class="col-lg-6 col-6 pr-lg-2">
            <a
              @click="objSocial.showLinkSocial = false"
              target="_blank"
              class="d-block pointer text-center w-100 text-uppercase font-weight-bold my-2 rounded btnSubmitReverse"
            >Để sau</a>
          </div>
          <div class="col-lg-6 col-6 pl-lg-2">
            <a
              @click.prevent="hanlerCancelSocialLink"
              class="d-block pointer text-center text-white w-100 text-uppercase font-weight-bold my-2 rounded btnSubmit"
            >Hủy kết nối</a>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="modalSMSVerify"
      hide-footer
      header-class="text-uppercase text-light modalHeader"
      modal-class="modalMobile"
      id="modal-forgot-password"
      centered
      title="THÔNG BÁO"
    >
      <div>
        <span
          class="d-lg-block d-flex justify-content-center text-center my-4"
        >Bạn cần xác minh số điện thoại để thực hiện chức năng này</span>
        <div class="row">
          <div class="col-6 pr-lg-3 pr-1">
            <b-button
              @click="modalSMSVerify=false"
              type="submit"
              class="w-100 text-uppercase font-weight-bold py-lg-2 my-lg-1 rounded btnSMSVerifyReverse"
            >ĐỂ SAU</b-button>
          </div>
          <div class="col-6 pl-lg-3 pl-1">
            <b-button
              type="submit"
              @click="onNavVerify()"
              class="w-100 text-uppercase font-weight-bold py-lg-2 my-lg-1 rounded btnSMSVerify"
            >XÁC MINH</b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="modalChangePhone"
      hide-footer
      header-class="text-uppercase text-light modalHeader"
      modal-class="modalMobile"
      id="modal-forgot-password"
      centered
      title="THAY ĐỔI SỐ ĐIỆN THOẠI"
    >
      <div>
        <span
          class="d-lg-block d-flex justify-content-center text-center my-4"
        >Bạn đang thực hiện việc thay đổi số điện thoại. Hệ thống sẽ gửi mã xác minh đến số điện thoại mới, bạn cần nhập mã xác nhận để hoàn tất việc thay đổi..</span>
        <div class="w-100">
          <b-form-group id="group-phone" label="Số điện thoại hiện tại" label-for="input-phone">
            <p>{{ profile.phone }}</p>
          </b-form-group>
          <b-form-group
            id="group-new-phone"
            label="Số điện thoại mới"
            label-for="input-change-phone"
          >
            <div class="input-change-phone align-items-center my-3">
              <b-form-input
                id="input-change-phone"
                trim
                v-validate="{min:10,max:10,regex:/(03|07|08|09|05)+([0-9]{8})\b/,required:true}"
                data-vv-as="Số điện thoại"
                name="phoneData"
                ref="phoneData"
                class="w-100 border-0 my-3"
                placeholder="Ví dụ: 0901234567"
                type="number"
                v-model="phoneData"
              />
              <span
                v-show="errors.has('phoneData')"
                class="is-danger-text"
              >{{ errors.first('phoneData') }}</span>
            </div>
          </b-form-group>
          <b-button
            type="submit"
            :disabled="!phoneData || phoneData === profile.phone"
            @click="onChangePhone()"
            class="w-100 bgGreen text-uppercase font-weight-bold py-lg-2 my-lg-1 rounded"
          >TIẾP TỤC</b-button>
        </div>
      </div>
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
const PASSWORD_MIN_LENGTH = 8;
const passwordLengthWarning = "Mật khẩu tối thiểu 8 kí tự";
const oldPasswordRequired = "Vui lòng nhập mật khẩu cũ";
const oldPasswordInvalid = "Mật khẩu cũ không chính xác";
const newPasswordRequired = "Vui lòng nhập mật khẩu mới";
const newPasswordMatchOldPassword =
  "Mật khẩu mới không được trùng với mật khẩu cũ";
const newPasswordRetypeRequired = "Vui lòng nhập lại mật khẩu mới";
const newPasswordRetypeInvalid = "Xác nhận mật khẩu không chính xác";

export default {
  data() {
    return {
      // modal change pass
      modalSMSVerify: false,
      phoneData: "",
      modalChangePhone: false,
      isShowChangePassword: false,
      oldPassword: "",
      oldPasswordWarning: "",
      newPassword: "",
      newPasswordWarning: "",
      newPasswordRetype: "",
      newPasswordRetypeWarning: "",
      objSocial: {
        textLinkSocial: "",
        showLinkSocial: false,
        socialType: "",
        socialLinkItem: "",
      },
      //
      isDomainApp: false,
      isShowAlertPassword: false,
      isErrorPassword: false,
      errorMsgPassword: "",
      isShowAlert: false,
      isError: false,
      invailidCode: false,
      errorMsg: "",
      isInfoFormValidated: false,
      listGender: [
        { text: "Nam", value: 0 },
        { text: "Nữ", value: 1 },
      ],
      ListReceiveNoti: [
        { text: "Có", value: 0 },
        { text: "Không", value: 1 },
      ],
      isReceiveNoti: "Có",
    };
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
    profileCache: {
      type: Object,
      default: null,
    },
  },
  computed: {
    changePasswordButtonDisabled() {
      return (
        this.oldPassword == "" ||
        this.oldPasswordWarning != "" ||
        this.newPassword == "" ||
        this.newPasswordWarning != "" ||
        this.newPasswordRetype == "" ||
        this.newPasswordRetypeWarning != ""
      );
    },
    userDOB: {
      get() {
        return this.profile.date_of_birth;
      },
      set(value) {
        this.profile.date_of_birth = value;
      },
    },
  },
  methods: {
    facebook() {
      if (!this.profile.sms_verified) {
        this.$swal({
          icon: "info",
          title:
            "Bạn cần xác minh số điện thoại trước khi thực hiện chức năng này",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
      if (this.profile.fb_linked) {
        this.objSocial.showLinkSocial = true;
        this.objSocial.textLinkSocial = "Facebook";
        this.objSocial.typeSocial = "fb";
        this.objSocial.socialLinkItem = "fb_linked";
      } else {
        this.$cookies.set("url", this.$route.fullPath);
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage("LOGIN_FB");
        } else {
          this.$auth
            .loginWith("facebook")
            .then((resp) => {
              //console.log('resp',resp)
            })
            .catch((e) => {
              console.log("error", e);
            });
        }
      }
    },
    google() {
      if (!this.profile.sms_verified) {
        this.$swal({
          icon: "info",
          title:
            "Bạn cần xác minh số điện thoại trước khi thực hiện chức năng này",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
      if (this.profile.gg_linked) {
        this.objSocial.showLinkSocial = true;
        this.objSocial.textLinkSocial = "Google";
        this.objSocial.typeSocial = "gg";
        this.objSocial.socialLinkItem = "gg_linked";
      } else {
        this.$cookies.set("url", this.$route.fullPath);
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage("LOGIN_GG");
        } else {
          this.$auth
            .loginWith("google")
            .then((resp) => {
              //console.log('resp',resp)
            })
            .catch((e) => {
              console.log("error", e);
            });
        }
      }
    },
    async apple() {
      if (!this.profile.sms_verified) {
        this.$swal({
          icon: "info",
          title:
            "Bạn cần xác minh số điện thoại trước khi thực hiện chức năng này",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
      if (this.profile.apple_linked) {
        this.objSocial.showLinkSocial = true;
        this.objSocial.textLinkSocial = "Apple";
        this.objSocial.typeSocial = "apple";
        this.objSocial.socialLinkItem = "apple_linked";
      } else {
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
              redirectURI: `${window.location.origin}/social-auth/callback`,
              state: "",
              usePopup: true,
            });
          }
        }
      }
    },
    hanlerCancelSocialLink() {
      const accountId = this.$auth.getToken("local").id;
      AccountService.patchRemoveSocialLink(
        this.$axios,
        accountId,
        this.objSocial.typeSocial
      ).then((resp) => {
        let link = this.objSocial.socialLinkItem;
        this.$auth.setUser({
          ...this.$store.state.auth.user,
          fb_linked: link == "fb_linked" ? false : this.profile.fb_linked,
          gg_linked: link == "gg_linked" ? false : this.profile.gg_linked,
          apple_linked:
            link == "apple_linked" ? false : this.profile.apple_linked,
        });
        this.objSocial.showLinkSocial = false;
      });
    },
    hideModal() {
      this.isShowChangePassword = false;
    },
    showChangePassword() {
      this.isShowChangePassword = true;
    },
    onNewPasswordChange() {
      if (this.newPassword.length == 0) {
        this.newPasswordWarning = "";
        if (this.newPasswordRetype.length == 0) {
          this.newPasswordRetypeWarning = "";
        }
        return;
      }
      if (this.newPassword.length < PASSWORD_MIN_LENGTH) {
        this.newPasswordWarning = passwordLengthWarning;
      } else if (this.newPassword == this.oldPassword) {
        this.newPasswordWarning = newPasswordMatchOldPassword;
      } else {
        this.newPasswordWarning = "";
      }
    },
    onNewPasswordRetypeChange() {
      if (this.newPasswordRetype.length == 0 && this.newPassword.length != 0) {
        this.newPasswordRetypeWarning = newPasswordRetypeRequired;
        return;
      }
      if (this.newPasswordRetype != this.newPassword) {
        this.newPasswordRetypeWarning = newPasswordRetypeInvalid;
      } else {
        this.newPasswordRetypeWarning = "";
      }
    },
    onChangePassword() {
      // verify old password
      if (this.$auth.loggedIn) {
        let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
        AccountService.changeUserPassword(
          this.$axios,
          {
            current_password: this.oldPassword,
            new_password: this.newPassword,
          },
          accountId
        ).then((res) => {
          this.oldPassword = "";
          this.newPassword = "";
          this.newPasswordRetype = "";
          if (res && res.status === 204) {
            this.showSuccessPassword("Đổi mật khẩu thành công");
          } else {
            if (res.data && res.data.code) {
              this.showErrorPassword(`${res.data.message}`);
            } else {
              this.showErrorPassword("[Lỗi 500] Đổi mật khẩu thất bại");
            }
          }
        });
      }
    },
    onSaveInfo(evt) {
      evt.preventDefault();
      switch (true) {
        case !this.profile.name:
          this.errors.add({
            vvfields: "userName",
            msg: "Tên chủ tài khoản là bắt buộc",
          });
          return;
      }
      this.$validator.validateAll().then((res) => {
        if (this.$auth.loggedIn && res) {
          // work-around with bug selected of v-calendar
          let date_of_birth = {};
          if (this.profile.date_of_birth) {
            let date = new Date(this.profile.date_of_birth);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            date_of_birth = { date_of_birth: `${year}-${month}-${day}` };
          }

          const data = {
            ...this.$store.state.auth.user,
            ...date_of_birth,
            name: this.profile.name,
            email: this.profile.email,
            address: this.profile.address,
            gender: this.profile.gender,
            transaction_noty: this.profile.transaction_noty,
          };

          if (
            JSON.stringify(this.profile) !== JSON.stringify(this.profileCache)
          ) {
            let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
            AccountService.updateProfileInfo(this.$axios, data, accountId).then(
              (res) => {
                if (res.status) {
                  this.$auth.setUser({
                    ...data,
                    phone: this.profile.phone,
                    sms_verified: this.profile.sms_verified,
                  });
                  this.showSuccess("Cập nhật thông tin tài khoản thành công");
                } else if (res.data.code === "SCHEMA_VALIDATION_FAILED") {
                  this.showError("Vui lòng nhập đầy đủ thông tin");
                } else {
                  const data = res.data;

                  this.showError(
                    `[Lỗi ${data.code}] ${
                      data.message || "Cập nhật thất bại, hãy thử lại"
                    }`
                  );
                }
              }
            );
          } else {
            this.showSuccess("Cập nhật thông tin tài khoản thành công");
          }
        }
      });
    },
    showError(msg) {
      this.isShowAlert = true;
      this.isError = true;
      this.errorMsg = msg;
    },
    showSuccess(msg) {
      this.isShowAlert = true;
      this.isError = false;
      this.errorMsg = msg;
    },
    showErrorPassword(msg) {
      this.isShowAlertPassword = true;
      this.isErrorPassword = true;
      this.errorMsgPassword = msg;
    },
    showSuccessPassword(msg) {
      this.isShowAlertPassword = true;
      this.isErrorPassword = false;
      this.errorMsgPassword = msg;
    },
    ///
    onNavVerify() {
      this.modalChangePhone = false;
      this.$store.commit("showPhoneVerify", true);
      this.$store.commit("setVerifyPhone", this.profile.phone);
    },
    onChangePhone() {
      AccountService.phoneValidate(this.$axios, { phone: this.phoneData }).then(
        (res) => {
          const data = res.data;
          console.log(data);
          if (data.status) {
            this.modalChangePhone = false;
            this.$store.commit("showPhoneVerify", true);
            this.$store.commit("setVerifyPhone", this.phoneData);
          } else {
            this.errors.add({ field: "phoneData", msg: data.data.message });
          }
        }
      );
    },
  },
  mounted() {
    if (window.location.hostname == "app.gocashback.vn") {
      this.isDomainApp = true;
    }
  },
};
</script>

<style lang="scss" scoped>
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
.changeBtn {
  position: absolute;
  right: 0;
  top: 0;
  background-color: transparent !important;
  border-color: transparent !important;
  font-size: 0.875rem !important;
  color: #05668d !important;

  // :focus {
  //   background-color: transparent;
  //   border-color: transparent;
  //   font-size: 0.875rem;
  //   color: #05668d;
  // }
  // :hover {
  //   background-color: transparent;
  //   border-color: transparent;
  //   font-size: 0.875rem;
  //   color: #05668d;
  // }
  // :active {
  //   background-color: transparent;
  //   border-color: transparent;
  //   font-size: 0.875rem;
  //   color: #05668d;
  // }
}
.titleLinkSocial {
  font-size: 0.9375rem;
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
.bgGreen {
  background-color: #00a896;
}
.bgBlue {
  text-overflow: ellipsis;
  background-color: #05668d;
  height: calc(1.5em + 0.75rem + 1px);
  margin-left: 2px;
  margin-top: -1px;
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
.headerTitle {
  font-size: 1.125rem;
  color: #05668d;
}
.danger-container {
  height: 3rem;
  border-radius: 3px;
  @media (max-width: 576px) {
    height: 6rem;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
}
hr {
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  border: 0;
  border-top-color: currentcolor;
  border-top-style: none;
  border-top-width: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.subscribe {
  display: flex;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
}
.viewContainer {
  margin-bottom: 6rem;
}
.warningText {
  color: red;
  padding-bottom: 5rem;
}
.input-group-prefix {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  color: #a3a3a3;
  text-align: center;
  white-space: nowrap;
}
.input-change-phone {
  display: flex;
  width: 100%;
  height: calc(1.5em + 0.75rem - 1px);
  padding: 0.375rem 0.75rem;
  //padding-right: 0px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  //border-right-width: 0px;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  .form-control {
    background-color: transparent;
    flex: 1;
    border-left-width: 0px !important;
    border-radius: 3px !important;
    border-right-width: 0px !important;
    padding-left: 0px !important;
  }
}
.text-gg {
  color: rgba(0, 0, 0, 0.54);
}
.text-fb {
  color: #3b5998;
}
.text-apple {
  color: #000000;
}
.delete-link-text {
  color: #05668d;
}
.delete-link-text:hover {
  color: #05668d;
  text-decoration: underline;
}
</style>
