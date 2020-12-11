const ProductService = {
  getProductBestPrice(axios) {
    return axios.get("/best-price").then(resp => {
      return resp;
    });
  },
  getProductYouMayNeed(axios) {
    return axios.get("/you-may-need").then(resp => {
      return resp;
    });
  },
  getProductListCategories(axios) {
    return axios.get("list-categories").then(resp => {
      return resp;
    });
  },
  getListCategoriesFilterData(axios, categoryId) {
    return axios.get(`/category/${categoryId}/filter-data`).then(resp => {
      return resp;
    });
  },
  getSubBrandFilter(axios, categoryId) {
    return axios.get(`/categories/${categoryId}/sub-brands`).then(resp => {
      return resp;
    });
  },
  getCategoriesAmountFilter(axios, categoryId) {
    return axios.get(`/categories/${categoryId}/amount-filter`).then(resp => {
      return resp;
    });
  },
  getProductSlug(axios, entityName, productId, categories) {
    if (!categories) {
      categories = "";
    }
    return axios.get(`/${entityName}/${productId}${categories}`).then(resp => {
      return resp;
    });
  },
  getVendorBest(axios, categoryId) {
    return axios.get(`/categories/${categoryId}/vendors`).then(resp => {
      return resp;
    });
  },
  postProductFilter(
    axios,
    categoryId,
    brandId,
    isCombo,
    sub_categories,
    subBrandId,
    arrFilters,
    selectedVendor,
    sortField,
    sortType,
    page,
    pageSize
  ) {
    return axios
      .post(`/v2/category/${categoryId}/products`, {
        brand_id: brandId,
        is_combo: parseInt(isCombo),
        sub_category: sub_categories,
        sub_brand_id: subBrandId,
        filters: arrFilters,
        vendors: selectedVendor,
        sort_field: sortField,
        sort_type: sortType,
        offset: page,
        limit: pageSize
      })
      .then(resp => {
        return resp;
      });
  },
  getListCategories(axios) {
    return axios.get("categories").then(resp => {
      return resp;
    });
  },
  getBalance(axios, accountId) {
    return axios.get(`/accounts/${accountId}/balance`).then(resp => {
      return resp;
    });
  },
  getVendorCommissions(axios, vendorId) {
    return axios.get(`/vendors/${vendorId}/commissions`).then(resp => {
      return resp;
    });
  },
  postAffLink(axios, accountId, affLink) {
    return axios
      .post(`/accounts/${accountId}/product-link`, { target_url: affLink })
      .then(resp => {
        return resp;
      });
  },
  patchActiveVendor(axios,v, v1, v2) {
    return axios
      .patch(v, { extensionID: v1, vendor:v2})
      .then(resp => {
        return resp;
      });
  }
};

export default ProductService;
