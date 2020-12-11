<template>
  <div>
    <component :is="component" :data="data"></component>
  </div>
</template>
<script>
import { getEntityInfo } from "@/misc/helpers";
import ProductService from "@/api/product";
export default {
  components: {
    products: () => import("@/components/slug/products"),
    categories: () => import("@/components/slug/categories")
  },
  data() {
    return {
      component: null
    };
  },

  async asyncData(context) {
    // context.app.$axios.defaults.headers.common['Authorization'] = `Bearer ${context.app.store.state.author}`
    // if(context.app.$axios.defaults.headers.common['Authorization'] === 'Bearer '){
    //       context.app.$axios.defaults.headers.common['Authorization'] = `${context.app.$cookies.get('local3')}`
    // }
    try {
      const path = context.route.fullPath || context.route.path;
      const entity = getEntityInfo(path);
      let name = "";
      if (entity.entityName == "categories") {
        name = "/vendors";
      } else {
        name = "";
      }
      if (entity) {
        const result = await ProductService.getProductSlug(
          context.app.$axios,
          entity.entityName,
          entity.entityId,
          name
        );
        if (!result.data.status) {
          throw "404";
        }
        return {
          data: result.data.data,
          component: entity.entityName
        };
      }
    } catch (e) {
      context.error({ statusCode: 404 });
    }
  }
};
</script>
