<template>
  <div class="position-relative">
    <div class="subscribe-container">
      <Subscribe></Subscribe>
    </div>
    <footer>
      <div class="container">
        <div class="row menu-footer justify-content-between">
          <div class="col-lg-5">
            <nuxt-link to="/">
              <img
                alt="goCASHBACK"
                width="184"
                height="28"
                class="mb-lg-3"
                src="../assets/img/logo.png"
              />
            </nuxt-link>
            <h6
              class="text-uppercase font-weight-500 mb-lg-1"
            >Công ty Cổ Phần Thương Mại Công Nghệ Hồng Kỳ</h6>
            <p class="mb-lg-1">Địa chỉ: Số 43R8 Hồ Văn Huê, P.9, Q. Phú Nhuận, TP Hồ Chí Minh.</p>
            <div class="mb-lg-1">
              <span>Điện thoại : 0964.130.030 | E-mail: hotro@hongkytech.com</span>
            </div>
            <p class="mb-lg-1">Giấy phép kinh doanh số : 0315939788</p>
            <p class="mb-lg-3">Cấp ngày : 04/10/2019 bởi Sở Kế Hoạch và Đầu Tư TP.Hồ Chí Minh</p>
            <a target="_blank" href="http://online.gov.vn/Home/WebDetails/69491">
              <img src="https://s3-ap-southeast-1.amazonaws.com/gocashback.vn/resources/images/logoSaleNoti.png" width="150" class="heightAuto" />
            </a>
            <div class="d-flex mt-lg-3">
              <!-- <a
                title="facebook"
                class="mr-3"
                target="_blank"
                href="https://www.facebook.com/gocashback.vn/"
              >
                <img
                  alt="facebook"
                  src="../assets/img/icon/icon_facebook_footer.svg"
                  width="20"
                  height="20"
                />
              </a>
              <a
                title="email"
                class="mr-3"
                target="_blank"
                href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=support@gocashback.vn&su=Yêu%20cầu%20hỗ%20trợ"
              >
                <img
                  alt="email"
                  src="../assets/img/icon/email.svg"
                  width="20"
                  height="20"
                />
              </a> -->
              <!-- <nuxt-link class="mr-3" to="/">
                <img
                  alt="youtube"
                  src="../assets/img/icon/icon_youtube_footer.svg"
                  width="20"
                  height="20"
                />
              </nuxt-link>
              <nuxt-link class="mr-lg-3" to="/">
                <img
                  alt="twitter"
                  src="../assets/img/icon/icon_twitter_footer.svg"
                  width="20"
                  height="20"
                />
              </nuxt-link>-->
            </div>
          </div>
          <!-- <div class="col-lg-3 ">
            <h6 class="text-uppercase font-weight-bold mb-lg-3">Giới thiệu</h6>
            <div
              v-for="article of $store.state.footer"
              v-bind:key="article.tag"
            >
              <nuxt-link
                :to="'/gioi-thieu/'+article.tag"
              >
                <p class="mb-lg-2 text-light">{{ article.title }}</p>
              </nuxt-link>
            </div>
          </div>-->
          <div class="col-lg-2">
            <h6 class="text-uppercase font-weight-bold mb-lg-3">Thông tin</h6>
            <div v-for="item of $store.state.typeSecond" v-bind:key="item.tag">
              <nuxt-link :to="'/thong-tin/'+item.tag">
                <p class="mb-lg-2 text-light" v-show="item.tag">{{ item.title }}</p>
              </nuxt-link>
            </div>
          </div>
          <div class="col-lg-3">
            <h6 class="text-uppercase font-weight-bold mb-lg-3">Hỗ trợ</h6>
            <div key="fb_support">
              <a href="https://www.facebook.com/gocashback.vn/" target="_blank">
                <p class="mb-lg-2 text-light">
                  <img
                    alt="Hỗ trợ facebook"
                    src="../assets/img/icon/icon_support_fb.svg"
                    width="19"
                    height="19"
                    style="margin-top: -3px; margin-right: 5px"
                  />
                  goCASHBACK.vn
                </p>
              </a>
            </div>
            <div key="gg_support">
              <a
                href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=support@gocashback.vn&su=Yêu%20cầu%20hỗ%20trợ"
                target="_blank"
              >
                <p class="mb-lg-2 text-light">
                  <img
                    alt="Hỗ trợ gmail"
                    src="../assets/img/icon/icon_support_email.svg"
                    width="19"
                    height="19"
                    style="margin-top: -3px; margin-right: 5px"
                  />
                  support@goCASHBACK.vn
                </p>
              </a>
            </div>
          </div>
          <div class="col-lg-2">
            <h6 class="text-uppercase font-weight-bold mb-lg-3">Tải ứng dụng</h6>
            <a
              title="Tải ứng dụng trên IOS"
              target="_blank"
              href="https://apps.apple.com/vn/app/gocashback/id1508702789"
              class="pointer mb-lg-2 d-block downloadAppStore"
            >
              <img
                alt="goCASHBACK"
                src="https://d604u3cjqmj8m.cloudfront.net/resources/images/btn-ios-store.png"
                width="132"
                height="45"
              />
              <div class="qrcodeStore">
                <img
                  src="https://d604u3cjqmj8m.cloudfront.net/resources/images/qrcodeiOS.png"
                  width="200"
                  height="200"
                  alt="goCASHBACK"
                />
              </div>
            </a>
            <a
              title="Tải ứng dụng trên Android"
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.hongkytech.gocashback&hl=vi"
              class="pointer d-block downloadAppAndroid"
            >
              <img
                alt="goCASHBACK"
                src="https://d604u3cjqmj8m.cloudfront.net/resources/images/btn-adr-store.png"
                width="132"
                height="45"
              />
              <div class="qrcodeAndroid">
                <img
                  src="https://d604u3cjqmj8m.cloudfront.net/resources/images/qrcodeAndroid.png"
                  width="200"
                  height="200"
                  alt="goCASHBACK"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import Subscribe from "../components/Subscribe";
