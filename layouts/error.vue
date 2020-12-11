<template>
    <div class="benefitBg pt-lg-3 pb-lg-5">
      <div class="container ">
          <div class="text-center rounded5px bg-white pt-lg-5 pt-4">
              <p>
                  Không tìm thấy thông tin bạn cần!
              </p>
              <div>
                Quay về <nuxt-link to="/" class="text-uppercase colorRedirect">trang chủ</nuxt-link>
                 <!-- sau {{timeCountdown}} giây. -->
              </div>
                <img class="errorImg mt-4 pb-5" width="420" height="324" src="../assets/img/img-404.png"/>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  props: ['error'],
  layout: 'default',
  data(){
    return{
      timeCountdown:5,
    }
  },
  mounted(){
    // console.log(this.error.statusCode)
    // console.log(this.error.statusCode)
    // if(this.error.statusCode === 404){
    //   setInterval(() => {
    //     this.timeCountdown--;
    //     if (this.timeCountdown <= 0) {
    //       window.location.href = '/'
    //     }
    //   }, 1000);
    // }
      
  }
}
</script>
<style lang="scss" scoped>
.colorRedirect{
  color: #cb0055;
}
@media (max-width: 576px) {
  .errorImg{
    width: 100%;
    height: 100%;
  }
}

</style>