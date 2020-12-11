<template>
    <section class="mt-lg-5">
     <div class="container">
         <div class="d-flex justify-content-between align-items-center">
             <h5 class="titleHot">Có thể bạn sẽ cần</h5>
             <nuxt-link to="">
                 <h6 class="titleSeeMore">Xem tất cả</h6>
             </nuxt-link>
         </div>
         <div class="row m-0">
             <div class="col-lg-2  p-0" v-for="(item,index) in products" :key="index">
                 <BoxProduct  :products="item"></BoxProduct>
             </div>
         </div>
     </div>
    </section>
</template>
<script>
import BoxEcommerceHot from "../BoxEcommerceHot";
import BoxProduct from "../BoxProduct";
const ProductService = () => import("@/api/product")
export default {
    components:{
        BoxEcommerceHot,
        BoxProduct
    },
    data(){
        return{
           products:[],
        }
    },
    created(){
        this.getProductBestPrice()
    },
    methods:{
        getProductBestPrice(){
                ProductService().then(result =>{
                result.default.getProductYouMayNeed(this.$axios).then(resp =>{
                    this.products = resp.data.data
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>


</style>