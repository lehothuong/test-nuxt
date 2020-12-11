<template>
    <b-modal
      v-model="isPopup"
      hide-footer
      header-class="text-uppercase text-light modalHeader"
      id="modal-logout"
      centered
      title="Thông tin quan trọng"
    >
      <div>
        <span class="d-lg-block d-flex justify-content-center text-center my-4">
          Hoàn tiền chỉ áp dụng cho các mua sắm được thực hiện trên ứng dụng {{$store.state.modalPlatform.vendorName}} khi nhấp từ goCASHBACK trên điện thoại. Bạn có muốn tiếp tục mua sắm trên website {{$store.state.modalPlatform.vendorName}} không?
        </span>
        <div class="row align-items-center">
         <div class="col-6">
            <a
            @click="isPopup=false"
              type="submit"
              class="d-block text-center w-100 text-uppercase font-weight-bold my-lg-3 rounded btnLogoutReverse"
            >Hủy</a>
         </div>
          <div class="col-6">
            <a
              @click="handleGotoLink()"
              target="_blank"
              class="d-block pointer text-center w-100 text-uppercase font-weight-bold my-lg-3 rounded btnLogout"
            >Tiếp tục</a>
         </div>
        </div>
      </div>
    </b-modal>
</template>
<script>
import ProductService from "@/api/product";
export default {
    computed:{
        isPopup:{
            get() {
                return this.$store.state.modalPlatform.isPopup;
            },
            set(modalPlatform) {
                this.$store.commit("changeModalPlatform", modalPlatform);
            }
        },
    },
    methods:{
      handleGotoLink(){
        if(window.ReactNativeWebView){
          window.ReactNativeWebView.postMessage(this.$store.state.modalPlatform.vendorName)
        }
        let aff = this.$auth.$storage.getLocalStorage("affiliate_url");
         let targetLink = this.$store.state.modalPlatform.targetLink
        if(aff){
          ProductService.patchActiveVendor(this.$axios,aff.host_name,aff.extension_id,aff.vendor)
            .catch(e => console.log(e))
            .finally(()=>{
              window.open(targetLink,"_self");
            })
          this.$auth.$storage.setLocalStorage(
            "affiliate_url",
            null
          );
        }else{
          window.open(targetLink,'_blank')
        }
        this.isPopup = false;
        // this.$router.push({path:'/'+this.$store.state.modalPlatform.targetLink})
      }
    }
}
</script>
<style lang="scss" scoped>
.btnLogoutReverse{
  border: solid 1px #05668D;
  background-color: #ffffff;
  color: #05668D;
  padding: 0.75rem 1rem;
  &:hover, &:focus, &:active{
    background-color: #f2f2f2 !important;
    box-shadow: none !important;
    outline: none;
    color: #05668D !important;
  }
}

.btnLogout{
  border: solid 1px #05668D;
  background-color: #05668D;
  color: #ffffff;
  padding: 0.75rem 1rem;
  &:hover, &:focus, &:active{
    background-color: #044862 !important;
     color: #ffffff !important;
    box-shadow: none !important;
    outline: none;
  }
}
</style>