export default {
  components: {
    Subscribe
  },
  methods: {
    setSelectedFooterArticle(article) {
      // this.$store.commit('changeArticleText',article.title)
      // this.$store.commit("setSelectedFooterArticle", article.tag);
    }
  }
};
</script>
<style lang="scss" scoped>
footer {
  padding: 3rem 0 2rem 0;
  background-color: #cb0055;
  color: #fcfcfc;
  .font-weight-500 {
    font-weight: 500;
  }
}

.qrcodeStore {
  display: none;
}

.qrcodeAndroid {
  display: none;
}

.downloadAppStore {
  &:hover {
    .qrcodeStore {
      display: block;
      position: absolute;
      top: -112px;
      left: -208px;
      img {
        padding: 2rem;
        background-color: #fff;
        border-radius: 5px;
      }
      &::after {
        content: "";
        border: 15px transparent solid;
        border-bottom-color: transparent;
        border-left-color: #fff;
        right: auto;
        top: 50%;
        transform: translate(100%, -184%);
        display: block;
      }
    }
  }
}

.downloadAppAndroid {
  &:hover {
    .qrcodeAndroid {
      display: block;
      position: absolute;
      top: -56px;
      left: -208px;
      img {
        padding: 2rem;
        background-color: #fff;
        border-radius: 5px;
      }
      &::after {
        content: "";
        border: 15px transparent solid;
        border-bottom-color: transparent;
        border-left-color: #fff;
        right: auto;
        top: 50%;
        transform: translate(100%, -184%);
        display: block;
      }
    }
  }
}

.subscribe-container {
  background-color: #ff599a20;
}
.menu-footer {
  a {
    transition: 0.3s all;
    &:hover {
      color: #fff;
      text-decoration: underline !important;
    }
  }
}
</style>
