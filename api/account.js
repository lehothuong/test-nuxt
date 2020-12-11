const AccountService = {
  register(axios, data) {
    return axios.post("/v2/accounts/sms-sending", data).then(resp => {
      return resp;
    });
  },
  phoneRegistration(axios, data) {
    return axios.post("/v3/accounts/phone-registration", data).then(resp => {
      return resp;
    });
  },
  getProfileInfo(axios, accountId) {
    return axios.get(`/accounts/${accountId}`).then(resp => {
      return resp;
    });
  },
  phoneValidate(axios, data) {
    return axios
      .post(`/v3/accounts/phone-validate`, data)
      .then(resp => {
        return resp;
      })
      .catch(e => {
        return e.response;
      });
  },
  getAccountReferrals(axios, accountId) {
    return axios.get(`/accounts/${accountId}/referrals`).then(resp => {
      return resp;
    });
  },
  postAccountReferallValidation(axios, data) {
    return axios
      .post("/referral-validations", { invite_code: data })
      .then(resp => {
        return resp;
      });
  },
  postIntroFriend(axios, accountId, data) {
    return axios
      .post(`/accounts/${accountId}/invitation_mails`, data)
      .then(resp => {
        return resp;
      });
  },
  updateProfileInfo(axios, data, accountId) {
    return axios
      .patch(`/accounts/${accountId}`, data)
      .then(resp => {
        return resp;
      })
      .catch(e => {
        return e.response.data;
      });
  },
  changeUserPassword(axios, data, accountId) {
    return axios
      .patch(`/accounts/${accountId}/change-password`, data)
      .then(resp => {
        return resp;
      })
      .catch(e => {
        return e.response.data;
      });
  },
  getCashbackSummary(axios, accountId) {
    return axios.get(`/accounts/${accountId}/cashback-summary`).then(resp => {
      return resp;
    });
  },
  getCashbackTransactionList(axios, accountId) {
    return axios
      .get(`/accounts/${accountId}/cashback-transactions`)
      .then(resp => {
        return resp;
      });
  },
  getTransactionList(axios, accountId) {
    return axios
      .get(`/accounts/${accountId}/withdraw-transactions`)
      .then(resp => {
        return resp;
      });
  },
  getBankInfo(axios, accountId) {
    return axios.get(`/accounts/${accountId}/bank-account`).then(resp => {
      return resp;
    });
  },
  getBanks(axios) {
    return axios.get(`/banks`).then(resp => {
      return resp;
    });
  },
  getProvinces(axios) {
    return axios.get(`/provinces`).then(resp => {
      return resp;
    });
  },
  requestTransaction(axios, data, accountId) {
    return axios
      .post(`/accounts/${accountId}/withdraw-transactions`, data)
      .then(resp => {
        return resp;
      })
      .catch(e => {
        return e.response.data;
      });
  },
  updateBankAccount(axios, data, accountId) {
    return axios.put(`/accounts/${accountId}/bank-account`, data).then(resp => {
      return resp;
    });
  },
  postLoginSocial(axios, accToken, socialType) {
    return axios
      .post(`/v2/accounts/${socialType}`, { token: accToken })
      .then(resp => {
        return resp;
      });
  },
  linkSocial(axios, accToken, accountId, socialType) {
    let socialLinkType = "";
    let status = "";
    switch (socialType) {
      case "gg-login":
        socialLinkType = "gg-link";
        status = "gg_linked";
        break;
      case "apple-login":
        socialLinkType = "apple-link";
        status = "apple_linked";
        break;
      case "fb-login":
        socialLinkType = "fb-link";
        status = "fb_linked";
        break;
    }
    return axios
      .patch(`/v2/accounts/${accountId}/${socialLinkType}`, { token: accToken })
      .then(resp => {
        return { ...resp, type: status };
      });
  },
  patchRemoveSocialLink(axios, accountId, linkPlatform) {
    return axios
      .patch(`/v2/accounts/${accountId}/remove-social-link`, {
        link_platform: linkPlatform
      })
      .then(resp => {})
      .catch(e => {
        return e.response.data;
      });
  },
  sendResetPasswordRequest(axios, data) {
    return axios
      .post("/v2/accounts/request-change-password", data)
      .then(resp => {
        if (resp.data) {
          return resp.data;
        } else {
          return resp.response.data;
        }
      })
      .catch(e => {
        return e.response.data;
      });
  },
  resetPassword(axios, data) {
    return axios
      .post("/v2/accounts/change-password-with-otp", data)
      .then(resp => {
        return resp.data;
      })
      .catch(e => {
        return e.response.data;
      });
  },
  sendSMS(axios, data, accountId) {
    return axios
      .post(`/accounts/${accountId}/sms-sending`, data)
      .then(resp => {
        if (resp.data) {
          return resp.data;
        } else {
          return resp.response.data;
        }
      })
      .catch(e => {
        return e.response.data;
      });
  },
  verifyCode(axios, data, accountId) {
    return axios
      .post(`/accounts/${accountId}/sms-verification`, data)
      .then(resp => {
        return resp;
      })
      .catch(e => {
        return e.response.data;
      });
  },
  requestVerify(axios, data, accountId) {
    return axios
      .post(`/v3/accounts/${accountId}/send-verify-sms`, data)
      .then(resp => {
        return resp;
      })
      .catch(e => {
        return e.response.data;
      });
  },
  verifyPhoneNumber(axios, data, accountId) {
    return axios
      .post(`/v3/accounts/${accountId}/verify-phone-with-otp`, data)
      .then(resp => {
        return resp;
      })
      .catch(e => {
        return e.response.data;
      });
  },
  verifyResetPasswordToken(axios, data) {
    return axios
      .post("/forgot-password/token-verification", data)
      .then(resp => {
        return resp;
      })
      .catch(e => {
        return e.response.data;
      });
  }
};

export default AccountService;
