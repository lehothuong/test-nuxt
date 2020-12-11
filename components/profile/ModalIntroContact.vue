<template>
  <div>
    <b-modal
      v-model="showListEmailData"
      @hide="hideModal"
      modal-class="commission-modal intro-modal"
      size="lg"
      header-class="commissionHeaderModal"
      content-class="commission-content"
      id="modal-lg"
      centered
    >
      <template v-slot:modal-title>
        <p
          class="font-weight-bold color-white text-uppercase fontSize14"
        >Giới thiệu bạn bè qua gmail</p>
      </template>
      <div>
        <div class="bodyHeader">
          <div v-html="introTextTop"></div>
          <div
            v-if="isShowStatus"
            class="flex-row d-flex justify-content-end align-items-center w-100"
          >
            <b-form-group label-align-sm="right" class="w-100 mb-0" label-size="sm">
              <b-input-group size="md" class="w-100">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Tìm tên hoặc email"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </div>
        </div>
        <div class="pt-2 px-3 modalTable scrollbars">
          <b-table
            :table-class="{tableLayoutFixed:!isShowStatus}"
            :selectable="isShowStatus"
            thead-class="d-none"
            tbody-class="bodyIntroTable"
      :filterIncludedFields="filterOn"
            ref="selectableTable"
            :items="listContact"
            :filter="filter"
            :fields="tableColumn"
            @row-selected="onRowSelected"
            responsive="sm"
          >
            <!-- Example scoped slot for select state illustrative purposes -->
            <template v-slot:cell(isActive)="{ rowSelected }">
              <template v-if="rowSelected">
                <img src="../../assets/img/icon/icon-checked.svg" width="16" height="16" />
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <img src="../../assets/img/icon/icon-check.svg" width="16" height="16" />
                <span class="sr-only">Not selected</span>
              </template>
            </template>
            <template v-slot:cell(status)="data">
              <p
                v-if="data.item.status === 'Gửi thành công'"
                class="textSuccess"
              >{{data.item.status}}</p>
              <p v-else class="textError">{{data.item.status}}</p>
            </template>
          </b-table>
        </div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <div v-if="isShowStatus" class="d-flex justify-content-lg-between">
            <a class="pointer selectAll mr-lg-3" size="sm" @click="selectAllRows">Chọn tất cả</a>
            <a class="pointer selectAll mr-auto" size="sm" @click="clearSelected">Bỏ chọn</a>
            <p>Đã chọn {{ amountSelect }} người bạn</p>
          </div>
          <!-- :disabled="timer>0"
              :class="{btnDisable:timer>0}"
          @click="timer ===0 ? postIntroFriend() : ''"-->
          <div v-if="isShowStatus" class="text-center customFooter mt-lg-4 mb-lg-2">
            <button
              :disabled="selected.length == 0 || timer > 0"
              title="Gửi lời mời"
              target="_blank"
              @click="timer === 0 ? postIntroFriend() : ''"
              class="btn btnBuy btnBuyActive btnGoShop font-weight-bold text-uppercase"
            >{{timer === 0 ? 'Gửi lời mời' : 'Vui lòng chờ ' + timer  }}<span v-if="timer > 0" class="text-normal">s</span></button>
          </div>
          <div v-else class="text-center customFooter mt-lg-4 mb-lg-2">
            <button
              
              title="Gửi lời mời"
              target="_blank"
              @click="showListEmailData = false"
              class="btn btnBuy btnBuyActive btnGoShop btnRemove font-weight-bold text-uppercase"
            >Đóng</button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import AccountService from "@/api/account";
