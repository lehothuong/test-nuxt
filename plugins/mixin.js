import Vue from "vue";
import dayjs from "dayjs";
Vue.mixin({
  data() {
    return {};
  },
  computed: {},
  updated() {},
  methods: {
    formatPrice(value) {
      if (value !== undefined && value !== null) {
        let val = (value / 1).toFixed(0).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
      }
      return 0;
    },
    toPercent(value) {
      if (value) {
        return +parseFloat(value * 100).toFixed(2);
      }
      return 0;
    },
    formatPercent(value) {
      if (value) {
        return value.toString().replace(".", ",");
      }
      return 0;
    },
    formatNumber(value) {
      if (value !== undefined && value !== null) {
        // let val = (value / 1)
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      return 0;
    },
    toTimeZone(offset) {
      const date = new Date(offset);
      return date.toLocaleDateString(["vi-VI"], {
        hour: "2-digit",
        minute: "2-digit"
      });
    },
    getTimeZone(time) {
      if (time !== undefined && time !== null) {
        var res = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return dayjs(time.toLocaleString("vi-VI", { timeZone: res })).format(
          "HH:mm D/M/YYYY"
        );
      }
      return "";
    }
  }
});
