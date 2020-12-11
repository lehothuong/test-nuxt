<template>
  <div>
    <div class="introduce">
      <div class="rowMobile">
        <div class="row mt-lg-5">
          <div class="col-lg-4 colMobile">
            <div class="d-flex justify-content-center align-items-center">
              <div class="introduceIconStep step-1">
                <img width="18" height="21" src="../../assets/img/icon/icon_raf_step1.svg" />
              </div>
            </div>
          </div>
          <div class="col-lg-4 colMobile">
            <div class="d-flex justify-content-center align-items-center">
              <div class="introduceIconStep step-2">
                <img width="23" height="20" src="../../assets/img/icon/icon_raf_step2.svg" />
              </div>
            </div>
          </div>
          <div class="col-lg-4 colMobile">
            <div class="d-flex justify-content-center align-items-center">
              <div class="introduceIconStep">
                <img width="24" height="24" src="../../assets/img/icon/icon_raf_step3.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-lg-4">
          <div class="col-lg-4 colMobile">
            <p class="d-none d-lg-block text-lg-center text-uppercase font-weight-bold mb-2">Bước 1</p>
            <p class="text-lg-center">Chia sẻ link giới thiệu bên dưới đến bạn bè!</p>
          </div>
          <div class="col-lg-4 colMobile">
            <p class="d-none d-lg-block text-lg-center text-uppercase font-weight-bold mb-2">Bước 2</p>
            <p class="text-lg-center">
              <span class="d-lg-block">Bạn của bạn đăng ký, xác minh và mua hàng</span>
              <span class="d-lg-block">thành công qua hệ thống goCASHBACK</span>
            </p>
          </div>
          <div class="col-lg-4 colMobile">
            <p class="d-none d-lg-block text-lg-center text-uppercase font-weight-bold mb-2">Bước 3</p>
            <p class="text-lg-center">
              <span class="d-lg-block">Bạn và bạn của bạn được thưởng</span>
              <span class="d-lg-block">50.000₫ khi bạn bè của bạn mua</span>
              <span class="d-lg-block">sắm qua goCASHBACK thành công!</span>
            </p>
          </div>
        </div>
      </div>
      <div class="row mt-lg-4 pb-lg-5 pb-3">
        <div class="col-lg-2 pr-lg-2 mb-3 mb-lg-0">
          <p class="mb-1 font-weight-bold text-truncate">Mã giới thiệu</p>
          <div @click="clipBoardCode" class="codeIntro position-relative">
            <input
              autofocus
              ref="verifyCode"
              v-model="inviteCode"
              disabled
              class="form-control pointer"
            />
            <div class="btnIntro pointer">
              <img v-if="isTick" width="14" height="16" src="../../assets/img/icon/icon_copy.svg" />
              <img v-else width="14" height="16" src="../../assets/img/icon/tick.svg" />
            </div>
          </div>
        </div>
        <div class="col-lg-4 px-lg-2">
          <p class="mb-1 font-weight-bold">Link giới thiệu</p>
          <div class="d-lg-flex">
            <div
              @click.prevent="clipBoardUrl"
              class="codeIntro linkIntro mb-3 mb-lg-0 position-relative"
            >
              <input
                disabled
                v-model="inviteUrl"
                ref="verifyUrl"
                class="form-control pointer"
                trim
                data-vv-as="Mã xác nhận"
              />
              <div type="submit" class="btnIntro pointer">
                <img
                  v-if="isTickLink"
                  width="14"
                  height="16"
                  src="../../assets/img/icon/icon_copy.svg"
                />
                <img v-else width="14" height="16" src="../../assets/img/icon/tick.svg" />
              </div>
            </div>
            <!-- <div class="d-lg-flex">
            <p class="mb-1 d-block d-lg-none font-weight-xs-bold">
              Giới thiệu qua
            </p>
            <div class="d-flex flex-wrap">
              <div class="colIntroSocial">
                <a class="linkIntro pointer">
                  <img
                    width="16"
                    height="16"
                    src="../../assets/img/icon/icon_facebook_footer.svg"
                  />
                </a>
              </div>
              <div class="colIntroSocial">
                <a class="linkIntro linkGmail pointer">
                  <img
                    width="16"
                    height="16"
                    src="../../assets/img/icon/gmail.svg"
                  />
                </a>
              </div>
            </div>
            </div>-->
          </div>
        </div>
        <div class="col-lg-3 col-12 d-flex align-items-lg-end px-lg-2 mb-lg-0 mb-2">
          <div class="d-none d-lg-block colIntroSocial w-100">
            <social-sharing
              :url="inviteUrl"
              inline-template
              title="Vui mua sắm nhận hoàn tiền"
              description="Mua sắm & nhận hoàn tiền với 3 bước đơn giản. Hãy là người tiêu dùng thông minh."
            >
              <div>
                <network network="facebook">
                  <a class="linkIntro linkFacebook pointer p-2">
                    <img
                      width="18"
                      height="18"
                      src="../../assets/img/icon/icon_facebook_footer.svg"
                    />
                    <span class="color-white ml-4">Mời bạn facebook</span>
                  </a>
                </network>
              </div>
            </social-sharing>
          </div>
        </div>
        <!-- <div class="col-lg-3 col-12 d-flex align-items-lg-end pl-lg-2 mb-lg-0 mb-2">
          <div class="colIntroSocial w-100">
            <a @click="auth" class="linkIntro linkGmail pointer p-2">
              <img width="18" height="18" src="../../assets/img/icon/icon_google.svg" />
              <span
                class=" color-black-1 ml-4"
              >Mời bạn Google</span>
            </a>
          </div>
        </div>-->
      </div>
      <!-- v-if="items.length > 0"  -->
      <div class="pb-lg-5 pb-1">
        <h5 class="titleHot titleChildColor titleChild mb-lg-2 mb-3">Danh sách bạn đã giới thiệu</h5>
        <b-table
          id="transaction-table"
          stacked="sm"
          table-class="introTable"
          :per-page="recordPerPageAmount"
          :current-page="currentPage"
          no-border-collapse
          :items="accounts"
          :fields="tableColumn"
        >
          <template v-if="accounts && accounts.length === 0" v-slot:table-caption>
            <p class="text-center">Chưa có dữ liệu</p>
          </template>
          <template v-slot:cell(index)="data">{{ data.index + 1 }}</template>
          <template v-slot:cell(phone)="data">
            <span>******</span>
            {{
            data.item.phone
            }}
          </template>
          <template v-slot:cell(created_at)="data">
            {{
            getTimeZone(data.item.created_at)
            }}
          </template>
          <template v-slot:cell(reward)="data">
            {{
            formatPrice(data.item.reward)
            }}
          </template>
          <template v-slot:cell(referral_status)="data">
            <div
              class="itemReferralStatusWaiting d-flex align-items-center"
              v-if="data.item.referral_status === 0"
            >
              <p class>Đang chờ</p>
              <img
                v-b-tooltip.bottom="{
                  ...options,
                  customClass: 'my-tooltip-class-bottom'
                }"
                src="../../assets/img/icon/icon_info.svg"
                width="16"
                height="16"
              />
            </div>
            <div class="itemReferralStatusSuccess d-flex align-items-center" v-else>
              <p class>Thành công</p>
              <img
                v-b-tooltip.top="{ customClass: 'my-tooltip-class-top' }"
                title="Bạn đã hoàn thành việc mời bạn bè. Tiền thưởng đã được cộng vào số dư của bạn."
                src="../../assets/img/icon/icon_info.svg"
                width="16"
                height="16"
              />
            </div>
          </template>
        </b-table>
        <div
          v-if="total > 10"
          class="align-items-center d-lg-flex text-center mt-lg-0 mt-3 borderTopMobileTransaction pt-lg-0 pt-2"
        >
          <b-pagination
            class="custom-pagination paginationCashback m-0 ml-auto"
            v-model="currentPage"
            :total-rows="total"
            :per-page="recordPerPageAmount"
            size="sm"
            last-number
            first-number
            aria-controls="transaction-table"
          />
        </div>
      </div>
    </div>
    <ModalIntroContact
      @updateContactListEmail="updateContactListEmail"
      :inviteUrl="inviteUrl"
      :listGmailContact="listGmailContact"
      :showListEmail="showListEmail"
      @updateShowListEmail="updateShowListEmail"
    ></ModalIntroContact>
  </div>
