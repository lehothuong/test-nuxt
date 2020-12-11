const PromoService = {
    getVendorCoupon(axios) {
        return axios.get('/vendor-coupons')
            .then(resp => {
                return resp
            })
    },
}


export default PromoService