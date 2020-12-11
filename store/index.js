import { Store } from "vuex";
import { getArticleCategories } from "@/api/article";
import md5 from "js-md5";
import Cookies from "js-cookie";
import OneSignalService from "@/api/onesignal";

const createStore = () => {
  return new Store({
    state: () => ({
      showPhoneVerify: false,
      verifyPhoneNumber: "",
      showPopup: false,
      showPopupForgotPassword: false,
      showBankAccountPopup: false,
      isPopupVerify: false,
      isPopupVerifySuccess: false,
      dataInvite: "",
      useOtherPhone: false,
      tabIndexAccount: 0,
      id: undefined,
      banks: [],
      modalPlatform: {
        isPopup: false,
        targetLink: "",
        vendorName: ""
      },
      productId: undefined,
      balance: undefined,
      callbackSocialLink: {},
      users: {
        phoneNumber: undefined,
        password: undefined,
        name: "",
        hash: "",
        sessionId: "",
        inviteCode: "",
        callbackSocialLinkModify: {}
      },
      forgotPassword: {
        hash: ""
      },
      vendorPlatform: {},
      modalShowCommission: false,
      vendorCommission: {},
      isCommision: false,
      vendor: {
        vendorId: undefined,
        vendorName: "",
        vendorUrl: ""
      },
      modalLogout: false,
      // footer: [],
      typeSecond: [],
      bankInfo: null,
      // selectedFooterArticle: "",
      textError: "",
      textErrorRegisters: undefined,
      textNotificationRegisters: undefined,
      author: "",
      showPopupAdblock: false,
      articleText: "Các điều khoản sử dụng",
      tabIndexProfile: 0,
      isCheckCashBack: false
    }),
    getters: {
      invitedCode(state) {
        return state.dataInvite || Cookies.get("invite_code") || "";
      }
    },
    mutations: {
      showPhoneVerify(state, value) {
        state.showPhoneVerify = value;
      },
      setVerifyPhone(state, value) {
        console.log(value);
        state.verifyPhoneNumber = value;
      },
      isCommision(state, value) {
        state.isCommision = value;
      },
      changeInvite(state, value) {
        state.dataInvite = value;

        // 1h
        var expires = new Date(new Date().getTime() + 60 * 60 * 1000);

        Cookies.set("invite_code", value, { expires });
      },
      changeForgotPasswordHash(state, value) {
        state.forgotPassword.hash = value;
      },
      changeSectionId(state, value) {
        state.users.sessionId = value;
      },
      changeCallbackSocialLink(state, value) {
        state.callbackSocialLink = value;
      },
      changeTabIndex(state, value) {
        state.tabIndexAccount = value;
      },
      changePopupRegisterAgain(state, value) {
        state.useOtherPhone = value;
        state.users.password = undefined;
        state.showPopup = true;
      },
      changePopupVerify(state, value) {
        state.isPopupVerify = value;
      },
      changePopupVerifySuccess(state, value) {
        state.isPopupVerifySuccess = value;
      },
      changeProductById(state, value) {
        state.productId = value;
      },
      changeCheckCashBack(state, value) {
        state.isCheckCashBack = value;
      },
      changeModalPlatform(state, modalPlatform) {
        state.modalPlatform.isPopup = modalPlatform.isPopup;
        state.modalPlatform.targetLink = modalPlatform.targetUrl;
        state.modalPlatform.vendorName = modalPlatform.vendorName;
      },
      changeVendorPlatform(state, value) {
        state.vendorPlatform = value;
      },
      changeLogout(state, value) {
        state.modalLogout = value;
      },
      changeTabIndexProfile(state, value) {
        state.tabIndexProfile = value;
      },
      changeUsers(state, value) {
        state.users.phoneNumber = value.phoneNumber;
        state.users.password = value.password;
        state.users.name = value.name;
        state.users.hash = value.hash;
        state.users.sessionId = value.sessionId;
        state.users.inviteCode = value.inviteCodeData;
        state.users.callbackSocialLinkModify = value.callbackSocialLinkModify;
      },
      changePopup(state, value) {
        state.showPopup = value;
      },
      changePopupAdblock(state, value) {
        state.showPopupAdblock = value;
      },
      handleError(state, value) {
        state.textError = value;
      },
      handleNotificationRegister(state, value) {
        state.textNotificationRegisters = value;
      },
      handleErrorRegister(state, value) {
        state.textErrorRegisters = value;
      },
      changePopupForgotPassword(state, value) {
        state.showPopupForgotPassword = value;
      },
      changeBankAccountPopup(state, value) {
        state.showBankAccountPopup = value;
      },
      changePopupCommission(state, value) {
        state.modalShowCommission = value;
      },
      updateBalance(state, value) {
        state.balance = value;
      },
      changeVendorCommission(state, value = {}) {
        const { id, data } = value;
        if (id !== undefined && data) {
          const commission = { ...state.vendorCommission };
          commission[id] = data;
          state.vendorCommission = commission;
        }
      },
      changeVendor(state, value) {
        state.vendor.vendorId = value.vendorId;
        state.vendor.vendorName = value.vendorName;
        state.vendor.vendorUrl = value.vendorUrl;
      },
      changBankInfo(state, value) {
        state.bankInfo = value;
      },
      changeBanks(state, value) {
        state.banks = value;
      },
      setFooterDataTypeSecond(state, value) {
        state.typeSecond = value;
      },
      // setSelectedFooterArticle(state, article) {
      //   state.selectedFooterArticle = article;
      // },
      updateAuthor(state, value) {
        state.author = value;
      }
    },
    actions: {
      async nuxtServerInit({ commit, state }, { req, app }) {
        const vendorPlatform = await this.$axios.get("/vendor-platforms");
        commit("changeVendorPlatform", vendorPlatform.data.data);
        const footerResTypeSecond = await getArticleCategories(
          this.$axios,
          "ho-tro"
        );
        commit("setFooterDataTypeSecond", footerResTypeSecond.data.data);
      },
      changeTabIndexProfile(context, value) {
        Cookies.set("tab-pf", value);
        context.commit("changeTabIndexProfile", value);
      },
      async getProfile(context, obj) {
        this.$axios.setHeader("Authorization", obj.token);
        this.$auth.ctx.app.$axios.setHeader("Authorization", obj.token);
        let deviceInfo = this.$auth.$storage.getLocalStorage("device-info");
        if (deviceInfo) {
          await OneSignalService.updateOnesignalWithAccount(
            this.$axios,
            deviceInfo,
            obj.id
          );
        }
        let profile = await this.$axios
          .get(`/accounts/${obj.id}`)
          .catch(async e => {
            // context.commit("changePopup", true);
            if (deviceInfo) {
              await OneSignalService.removeOnesignalWithAccount(
                this.$axios,
                deviceInfo
              );
            }
            this.$auth.logout();
          });
        this.$auth.setUser(profile.data);
        let bankInfo = await this.$axios.get(
          `/accounts/${obj.id}/bank-account`
        );
        context.commit("changBankInfo", bankInfo.data ? bankInfo.data : {});
        context.dispatch("getBalance", obj.id);
      },
      async changePopupAll(context) {
        let vendorId = context.state.vendor.vendorId;
        if (vendorId) {
          if (!context.state.vendorCommission[vendorId]) {
            await this.$axios
              .get(`/vendors/${vendorId}/commissions`)
              .then(resp => {
                context.commit("changeVendorCommission", {
                  id: vendorId,
                  data: resp.data.data
                });
                context.commit("changePopupCommission", true);
              });
          } else {
            context.commit("changePopupCommission", true);
          }
        }
      },
      getBalance(context, id) {
        this.$axios.get(`/accounts/${id}/balance`).then(resp => {
          let balance = resp.data.data.balance;
          context.commit("updateBalance", balance);
        });
      },
      async loginSocicalError(context, value) {
        context.commit("changePopup", true);
        context.commit("handleError", value);
      },
      async loginSocicalErrorRegister(context, value) {
        context.commit("changePopup", true);
        context.commit("handleNotificationRegister", value);
      }
    }
  });
};

export default createStore;
