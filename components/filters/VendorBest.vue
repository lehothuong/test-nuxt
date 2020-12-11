<template>
  <div v-if="listVendors && listVendors.length > 0">
    <div>
      <h5 class="titleHot titleChildColor mb-lg-3 mb-2">Các đối tác nổi bật</h5>
    </div>
    <div class="pb-lg-5 pb-4 pt-lg-0 pt-1">
      <div class="row e-commerce-container rowPadding m-0">
        <div class="col-lg-2 col-6 p-0" v-for="vendor in listVendors" v-bind:key="vendor.id">
          <BoxEcommerceHot :vendors="vendor"></BoxEcommerceHot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductService from "@/api/product";
import BoxEcommerceHot from "../BoxEcommerceHot";
import { categoryIdMomAndChild } from "@/api/enum";
export default {
  components: {
    BoxEcommerceHot
  },
  data() {
    return {
      listVendors: []
    };
  },
  created() {
    this.getVendorBest();
  },
  methods: {
    getVendorBest() {
      ProductService.getVendorBest(this.$axios, categoryIdMomAndChild).then(
        resp => {
          this.listVendors = resp.data.data.vendors;
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.e-commerce-container {
  // border:1px solid #d9d9d9;
  border-radius: 0.25rem;
  // border: 1px solid #d9d9d9;

  .col-lg-2 {
    border: 1px solid #d9d9d9;
    transition: 0.3s all;
    // border-left:1px solid transparent ;
    background-color: #fff;
    &:first-child {
      border-left: 1px solid #d9d9d9;
    }
    &:hover {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      border: solid 1px #05668d;
    }
  }
}
</style>
