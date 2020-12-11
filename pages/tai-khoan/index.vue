<template>
  <div class="tab-container">
    <div class="container profile pt-lg-3">
      <BannerProfile class="d-none d-lg-block"></BannerProfile>
      <div class="d-block d-lg-none">
        <div class="d-flex align-items-center mb-3">
          <p class="titleProfile mr-3">Xin chào, {{dataProfile.name}}</p>
          <a class="pointer" @click="modalLogoutPopup=true">
            <img
              src="../../assets/img/icon/icon_logout.svg"
              width="23"
              height="23"
              alt="goCASHBACK"
            />
          </a>
        </div>
      </div>
      <content-placeholders class="placeholderProfile mt-lg-3" v-show="isLoading" :rounded="true">
        <content-placeholders-text class="title" :lines="1" />
        <content-placeholders-img class="image mt-3" />
        <div class="d-none d-lg-flex justify-content-between">
          <content-placeholders-text class="title1 mt-lg-5 w-100" :lines="1" />
          <content-placeholders-text
            class="title2 mt-lg-5 w-100 d-flex justify-content-end align-items-end mb-lg-2"
            :lines="1"
          />
        </div>
        <content-placeholders-img class="image1" />
      </content-placeholders>
      <client-only>
        <div class="row">
          <div class="col-lg-3 pr-lg-2 mb-lg-0 mb-4">
            <div class="profileBoxTotalMoney">
              <div class="text-center">
                <span>Tổng tài khoản goCASHBACK</span>
                <span>
                  <img
                    v-b-tooltip.hover
                    title="Tài khoản này bao gồm số dư khả dụng, hoàn tiền tạm duyệt và thưởng tạm duyệt"
                    src="../../assets/img/icon/icon_question.svg"
                    class="ml-1"
                    width="15"
                    height="15"
                  />
                </span>
              </div>
              <p class="fontSize20 price">{{ formatPrice(totalAccountMoney) }}</p>
              <hr />
              <div class="d-flex justify-content-between">
                <div>
                  <span>Số dư khả dụng</span>
                  <span>
                    <img
                      v-b-tooltip.hover
                      title="Đây là tổng hoàn tiền và thưởng đã được xác nhận, số dư này bạn có thể chuyển về tài khoản ngân hàng. Để rút tiền, số dư này phải lớn hơn 100,000đ."
                      src="../../assets/img/icon/icon_question.svg"
                      class="ml-1"
                      width="15"
                      height="15"
                    />
                  </span>
                </div>
                <p class="priceItem">{{formatPrice($store.state.balance || 0)}}</p>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <div>
                  <span>Hoàn tiền tạm duyệt</span>
                  <span>
                    <img
                      v-b-tooltip.hover
                      title="Tổng số hoàn tiền từ những giao dịch đang chờ xử lý hoặc đã tạm duyệt. Sau khi được xác nhận, số tiền này sẽ được tự động thêm vào Số dư khả dụng)"
                      src="../../assets/img/icon/icon_question.svg"
                      class="ml-1"
                      width="15"
                      height="15"
                    />
                  </span>
                </div>
                <p class="priceItem">{{formatPrice(waitTingConfirm)}}</p>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <div>
                  <span>Thưởng tạm duyệt</span>
                  <span>
                    <img
                      v-b-tooltip.hover
                      title="Tổng số tiền thưởng từ các chương trình của goCASHBACK. Số tiền này đang đợi đủ điều kiện xác nhận theo thể lệ chương trình để được thêm vào Số dư khả dụng."
                      src="../../assets/img/icon/icon_question.svg"
                      class="ml-1"
                      width="15"
                      height="15"
                    />
                  </span>
                </div>
                <p class="priceItem">{{formatPrice(rewardWaiting)}}</p>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <div>
                  <span>Số tiền đã rút</span>
                  <span>
                    <img
                      v-b-tooltip.hover
                      title="Tổng số tiền bạn đã rút từ tài khoản goCASHBACK về tài khoản ngân hàng của bạn"
                      src="../../assets/img/icon/icon_question.svg"
                      class="ml-1"
                      width="15"
                      height="15"
                    />
                  </span>
                </div>
                <p class="priceItem">{{formatPrice(withDrawAmount)}}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-9 pl-lg-2">
            <b-tabs
              v-show="!isLoading"
              v-model="tabIndex"
              class="mt-lg-3 bg-white"
              content-class="mt-3 px-lg-3 px-10-res mb-lg-4"
            >
              <b-tab @click="handleTab(0)" title="Hoàn tiền">
                <Cashback
                  :cashback="dataCashback.summary"
                  :transactions="dataCashback.transactions"
                />
              </b-tab>
              <b-tab @click="handleTab(1)" title="Hồ sơ">
                <UserProfile :profile="{...dataProfile}" :profileCache="{...dataProfile}" />
              </b-tab>
              <b-tab @click="handleTab(2)" title="Rút tiền">
                <TransactionInfo
                  :cashback="dataCashback.summary"
                  :banks="banks"
                  :provinces="provinces"
                  :transactions="dataTransaction"
                  @hanlerChange="hanlerChange"
                />
              </b-tab>
              <b-tab @click="handleTab(3)" title="Giới thiệu">
                <IntroduceYou />
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </client-only>
    </div>
    <ModalVerifyPhone />
  </div>