</template>
<script>
import AccountService from "@/api/account";
import ModalIntroContact from "@/components/profile/ModalIntroContact";
export default {
  components: {
    ModalIntroContact,
  },
  data() {
    return {
      recordPerPageAmount: "10",
      currentPage: 1,
      inviteUrl: "",
      isDomainApp: false,
      inviteCode: "",
      isTick: true,
      isTickLink: true,
      inputCode: undefined,
      accounts: [],
      listGmailContact: [],
      showListEmail: false,
      total: 0,
      options: {
        title:
          'Bạn của bạn đã hoàn tất việc đăng ký, hãy nhắc bạn của mình mua sắm với goCASHBACK để cả 2 cùng nhận thưởng nhé. <a href="/" target="_blank" style="color: #ffffff;text-decoration: underline !important;" class="findLink">Tìm hiểu</a>',
        html: true,
      },
      tableColumn: [
        {
          key: "index",
          label: "#",
          sortable: true,
        },
        {
          key: "name",
          label: "Tên",
          sortable: true,
        },
        {
          key: "phone",
          label: "Số điện thoại",
          sortable: true,
        },
        {
          key: "created_at",
          label: "Thời gian",
          sortable: true,
        },
        {
          key: "reward",
          label: "Cashback",
          sortable: true,
        },
        {
          key: "referral_status",
          label: "Trạng thoái",
          sortable: true,
        },
      ],
    };
  },
  created() {
    if (window.location.hostname == "app.gocashback.vn") {
      this.isDomainApp = true;
    }
    this.getAccountReferrals();
  },
  mounted() {},
  methods: {
    clipBoardCode() {
      this.isTick = false;
      this.selectText(this.$refs.verifyCode);
      setTimeout(() => {
        this.isTick = true;
      }, 5000);
      document.execCommand("copy");
    },
    clipBoardUrl() {
      this.isTickLink = false;
      this.selectText(this.$refs.verifyUrl);
      setTimeout(() => {
        this.isTickLink = true;
      }, 5000);
      document.execCommand("copy");
    },
    selectText(element) {
      var range;
      if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    },
    onFiltered(filteredItems) {
      this.total = filteredItems.length;
      this.currentPage = 1;
    },
    getAccountReferrals() {
     let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
      AccountService.getAccountReferrals(this.$axios, accountId).then(
        (resp) => {
          if (resp.data.status) {
            this.inviteUrl = this.isDomainApp
              ? "https://gocashback.vn" + resp.data.data.invite_url
              : window.location.origin + resp.data.data.invite_url;
            this.inviteCode = resp.data.data.invite_code;
            this.accounts = resp.data.data.accounts;
            this.total = this.accounts.length;
          }
        }
      );
    },
    auth() {
      gapi.client.setApiKey("AIzaSyCB07Bmg8GtxFzwMVcR8hNFpaVqSliBJU8");
      window.setTimeout(this.authorize);
    },
    authorize() {
      var config = {
        client_id:
          "264926724995-tgagfba4p6auiv0ril43fgd4frn3sigu.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/contacts.readonly",
      };
      gapi.auth.authorize(
        { client_id: config.client_id, scope: config.scope, immediate: false },
        this.fetch
      );
      // gapi.auth.authorize(
      //   { client_id: clientId, scope: scopes, immediate: false },
      //   handleAuthorization
      // );
    },
    fetch(authorizationResult) {
      this.$axios
        .get(
          `https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=${authorizationResult.access_token}&max-results=500&v=3.0`,
          {
            headers: {
              Authorization: "Bearer " + authorizationResult.access_token, //the token is a variable which holds the token
            },
          }
        )
        .then((resp) => {
          let listFilterGmail = resp.data.feed.entry.filter((f) => f.gd$email);
          this.listGmailContact = listFilterGmail.map((m) => ({
            isActive: false,
            name: m.gd$name ? m.gd$name.gd$fullName.$t : "",
            email: m.gd$email[0].address,
          }));
          this.showListEmail = true;
        });
    },
    updateShowListEmail(val) {
      this.showListEmail = val;
    },
    updateContactListEmail(val) {
      this.listGmailContact = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.itemReferralStatusWaiting {
  p {
    font-weight: bold;
    color: #ff771c;
    text-transform: uppercase;
  }
  img {
    margin-left: 0.75rem;
  }
}

.itemReferralStatusSuccess {
  p {
    font-weight: bold;
    color: #00a15a;
    text-transform: uppercase;
  }
  img {
    margin-left: 0.75rem;
  }
}
.btnIntro {
  position: absolute;
  right: 0;
  background-color: transparent;
  font-size: 0.9375rem;
  height: 40px;
  border-color: transparent !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.introduce {
  .codeIntro {
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      border-right: none;
      height: 40px;
      border: solid 1px #d0d0d0;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      padding-right: 2.5rem;
    }
    &.linkIntro {
      width: 400px;
    }
  }

  .introduceIconStep {
    width: 64px;
    height: 64px;
    background-color: #00a896;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &.step-1 {
      &::after {
        content: "";
        height: 4px;
        background-color: #00a896;
        position: absolute;
        width: 305px;
        left: 64px;
      }
    }
    &.step-2 {
      &::after {
        content: "";
        height: 4px;
        background-color: #00a896;
        position: absolute;
        width: 215px;
        left: 64px;
      }
    }
  }
  p {
    font-size: 0.9375rem;
  }
}

@media (max-width: 576px) {
  .rowMobile {
    margin-top: 1.5rem;
    display: flex;
    flex-wrap: nowrap;
    .row:first-child {
      flex: 0 0 22%;
      max-width: 22%;
      margin: 0;
      .colMobile {
        margin-bottom: 40px;
        padding: 0;
        .step-1 {
          &::after {
            height: 40px;
            bottom: -40px;
            width: 4px;
            left: 31px;
          }
        }
        .step-2 {
          &::after {
            height: 40px;
            bottom: -40px;
            width: 4px;
            left: 31px;
          }
        }
      }
    }
    .row:last-child {
      flex: 0 0 78%;
      max-width: 78%;
      margin: 0;
      margin-left: 0.5rem;
      .colMobile {
        display: flex;
        align-items: center;
        height: 64px;
      }
    }
  }
  .linkIntro {
    justify-content: left;
    margin-left: 0;
  }

  .btnIntro {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .btnIntro img {
    margin-right: 0;
  }
  .introduce .codeIntro.linkIntro {
    width: 100%;
  }
  .colIntroSocial {
    // flex: 0 0 50%;
    // max-width: 0 0 50%;
    .linkIntro {
      width: 100%;
    }
  }
}
</style>
