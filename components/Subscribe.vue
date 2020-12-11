<template>
  <section class="container flex-row d-flex">
    <div class="subscribe">
      <p class="promo-title">THÔNG TIN KHUYẾN MÃI</p>
      <p class="describe-text mt-lg-1 mt-2 mb-3 mb-lg-3">
        Hãy Like & Nhận thông báo từ Fanpage goCASHBACK để cập nhật thông tin
        mua sắm mới nhất
      </p>
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fgocashback.vn%2F&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=839045649941677"
        width="340"
        height="130"
        style="border:none;overflow:hidden"
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
    <img
      class="d-none d-lg-block"
      alt="goCASHBACK"
      src="../assets/img/img-footer-girl.png"
    />
  </section>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.subscribe {
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 3.5rem 0;
  .promo-title {
    font-size: 1.25rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: normal;
    text-align: left;
    color: #cb0055;
  }
  .describe-text {
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.47;
    letter-spacing: normal;
    text-align: left;
    color: #333333;
  }
}
img {
  padding: 3.5rem 0;
}
@media (max-width: 576px) {
  .subscribe {
    width: 100%;
    padding: 1.5rem 0;
    .promo-title {
      font-size: 1rem;
    }
    .describe-text {
      font-size: 0.8125rem;
    }
  }
}
</style>
