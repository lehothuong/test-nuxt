<template>
  <nuxt-link :title="products.name" :to="products.slug + '-p' + products.id">
    <div class="boxProduct my-lg-2 my-5px-res">
      <div class="position-relative mb-2">
        <div class="slider img-3-2">
          <img :alt="products.name" :src="products.image_url" class="img-small contentObFix" />
        </div>
        <p class="fontSize14 my-2 product-name">{{ products.name }}</p>
        <p class="priceProductSale">{{ formatPrice(products.discount) }}</p>
        <div class="priceProductReal">
          <p
            :class="{'d-none':products.discount === products.price}"
            v-show="isCheckBestPrice"
          >{{ formatPrice(products.price) }}</p>
        </div>
      </div>
      <p
        class="refundPriceLine refundPrice py-3 w-100"
        :class="{ refundPriceBorder: products.display_value }"
      >{{ products.display_text }}&nbsp;{{ products.display_value }}</p>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    products: {
      type: Object
    },
    isCheckBestPrice: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.priceProductSale {
  font-size: 1rem;
  font-weight: bold;
  color: #05668d;
}
.priceProductReal {
  text-decoration: line-through;
}
.refundPrice {
  align-items: center;
  display: flex;
  justify-content: center;
  color: #ff0000;
  font-weight: 700;
  &.refundPriceBorder {
    border-top: 1px solid #f8f8f8;
  }
}

@media (max-width: 576px) {
  .priceProductSale {
    font-size: 0.875rem;
  }
  .priceProductReal {
    p {
      font-size: 0.75rem;
    }
  }
  .refundPrice.refundPriceBorder {
    font-size: 0.75rem;
  }
}
</style>
