const TrackingService = {
    trackBuyAction(axios,accountId,productId) {
        return axios.post(`/tracking/${accountId}/buy`,{
            product_id: productId
        }).then(resp => {
            return resp
        })
    },
}


export default TrackingService
