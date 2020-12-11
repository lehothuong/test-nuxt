const VendorService = {
    getHotVendorEveryday(axios){
        return axios.get('/hot-everyday')
        .then(resp=>{
            return resp
        })
    } 
}

export default VendorService