<template>
  <div>
    <div class="boxVendorFitler" :class="{'is-selected': isSelected}" @click="toggle($event)">
      <div class="slider img-17-6">
        <img :src="value.image_url" alt class="img-small contentObFix" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSelected: this.selected ? this.selected : false
    };
  },
  props: ["selected", "value"],
  methods: {
    toggle($event) {
      this.isSelected = !this.isSelected;

      this.$emit("toggle", {
        selected: this.isSelected,
        value: this.value,
        id: this.value.id
      });

      $event.preventDefault();
    }
  },
  watch: {
    selected: function(newVal) {
      this.isSelected = newVal;
    }
  }
};
</script>
<style lang="scss" scoped>
.boxVendorFitler {
  background-color: #ffffff;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  transition: 0.3s all;
  border: solid 2px transparent;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
}
.is-selected {
  border: solid 2px #ff599a;
}
</style>