<template>
  <div class="rowVendorFilters mx-2-minus mx-5px-minus">
    <toggle-button
      v-for="(option,index) in filteredOptions"
      class="col-lg-2 px-lg-2 px-5-res col-custom pb-lg-3"
      :key="'s'+index"
      :value="option.value"
      :selected="option.selected"
      @toggle="onToggle($event)"
    ></toggle-button>
  </div>
</template>
<script>
import ToggleButton from "../../components/filters/ToggleButton";
export default {
  data() {
    return {
      //   selectedOptions: this.selected
    };
  },
  components: {
    ToggleButton
  },
  props: ["options", "selected"],
  methods: {
    onToggle(option) {
      if (option.selected) {
        this.selected.push(option.value.id);
      } else {
        this.selected.splice(this.selected.indexOf(option.value.id), 1);
      }

      this.$emit("change", {
        changed: option,
        selected: this.selected
      });
    }
  },
  computed: {
    filteredOptions() {
      return this.options.map(option => {
        return {
          value: option,
          selected: this.selected.includes(option.id)
        };
      });
    }
  }
};
</script>
