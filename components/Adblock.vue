<template>
    <div>
         <b-modal
            v-model="showPopupAdblock"
            visible="true"
            title-class="titleAdblockModal"
            hide-footer
            modal-class="adblock-modals modalMobile"
            header-class="text-uppercase text-light modalHeader"
            id="modal-forgot-password"
            centered
            title="Thông tin quan trọng"
            >
                <div class="px-lg-4 pt-lg-4 pb-lg-3 text-center">
                    <img src="../assets/img/icon/adblock.png" width="281" height="79" alt="adblock">
                    <p class="font-weight-bold titleAdblock mt-lg-4">Trình duyệt của bạn đang sử dụng AdBlock</p>
                    <p class="font-weight-bold descriptionAdblock">Bạn cần tắt AdBlock để nhận được hoàn tiền từ goCashBack</p>
                   <a class="btn btnAdblock mt-lg-5" title="Hướng dẫn tắt" @click="closeAdblock()">Hướng dẫn tắt</a>
                </div>
            </b-modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
            checkAdBlock:false,
        }
    },
    methods:{
        checkAdBlockFc(v){
            this.checkAdBlock = v
        },
        closeAdblock(){
            this.$router.push('/thong-tin/huong-dan-tat-adblock')
            this.showPopupAdblock = false;
        }
    },
    computed:{
         showPopupAdblock: {
            get() {
                return this.$store.state.showPopupAdblock;
            },
            set(showPopupAdblock) {
                this.$store.commit("changePopupAdblock", showPopupAdblock);
            }
        },
    },
    mounted(){
     
    }
}
</script>
<style lang="scss" scoped>

.adblock-modals{
    
    .titleAdblock{
        font-size: 1.25rem;
    }
    .descriptionAdblock{
        font-size: 1.25rem;
        color: #ff0000;
    }
    .btnAdblock{
        padding: 0.55rem 0.75rem;
        border: solid 1px #05668D;
        background-color: #05668D;
        color: #ffffff;
        border-radius: 3px;
        font-size: 0.9375rem;
        text-transform: uppercase;
        &:hover{
            background-color: #006699;
        }
    }
}

</style>