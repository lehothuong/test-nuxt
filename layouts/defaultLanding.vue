<template>
  <div>
      <nuxt />
       <ModalVerify></ModalVerify>
        <ModalVerifySuccess></ModalVerifySuccess>
  </div>
</template>
<script>
import ModalVerify from "@/components/ModalVerify";
import ModalVerifySuccess from "@/components/ModalVerifySuccess";

export default {
  components: {
    ModalVerify,
    ModalVerifySuccess
  },
  data() {
    return {
      status: "",
    };
  },
  computed: {},
  watch: {
   
  },
  methods: {
   
  },
  created() {
  },
    mounted() {
    
  },
  methods: {
    handledCallApi() {
      
    },
    handleGotoTop() {
      
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