export default {
  props: {
    listGmailContact: {
      type: Array,
      default: [],
    },
    showListEmail: {
      type: Boolean,
    },
    inviteUrl: {
      type: String,
    },
  },
  computed: {
    showListEmailData: {
      get() {
        return this.showListEmail;
      },
      set(newVal) {
        this.$emit("updateShowListEmail", newVal);
      },
    },
    listContact: {
      get() {
        return this.listGmailContact;
      },
      set(newVal) {
        this.$emit("updateContactListEmail", newVal);
      },
    },
    amountSelect() {
      return this.selected.length;
    },
  },
  data() {
    const lastTimestamp = parseInt(
      this.$auth.$storage.getLocalStorage("verify_code_timestamp_intro") || 0
    );
    const currentTimestamp = new Date().getTime();
    const sec = parseInt((currentTimestamp - lastTimestamp) / 1000);

    return {
      introTextTop:
        ' <p> Mời bạn bè tham gia goCashBack để cùng nhận thưởng.</p><p class="mb-lg-3">Chọn bạn bè ở danh sách bên dưới để gửi lời mời tham gia.</p>',
      selectedTrue: true,
      isShowStatus: true,
      selectedFalse: false,
      selected: [],
      filterOn:[],
      filter: null,
      verifyInterval: null,
      timer: sec > 60 ? 0 : 60 - sec,
      tableColumn: ["isActive", "name", "email"],
    };
  },
  mounted() {
    if (this.timer > 0) {
      this.verifyInterval = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.timer = 0;
          clearInterval(this.verifyInterval);
        }
      }, 1000);
    }
  },
  methods: {
    hideModal() {
      this.showListEmailData = false;
      this.isShowStatus = true;
      this.tableColumn = ["isActive", "name", "email"];
      this.introTextTop =
        ' <p> Mời bạn bè tham gia goCashBack để cùng nhận thưởng.</p><p class="mb-lg-3">Chọn bạn bè ở danh sách bên dưới để gửi lời mời tham gia.</p>';
      this.selected = [];
    },
    startCountDown() {
      const currentTimestamp = new Date().getTime();
      this.$auth.$storage.setLocalStorage(
        "verify_code_timestamp_intro",
        currentTimestamp
      );
      this.timer = 60;
      clearInterval(this.verifyInterval);
      this.verifyInterval = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.timer = 0;
          clearInterval(this.verifyInterval);
        }
      }, 1000);
    },
    postIntroFriend() {
      this.startCountDown()

      if (this.selected.length === 0) {
        this.$swal({
          icon: "error",
          title: "Vui lòng chọn email",
          showConfirmButton: false,
          timer: 700,
        });
        return false;
      }
      let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
      let listEmails = this.selected.map((m) => m.email);
      let data = {
        emails: listEmails,
        invite_url: this.inviteUrl,
      };
      AccountService.postIntroFriend(this.$axios, accountId, data)
        .then((resp) => {
          if (resp.data.status) {
            this.filter = null
            this.tableColumn = ["email", "status"];
            let success = resp.data.data.sent_success.map((m) => ({
              email: m,
              status: "Gửi thành công",
            }));
            let failed = resp.data.data.sent_failed.map((m) => ({
              email: m,
              status: "Đã tham gia goCASHBACK",
            }));
            this.listContact = [...success, ...failed];
            this.isShowStatus = false;
            this.introTextTop =
              "<p class='mb-lg-3'>Gửi thành công lời mời tham gia goCASHBACK đến " +
              resp.data.data.sent_success.length +
              " người bạn.</p>";
          }
        })
        .catch((e) => {
          let code = e.response.data.data.code;
          if (code === "002.006.003") {
            this.$swal({
              icon: "error",
              title: "Vui lòng thử lại sau!",
              showConfirmButton: false,
              timer: 700,
            });
          }
        });
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    onRowSelected(items) {
      this.selected = items;
    },
  },
};
</script>
<style lang="scss" scoped>
.btnRemove {
  border-color: #00a15a !important;
  background-color: #00a15a !important;
  &:hover {
    color: #fff !important;
  }
}
.btnGoShop {
  padding: 0.75rem 2.2rem;
}

.textSuccess {
  color: #05668d;
}

.textError {
  font-style: italic;
  color: #666666;
}

.btnDisable {
  &:hover {
    background-color: #00a896 !important;
    color: #fff !important;
  }
}
.selectAll {
  color: #05668d;
  text-decoration: underline !important;
  text-transform: uppercase;
  &:hover {
    color: #05668d;
  }
}
</style>
