<template>
  <div class="bgFade">
    <!-- <div class="position-relative text-align-center">
      <img
      
        src="../../assets/img/banner-gioi-thieu.png"
        class="img-fluid"
        :alt="data.title"
      />
      <div class="textCentered">{{data.title}}</div>
    </div>
    <div class="container">
      <div class="row rowPadding">
        <div class="col-3">
          <div
            v-for="article of $store.state.footer"
            v-bind:key="article.tag"
            class="d-block text-right"
          >

          
            <a
              class="d-inline-block mb-lg-3 pointer"
              :class="
                article.tag == data.tag
                  ? 'font-weight-bold'
                  : ''
              "
              @click="onArticleClick(article.tag,article.title)"
              >{{ article.title }}</a
            >
          </div>
        </div>
        <div class="col-9 bg-white rounded pt-lg-3 pb-lg-4">
          <h4 class="text-uppercase titleColor">{{ data.title }}</h4>
          <p class="my-lg-3" v-html="data.content"></p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import { getArticleByTag } from "@/api/article";

export default {
  data() {
    return {
      
    };
  },
  created() {
    
  },
  // async asyncData(context) {
  //    try {
  //      const path = context.route.params.slug;
  //       if(!path){
  //         throw "404";
  //       }
  //       const result = await getArticleByTag(
  //         context.app.$axios,
  //         context.route.params.slug
  //       );
  //       if(!result){
  //         throw "404";
  //       }
  //       return {
  //         data: result.data.data,
  //       };
  //    } catch (error) {
  //      context.error({ statusCode: 404 });
  //    }
  // },
  // methods: {
  //   onArticleClick(tag,titleTexts) {
  //     this.$router.push('/gioi-thieu/'+tag)
  //     // this.$store.commit("setSelectedFooterArticle", tag);
  //     // this.$store.commit('changeArticleText',titleTexts)
  //   },
  // }
};
</script>

<style lang="scss" scoped>
.bgFade {
  background-color: #f8f8f8;
  position: relative;
  top: -3px;
}
.rowPadding {
  padding: 1.5rem 8.125rem 2.125rem 8.125rem;
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
  color: #05668D;
}
.paragraphHeight {
  line-height: 2;
}
</style>
