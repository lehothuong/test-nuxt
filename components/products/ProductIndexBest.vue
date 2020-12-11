<template>
  <section class="mt-lg-5">
    <div class="d-flex">
      <img alt="goCASHBACK" src="../../assets/img/icon/discountSecond.svg" width="16" height="21" />
      <h5 class="titleHot titleHotGreen ml-lg-2 pl-lg-1">Giá đang tốt nhất</h5>
    </div>
    <div v-show="isLoading" class="row mx-2-minus product-best-row">
      <div class="col-lg-3 px-lg-2" v-for="(item,index) in 4" :key="index">
        <content-placeholders centered class="placeholder-box-product">
          <content-placeholders-img />
          <content-placeholders-text class="title" :lines="1" />
          <content-placeholders-text class="title1" :lines="1" />
          <content-placeholders-text class="title2" :lines="1" />
          <content-placeholders-text class="mt-lg-3" :lines="1" />
        </content-placeholders>
      </div>
    </div>
    <div v-show="!isLoading" class="row mx-2-minus">
      <div class="col-lg-3 px-lg-2" v-for="(item,index) in products" :key="index">
        <BoxProduct :products="item" :isCheckBestPrice="isCheckBestPrice"></BoxProduct>
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
      isCheckBestPrice: true,
      isLoading: false
    };
  },
  created() {
    this.getProductBestPrice();
  },
  methods: {
    getProductBestPrice() {
      this.isLoading = true;
      ProductService().then(result => {
        result.default.getProductBestPrice(this.$axios).then(resp => {
          this.products = Array.from(resp.data.data).slice(0, 4);
          this.isLoading = false;
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>