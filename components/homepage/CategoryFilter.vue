<template>
  <section class="mt-lg-5 mt-4">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <div class="flex-row d-flex">
          <img class="iconHot" src="../../assets/img/icon/fire.svg" width="16" height="21" />
          <h5 class="titleHot ml-lg-2 pl-lg-1 pl-2">Tìm giá tốt nhất</h5>
        </div>
      </div>
      <div class="boxCategoryFilter mt-lg-2" v-if="isLoading">
        <div class="rowCategoryFilter mx-2-minus mx-5px-minus">
          <div
            class="col-lg-3 px-lg-2 px-5-res mt-2 col-custom"
            v-for="(item, index) in 4"
            :key="index"
          >
            <content-placeholders :rounded="true">
              <content-placeholders-img class="placeholder-category" />
            </content-placeholders>
          </div>
        </div>
      </div>
      <div v-else class="boxCategoryFilter mt-lg-2">
        <div class="rowCategoryFilter mx-2-minus mx-5px-minus">
          <div
            class="col-lg-3 px-lg-2 px-5-res mt-2 col-custom"
            v-for="(item, index) in categoryLevelSingles"
            :key="'cp' + index"
          >
            <BoxCategoryProduct class="bg-white border-3" :item="item"></BoxCategoryProduct>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ProductService from "@/api/product";
import BoxCategoryProduct from "../../components/BoxCategoryProduct";
export default {
  components: {
    BoxCategoryProduct
  },
  data() {
    return {
      vendors: [],
      categoryLevelSingles: [],
      isLoading: false,
      active: false,
      categoryId: undefined
    };
  },
  created() {
    this.getProductListCategories();
  },
  methods: {
    getProductListCategories() {
      this.isLoading = true;
      ProductService.getProductListCategories(this.$axios).then(resp => {
        this.categoryLevelSingles = resp.data.data;
        this.isLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.rowCategoryFilter {
  margin-left: 0;
  margin-right: -10px;
  overflow-x: auto;
  flex-wrap: nowrap;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }
}
@media (max-width: 576px) {
  .boxCategoryFilter {
    .col-custom {
      flex: 0 0 45%;
      max-width: 45%;
    }
  }
  .btnSearchReverse {
    font-size: 0.875rem;
  }
  .btnSearch {
    font-size: 0.875rem;
  }
}
</style>
