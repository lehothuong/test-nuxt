const OneSignalService = {
  updateOnesignal(axios, data) {
    return axios.patch("/link-one-signal", data).then(resp => {
      return resp;
    });
  },
  updateOnesignalWithAccount(axios, data, accountId) {
    return axios.patch(`/${accountId}/link-one-signal`, data).then(resp => {
      return resp;
    });
  },
  removeOnesignalWithAccount(axios, data) {
    return axios.patch(`/remove-link-one-signal`, data).then(resp => {
      return resp;
    });
  }
};

export default OneSignalService;
