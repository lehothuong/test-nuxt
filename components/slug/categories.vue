<template>
  <div class="bgFade">
    <div class="position-relative text-align-center imgTop">
      <img :alt="data.category_name" src="../../assets/img/banner-gioi-thieu.png" class="img-fluid" />
      <div class="textCentered">
        Các đối tác {{ data.category_name }}
        hàng đầu
      </div>
    </div>
    <div class="container pb-3 pt-lg-0 pt-1">
      <div class="row e-commerce-container rowPadding m-0">
        <div class="col-lg-2 col-6 p-0" v-for="vendor in data.vendors" v-bind:key="vendor.id">
          <BoxEcommerceHot :vendors="vendor"></BoxEcommerceHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BoxEcommerceHot from "../BoxEcommerceHot";
export default {
  components: {
    BoxEcommerceHot
  },
  props: {
    data: {
      default: Object,
      type: null
    }
  },
  methods: {
    // handleClickVendor(url){
    //   if(this.$cookies.get('adblock')){
    //     this.$store.commit('changePopupAdblock',true)
    //   }
    //   else if(!this.$auth.loggedIn){
    //     this.$store.commit('changePopup',true)
    //   }else{
    //     let accountId = $auth.user.id;
    //     window.open(url + `a-${accountId}`, '_blank');
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.bgFade {
  background-color: #f8f8f8;
}
.textCentered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.875rem;
}
.rowPadding {
  // padding: 5rem 8.125rem;
  padding-bottom: 5rem;
  padding-top: 5rem;
  // margin-right: -14px;
  // margin-right: -14px;
}
.vendorStyle {
  border: solid 1px #d9d9d9;
  transition: 0.3s all;
  &:hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px #05668d;
  }
}

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

@media (max-width: 576px) {
  // .bgFade {
  //   padding-top: 101px;
  //   top: 0;
  // }
  .imgTop {
    top: -15px;
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
