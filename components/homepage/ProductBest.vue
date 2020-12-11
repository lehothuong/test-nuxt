<template>
  <section class="mt-lg-4">
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center">
        <div class="flex-row d-flex">
          <img alt="goCASHBACK" src="../../assets/img/icon/discount.svg" width="16" height="21" />
          <h5 class="titleHot ml-lg-2 pl-lg-1">Giá đang tốt nhất</h5>
        </div>
        <nuxt-link to="/me-va-be">
          <h6 class="titleSeeMore">Xem tất cả</h6>
        </nuxt-link>
      </div>
      <div v-show="!products.length > 0" class="row mx-2-minus product-best-row">
        <div class="col-lg-3 px-lg-2" v-for="(item,index) in 12" :key="index">
          <content-placeholders centered class="placeholder-box-product">
            <content-placeholders-img />
            <content-placeholders-text class="title" :lines="1" />
            <content-placeholders-text class="title1" :lines="1" />
            <content-placeholders-text class="title2" :lines="1" />
            <content-placeholders-text class="mt-lg-3" :lines="1" />
          </content-placeholders>
        </div>
      </div>
      <div v-show="products.length > 0" class="row mx-2-minus product-best-row">
        <div class="col-lg-3 px-lg-2" v-for="(item,index) in products" :key="index">
          <BoxProduct :products="item" :isCheckBestPrice="isCheckBestPrice"></BoxProduct>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import BoxEcommerceHot from "../BoxEcommerceHot";
import BoxProduct from "../BoxProduct";
const ProductService = () => import("@/api/product");

export default {
  components: {
    BoxEcommerceHot,
    BoxProduct
  },
  data() {
    return {
      products: [],
      isCheckBestPrice: true
    };
  },
  created() {
    this.getProductBestPrice();
  },
  methods: {
    getProductBestPrice() {
      ProductService().then(result => {
        result.default.getProductBestPrice(this.$axios).then(resp => {
          this.products = resp.data.data;
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.product-best-row {
  margin-left: -0.5rem;
  margin-right: 0.5rem;
}
</style>