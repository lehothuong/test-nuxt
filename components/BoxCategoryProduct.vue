<template>
  <nuxt-link
    :to="'/me-va-be/' + item.slug + '-c' + item.id+'?brand=0&iscombo=0&subcategoryid=0&subbrandid=0&issubbrand=true&listproperty=%7B%7D&sortfield=discount&sorttype=asc&currenpage=1'"
    :title="item.name"
    class="pointer d-block boxCategory"
  >
    <div class>
      <div class="slider img-263-150">
        <img
          v-lazy="item.image_url"
          :alt="item.name"
          class="img-small border-3"
        />
      </div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    },
    index: {
      type: String,
      default: ""
    },
    active: {
      active: String,
      default: ""
    }
  },
  data() {
    return {
      // active:undefined
    };
  },
  mounted() {},
  methods: {
    // handleSendIdCategory(v){
    //     this.active = v
    //     this.$emit('handleSendIdCategory', v)
    // }
  }
};
</script>
<style lang="scss" scoped>
.boxCategory {
  text-align: center;
  // padding: 0.875rem;
  // padding-bottom: 0.35rem;
  // border: 1px solid #d9d9d9;
  transition: 0.3s all;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    // border: solid 1px #05668D;
  }
  &:focus {
    outline: none;
  }
}
.titleCategoryPading {
  padding-top: 0.5rem;
}
.priceProductSale {
  font-weight: 700;
}
.priceProductReal {
  text-decoration: line-through;
  line-height: 1;
}
.refundPrice {
  color: #ff0000;
  font-weight: 700;
}
@media (max-width: 576px) {
  .titleCategoryPading {
    font-size: 0.75rem !important;
  }
}
</style>
