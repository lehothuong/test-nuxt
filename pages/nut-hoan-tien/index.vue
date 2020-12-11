<template>
  <div class="bgFade">
    <div class="container">
      <div class="extension">
        <div class="row">
          <div class="col-lg-8">
            <h3 class="titleColor">Nút hoàn tiền goCASHBACK</h3>
            <p class="mb-lg-4">
              <span class="font-weight-bold">Nút hoàn tiền goCASHBACK</span> là
              tiện ích mở rộng trên trình duyệt, giúp cho người dùng biết trước
              đơn hàng của mình có được ghi nhận hoàn tiền hay không và kích
              hoạt hoàn tiền ngay tại website đang xem mà không cần phải truy
              cập vào website <span class="font-weight-bold">goCASHBACK.</span>
            </p>
            <p>
              <span class="font-weight-bold">Nút hoàn tiền goCASHBACK</span> đã
              được Google và Mozilla kiểm duyệt gắt gao trước khi được cho phép
              đưa lên kho ứng dụng mở rộng dành cho Chrome, Cốc Cốc, Opera và
              Firefox.
            </p>
            <div class="mt-4 pt-3">
                <b-button type="submit" class="btn btnCashback bgGreen rounded">Cài đặt ngay</b-button>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="extensionImageRight">
              <img
                src="../../assets/img/chrome.png"
                width="312"
                height="425"
                class="contentObFix"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bgGreen {
  background-color: #00a896;
}
.titleColor {
  color: #05668d;
  margin-bottom: 1.25rem;
}
.bgFade {
  background-color: #f8f8f8;
  position: relative;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  border-radius: 5px;
  //   top: -3px;
}
.col-lg-4{
    position:inherit;
}
.extension {
  background-color: #fff;
  padding: 36px 2.25rem;
  position: relative;
  overflow: hidden;
}
.extensionImageRight {
  position: absolute;
  top: -72px;
  right: -92px;
}
</style>
