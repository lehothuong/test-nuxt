<template>
  <div class="container-res">
    <div class="profileBoxBgLightBlue">
      <!-- <div class="row mb-lg-5 mb-4">
        <div class="col-lg-3 col-12 px-lg-0 py-lg-3 mt-lg-0 pt-2 mt-1">
          <div class="profileBox">
            <span class="profileBoxTitle d-flex align-items-center justify-content-center">
              Hoàn tiền tạm duyệt
              <img
                v-b-tooltip.hover
                title="Tổng số hoàn tiền từ các giao dịch còn đang trong quá trình xử lý. Sau khi các giao dịch được ghi nhận, số tiền này sẽ tự động được thêm vào số dư."
                src="../../assets/img/icon/icon_info.svg"
                class="ml-2"
                width="15"
                height="15"
              />
            </span>
            <span class="profileBoxPrice blueText">
              {{
              formatPrice(cashback ? cashback.cashback_waiting : 0)
              }}
            </span>
          </div>
        </div>
        <div class="col-lg-3 col-12 px-lg-0 py-lg-3 mt-lg-0 pt-2 mt-1">
          <div class="profileBox">
            <span class="profileBoxTitle d-block">
              Thưởng đang chờ
              <img
                class="ml-2"
                src="../../assets/img/icon/icon_info.svg"
                width="15"
                height="15"
              />
            </span>
            <span class="profileBoxPrice blueText">
              {{
              formatPrice(cashback ? cashback.reward_waiting: 0)
              }}
            </span>
          </div>
        </div>
        <div class="col-lg-3 col-12 px-lg-0 py-lg-3 mt-lg-0 pt-2 mt-1">
          <div class="profileBox">
            <span class="profileBoxTitle d-block">
              Thưởng đã nhận
              <img
                class="ml-2"
                src="../../assets/img/icon/icon_info.svg"
                width="15"
                height="15"
              />
            </span>
            <span class="profileBoxPrice greenText">
              {{
              formatPrice(cashback ? cashback.reward : 0)
              }}
            </span>
          </div>
        </div>
        <div class="col-lg-3 col-12 px-lg-0 py-lg-3 mt-lg-0 pt-2 mt-1 pb-2">
          <div class="profileBox">
            <span class="profileBoxTitle d-block">
              Số dư
              <img
                v-b-tooltip.hover
                class="ml-2"
                title="Là só dư hiện có mà bạn có thể rút về tài khoản ngân hàng. Để rút tiền, số dư này phải nhiều hơn mức quy định tối thiểu."
                src="../../assets/img/icon/icon_info.svg"
                width="15"
                height="15"
              />
            </span>
            <span class="profileBoxPrice greenText mb-lg-1">
              {{
              formatPrice($store.state.balance || 0)
              }}
            </span>
          </div>
        </div>
      </div> -->
    </div>
    <div class="pt-lg-2 pt-2">
      <span class="historyText text-uppercase font-weight-bold">Lịch sử giao dịch</span>
      <div class="d-none d-lg-block">
        <div
          v-show="total>0"
          class="w-100 d-flex flex-row justify-content-between align-items-center my-lg-2"
        >
          <div class="dropdown-record-amount">
            <div class="align-items-center d-flex text-nowrap">
              <span>Hiển thị</span>
            </div>
            <b-dropdown
              id="dropdown-1"
              v-bind:text="recordPerPageAmount"
              v-model="recordPerPageAmount"
              class="mx-lg-2"
            >
              <b-dropdown-item
                v-for="(option, index) in recordOptions"
                :key="index"
                :value="option"
                @click="handledRecord(option)"
              >{{ option }}</b-dropdown-item>
            </b-dropdown>
            <div class="align-items-center d-flex text-nowrap">
              <span>đơn</span>
            </div>
          </div>
          <div class="flex-row d-flex justify-content-end align-items-center">
            <span class="mr-lg-2">Tìm kiếm</span>
            <b-form-group label-align-sm="right" label-size="sm" class="mb-0">
              <b-input-group size="md">
                <b-form-input
                  autocomplete="off"
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Nhập nôi dung"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </div>
        </div>
      </div>
      <div class="mt-lg-0 mt-1">
        <b-table
          id="transaction-table"
          stacked="sm"
          :per-page="recordPerPageAmount"
          :current-page="currentPage"
          no-border-collapse
          :items="transactions"
          :fields="tableColumn"
          :filter="filter"
          @filtered="onFiltered"
        >
          <template v-if="transactions && transactions.length === 0" v-slot:table-caption><p class="text-center">Chưa có dữ liệu</p></template>
          <template v-slot:cell(order_id)="data">
            <a
              class="pointer order-id-text  font-weight-bold"
              @click="showHistoryDetail(data.index)"
            >{{data.item.order_id}}</a>
          </template>
          <template v-slot:cell(cashback_money)="data">{{ formatPrice(data.item.cashback_money) }}</template>
          <template
            v-slot:cell(total_bought_amount)="data"
          >{{ formatPrice(data.item.total_bought_amount)}}</template>
          <template v-slot:cell(bought_at)="data">{{ getTimeZone(data.item.bought_at)}}</template>
          <template v-slot:cell(approve_date)="data">{{ getTimeZone(data.item.approve_date).split(' ')[1] || ''}}</template>
          <template v-slot:cell(status)="data">
            <div class="d-flex flex-row justify-content-around w-100">
              <div
                class="pending-circle history-status-circle"
                v-b-tooltip.hover
                title="Đơn hàng đã được xác thực thanh toán và nhận hàng"
              >{{data.item.order_pending}}</div>
              <div
                class="approve-circle history-status-circle"
                v-b-tooltip.hover
                title="Đơn hàng đã được ghi nhận hoàn tiền"
              >{{data.item.order_success}}</div>
              <div
                class="success-circle history-status-circle"
                v-b-tooltip.hover
                title="Đơn hàng được hoàn tiền thành công bởi nhà bán hàng"
              >{{data.item.order_complete}}</div>
              <div
                class="failed-circle history-status-circle"
                v-b-tooltip.hover
                title="Đơn hàng không được hoàn tiền bởi nhà bán hàng"
              >{{data.item.order_reject}}</div>
            </div>
          </template>
        </b-table>
      </div>

      <div v-show="total>0">
        <div class="align-items-center d-lg-flex text-center mt-lg-0 mt-3">
          <span>
            Hiển thị {{ (currentPage - 1) * recordPerPageAmount + (total>0?1:0) }} tới
            {{
            currentPage * recordPerPageAmount >= total
            ? total
            : currentPage * recordPerPageAmount
            }}
            của {{ total }} đơn hàng
          </span>
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
      <div class="cashback-footer my-lg-4 py-lg-3 pt-4">
         <div class="mt-lg-0 mt-2">
            <span class="status-text pending d-lg-inline-block d-block">ĐANG XỬ LÝ</span>
            <span class="status-text">Đơn hàng đã được xác thực thanh toán và nhận hàng</span>
          </div>
          <div class="mt-lg-0 mt-2">
            <span class="status-text approve d-lg-inline-block d-block">TẠM DUYỆT</span>
            <span class="status-text">Đơn hàng đã được ghi nhận hoàn tiền</span>
          </div>
          <div class="mt-lg-0 mt-2">
            <span class="status-text success d-lg-inline-block d-block">THÀNH CÔNG</span>
            <span class="status-text">Đơn hàng được hoàn tiền thành công bởi nhà bán hàng</span>
          </div>
          <div class="mt-lg-0 mt-2">
            <span class="status-text failed d-lg-inline-block d-block">KHÔNG THÀNH CÔNG</span>
            <span class="status-text">Đơn hàng không được hoàn tiền bởi nhà bán hàng</span>
          </div>
        </div>
    </div>
    <b-modal
      v-model="showDetailModal"
      modal-class="shop-trans-detail-modal"
      title="chi tiết giao dịch"
      hide-footer
      id="modal-center"
      centered
    >
      <div class="d-flex order-container">
        <div class="w-100">
          <div class="row my-lg-1">
            <div class="col-lg-6 col-12">
              <div class="row my-1">
                <div class="col-lg-4 col-5">Thời gian</div>
                <div
                  class="col-lg-8 col-7 font-weight-bold"
                >{{getTimeZone(selectedHistory.bought_at)}}</div>
              </div>
              <div class="border-bottom" />
            </div>
            <div class="col-lg-6 col-12">
              <div class="row my-1">
                <div class="col-lg-4 col-5">Giá trị đơn hàng</div>
                <div
                  class="col-lg-8 col-7 font-weight-bold"
                >{{formatPrice(selectedHistory.total_bought_amount)}}</div>
              </div>
              <div class="border-bottom" />
            </div>
          </div>
          <div class="row my-lg-1">
            <div class="col-lg-6 col-12">
              <div class="row my-1">
                <div class="col-lg-4 col-5">Mã giao dịch</div>
                <div class="col-lg-8 col-7 font-weight-bold">{{selectedHistory.order_id}}</div>
              </div>
              <div class="border-bottom" />
            </div>
            <div class="col-lg-6 col-12">
              <div class="row my-1">
                <div class="col-lg-4 col-5">Hoàn tiền</div>
                <div
                  class="col-lg-8 col-7 font-weight-bold"
                >{{formatPrice(selectedHistory.cashback_money)}}</div>
              </div>
              <div class="border-bottom" />
            </div>
          </div>
          <div class="row my-lg-1">
            <div class="col-lg-6 col-12">
              <div class="row my-1">
                <div class="col-lg-4 col-5">Sàn</div>
                <div class="col-lg-8 col-7 font-weight-bold">{{selectedHistory.vendor}}</div>
              </div>
              <div class="border-bottom" />
            </div>
            <div class="col-lg-6 col-12">
              <div class="row my-1">
                <div class="col-lg-4 col-5">Dự kiến duyệt</div>
                <div
                  class="col-lg-8 col-7 font-weight-bold"
                >{{getTimeZone(selectedHistory.approve_date) || ''}}</div>
              </div>
              <div class="border-bottom" />
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto mt-lg-0 mt-4 pt-lg-0 pt-3">
        <h5
          class="titleHot titleChildColor titleChild mb-lg-2 mb-2"
        >Chi tiết đơn hàng</h5>
        <b-table
          id="transaction-table"
          stacked="sm"
          :per-page="5"
          :current-page="detailCurrentPage"
          no-border-collapse
          :items="selectedHistory.details"
          :fields="tableDetailColumn"
        >
          <template v-if="!selectedHistory && selectedHistory.details.length === 0" v-slot:table-caption><p class="text-center">Chưa có dữ liệu</p></template>
          <template v-slot:cell(id)="data">
            <p>{{data.index + 1}}</p>
          </template>
          <template v-slot:cell(product_name)="data">
            <a
              class="pointer order-id-text"
              @click="openUrl(data.item.product_url)"
            >{{data.item.product_name}}</a>
          </template>
          <template v-slot:cell(product_price)="data">{{ formatPrice(data.item.product_price) }}</template>
          <template v-slot:cell(rate_out)="data">{{ toPercent(data.item.rate_out) }}%</template>
          <template v-slot:cell(actual_amount)="data">{{ formatPrice(data.item.actual_amount) }}</template>
          <template v-slot:cell(status)="data">
            <span
              class="status-text"
              :class="statusDisplays(data.item.status).class"
            >{{ statusDisplays(data.item.status).text }}</span>
          </template>
        </b-table>
      </div>
      <div>
        <div class="align-items-center d-lg-flex text-center mt-lg-0 mt-3">
          <span>
            Hiển thị {{ (detailCurrentPage - 1) * 5 + (detailTotal>0?1:0) }} tới
            {{
            detailCurrentPage * 5 >= detailTotal
            ? detailTotal
            : detailCurrentPage * 5
            }}
            của {{ detailTotal }} đơn hàng
          </span>
          <b-pagination
            class="custom-pagination paginationCashback m-0 ml-auto"
            v-model="detailCurrentPage"
            :total-rows="detailTotal"
            :per-page="5"
            size="sm"
            last-number
            first-number
            aria-controls="transaction-table"
          />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    cashback: {
      type: Object,
    },
    transactions: {
      type: Array,
    },
  },
  watch: {
    transactions: function (newTransactions, oldTransactions) {
      const data = newTransactions;
      this.items = data;
      this.total = data.length;
      this.pageAmount = Math.ceil(data.length / this.recordPerPageAmount);
    },
  },
  data() {
    return {
      isShowDetail: false,
      filter: null,
      selectedHistory: {},
      // Note 'isActive' is left out and will not appear in the rendered table
      tableColumn: [
        {
          key: "bought_at",
          label: "Thời gian",
          sortable: true,
        },
        {
          key: "order_id",
          label: "Mã GD",
          sortable: true,
        },
        {
          key: "vendor",
          label: "Shop",
          sortable: true,
        },

        {
          key: "total_bought_amount",
          label: "Tổng đơn",
          sortable: true,
        },
        {
          key: "cashback_money",
          label: "Hoàn tiền",
          sortable: true,
        },

        {
          key: "approve_date",
          label: "Dự kiến duyệt",
          sortable: true,
        },
        {
          key: "status",
          label: "Trang thái",
          sortable: true,
        },
      ],
      tableDetailColumn: [
        {
          key: "product_name",
          label: "Tên sản phẩm",
          sortable: true,
          class:'border-top-0'
        },
        {
          key: "product_quantity",
          label: "Số lượng",
          sortable: true,
          class: "text-lg-right",
          class:'border-top-0'
        },
        {
          key: "product_price",
          label: "Giá tiền",
          sortable: true,
          class: "text-lg-right",
          class:'border-top-0'
        },
        {
          key: "rate_out",
          label: "Tỉ lệ hoàn tiền",
          sortable: true,
          class: "text-lg-right border-top-0",
        },
        {
          key: "actual_amount",
          label: "Hoa hồng",
          sortable: true,
          class: "text-lg-right border-top-0",
        },
        {
          key: "status",
          label: "Trạng thái",
          sortable: true,
          class:'border-top-0'
        },
      ],
      recordOptions: [10, 20, 50],
      total: 0,
      currentPage: 1,
      recordPerPageAmount: "10",
      pageAmount: 0,
      detailCurrentPage: 1,
      detailPageAmount: 1,
      detailTotal: 0,
    };
  },
  computed: {
    showDetailModal: {
      get() {
        return this.isShowDetail;
      },
      set(value) {
        this.isShowDetail = value;
      },
    },
  },
  methods: {
    onFiltered(filteredItems) {
      this.total = filteredItems.length;
      this.currentPage = 1;
    },
    openUrl(url) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("Chi tiết dơn hàng");
      }
      let accountId = this.$auth.getToken("local") ? this.$auth.getToken("local").id : undefined;
      window.open(url + `a-${accountId}`, "_blank");
    },
    showHistoryDetail(index) {
      const currentIndex =
        (this.currentPage - 1) * parseInt(this.recordPerPageAmount) + index;
      this.selectedHistory = this.transactions[currentIndex] || { details: [] };
      this.detailCurrentPage = 1;
      this.detailTotal = this.selectedHistory.details.length;
      this.detailPageAmount = Math.ceil(
        this.selectedHistory.details.length / 5
      );
      this.showDetailModal = true;
    },
    handledRecord(option) {
      this.recordPerPageAmount = `${option}`;
      this.pageAmount = Math.ceil(this.total / option);
    },
    statusDisplays(id) {
      switch (id) {
        case 0:
          return {
            class: "pending",
            text: "ĐANG XỬ LÝ",
          };
        case 1:
          return {
            class: "approve",
            text: "TẠM DUYỆT",
          };
        case 3:
          return {
            class: "success",
            text: "THÀNH CÔNG",
          };
        case -1:
        case -2:
        case -3:
        case 2:
          return {
            class: "failed",
            text: "KHÔNG THÀNH CÔNG",
          };
        default:
          return {
            class: "failed",
            text: "KHÔNG THÀNH CÔNG",
          };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order-container {
  margin-bottom: 4.5rem;
}
.profileBoxBgLightBlue {
  background-color: rgba(0, 132, 199, 0.2);
}
.profileBox {
  text-align: center;
  text-transform: uppercase;
  .profileBoxTitle {
    color: #333333;
    text-transform: uppercase;
  }
  .profileBoxPrice {
    &.blackText {
      color: #333333;
    }
    &.greenText {
      color: #00a896;
    }
    &.blueText {
      color: #05668d;
    }
    text-transform: none;
    color: #ffffff;
    font-size: 1.5625rem;
    font-weight: bold;
  }
}
.historyText {
  // text-transform: uppercase;
  font-size: 1.125rem;
  color: #05668d;
}
.cashback-footer {
  border: 0px solid #e6e6e6;
  border-top-width: 2px;
}
.status-text {
  font-size: 0.875rem;
}
.approve {
  color: #05668d;
  font-weight: bold;
}
.success {
  color: #00a896;
  font-weight: bold;
}
.pending {
  color: #ff771c;
  font-weight: bold;
}
.failed {
  color: #c94b3d;
  font-weight: bold;
}

.order-id-text {
  color: #05668d;
}

.approve-circle {
  background-color: #05668d;
  font-weight: bold;
}
.success-circle {
  background-color: #00a896;
  font-weight: bold;
}
.pending-circle {
  background-color: #ff771c;
  font-weight: bold;
}
.failed-circle {
  background-color: #c94b3d;
  font-weight: bold;
}

.history-status-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 0.8125rem;
  font-size: 0.875rem;
  color: white;
}

@media (max-width: 576px) {
  .order-container {
    margin-bottom: 1rem;
  }

  .historyText {
    font-size: 0.9375rem;
  }
}
</style>
