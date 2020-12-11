<template>
  <div class="bgFade">
    <div class="position-relative text-align-center">
      <div>
        <img src="../../assets/img/banner-gioi-thieu.png" class="img-fluid" :alt="data.title" />
      </div>
      <div class="textCentered">{{data.title}}</div>
    </div>
    <div class="container containerCustomArticle">
      <div class="row rowPadding">
        <div class="col-lg-3 col-12 d-none d-lg-block">
          <div
            v-for="item of $store.state.typeSecond"
            v-bind:key="item.tag"
            class="d-block text-right"
          >
            <nuxt-link
              class="d-inline-block mb-lg-3 pointer"
              :class="
                item.tag == data.tag
                  ? 'font-weight-bold'
                  : ''
              "
              :to="'/thong-tin/'+item.tag"
            >{{ item.title }}</nuxt-link>
          </div>
        </div>
        <div class="col-lg-9 col-12 bg-white rounded pt-3 pb-4 overflow-hidden">
          <div class="my-3" v-html="data.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleByTag } from "@/api/article";

export default {
  data() {
    return {};
  },
  created() {},
  async asyncData(context) {
    try {
      const path = context.route.params.slug;
      if (!path) {
        throw "404";
      }
      const result = await getArticleByTag(
        context.app.$axios,
        context.route.params.slug
      );
      if (!result) {
        throw "404";
      }
      return {
        data: result.data.data,
      };
    } catch (error) {
      context.error({ statusCode: 404 });
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.bgFade {
  background-color: #f8f8f8;
  position: relative;
  top: -3px;
}
.rowPadding {
  padding: 1.5rem 0rem 2.125rem 0rem;
}
.textCentered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.875rem;
}
.titleColor {
  color: #05668d;
}
.paragraphHeight {
  line-height: 2;
}
@media (max-width: 576px) {
  .fontSizeTitleArticle {
    font-size: 1.25rem;
  }
  .bgFade {
    padding-top: 101px;
    top: 0;
  }
  .textCentered {
    font-size: 1.25rem;
    width: 100%;
    text-align: center;
  }
  .img-fluid {
    height: 18vh;
    object-fit: cover;
  }
  .rowPadding {
    padding: initial;
  }
}
</style>
