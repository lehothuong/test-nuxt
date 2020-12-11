const BannerService = {
    getBanner(axios) {
        return axios.get('/ads')
            .then(resp => {
                return resp
            })
    },
}


export default BannerService