</template>
<script>
import BannerProfile from "@/components/profile/BannerProfile";
import Cashback from "@/components/profile/CashBack";
import UserProfile from "@/components/profile/UserProfile";
import TransactionInfo from "@/components/profile/TransactionInfo";
import IntroduceYou from "@/components/profile/IntroduceYou";
import Subscribe from "@/components/Subscribe";
import ModalVerifyPhone from "@/components/ModalVerifyPhone";
import _ from "lodash";
const AccountService = () => import("@/api/account");

export default {
  layout: "default",
  components: {
    BannerProfile,
    Cashback,
    UserProfile,
    TransactionInfo,
    Subscribe,
    IntroduceYou,
    ModalVerifyPhone
  },
  data() {
    return {
      // dataProfile: {},
      dataCashback: {},
      totalAccountMoney: 0,
      rewardReceived: 0,
      waitTingConfirm: 0,
      withDrawAmount: 0,
      rewardWaiting: 0,
      dataTransaction: {
        balance: 0,
        withdraws: []
      },
      isChange: false,
      banks: [],
      provinces: [],
      isLoading: false
    };
  },
  computed: {
    // totalAccountMoney(){
    //   return this.formatPrice(this.dataCashback ? this.dataCashback.summary.cashback_waiting + this.dataCashback.summary.balance + this.dataCashback.summary.reward : 0)
    // },
    dataProfile() {
      let dob = this.$store.state.auth.user.date_of_birth;
      if (dob) {
        dob = new Date(dob);
      }
      let profileData = { ...this.$store.state.auth.user, date_of_birth: dob };
      return profileData;
    },

    modalLogoutPopup: {
      get() {
        return this.$store.state.modalLogout;
      },
      set(modalLogoutPopup) {
        this.$store.commit("changeLogout", true);
      }
    },
    tabIndex: {
      get() {
        return this.$store.state.tabIndexProfile;
      },
      set(tabIndex) {
        this.$store.dispatch("changeTabIndexProfile", tabIndex);
      }
    }
  },
  watch: {
    isChange: function(newVal, oldVal) {
      if (newVal) {
        this.getInfo();
      }
    }
  },
  created() {
    this.getInfo();
  },
  methods: {
    hanlerChange(val) {
      console.log(val);
      this.isChange = val;
    },
    handleTab(value) {
      this.$store.dispatch("changeTabIndexProfile", value);
    },
    getInfo() {
      this.isLoading = true;
      let accountId = this.$auth.getToken("local")
        ? this.$auth.getToken("local").id
        : undefined;
      AccountService().then(result => {
        const {
          getCashbackSummary,
          getCashbackTransactionList,
          getTransactionList,
          getBanks,
          getProvinces
        } = result.default;
        Promise.all([
          getCashbackSummary(this.$axios, accountId),
          getCashbackTransactionList(this.$axios, accountId)
        ])
          .then(res => {
            if (res.some(x => x.status != 200)) {
              throw new Error("get-cashback-error");
            }
            const [summaryRes, cashbackRes] = res;
            this.dataCashback = {
              summary: summaryRes.data.data,
              transactions: cashbackRes.data.data
            };
            this.totalAccountMoney =
              this.dataCashback.summary.cashback_waiting +
              this.dataCashback.summary.reward_waiting +
              this.dataCashback.summary.balance;
            this.waitTingConfirm = this.dataCashback.summary.cashback_waiting;
            this.withDrawAmount = this.dataCashback.summary.withdraw_amount;
            this.rewardWaiting = this.dataCashback.summary.reward_waiting;
            this.isLoading = false;
          })
          .catch(e => console.log(e));
        Promise.all([
          getBanks(this.$axios),
          getProvinces(this.$axios),
          getTransactionList(this.$axios, accountId)
        ])
          .then(res => {
            if (res.some(x => x.status != 200)) {
              throw new Error("get-bank-error");
            }
            const [banksRes, provincesRes, transactionRes] = res;
            this.banks = banksRes.data;
            this.provinces = provincesRes.data;
            this.dataTransaction = transactionRes.data;
            this.isLoading = false;
          })
          .catch(e => console.log(e));
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.profileBoxTotalMoney {
  background-color: white;
  border-radius: 5px;
  margin-top: 1rem;
  padding: 1rem 0.75rem 1rem 0.75rem;
  .price {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 1.25rem;
    color: #05668d;
    font-weight: bold;
  }
  hr {
    margin-top: 0.75rem;
  }
  .priceItem {
    font-weight: bold;
    font-size: 15px;
  }
}
.tab-container {
  background-color: #f8f8f8;
  padding-bottom: 4rem;
}
</style>
