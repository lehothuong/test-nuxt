<template>
  <div class="boxCategoryFilter">
    <transition name="slide-fade">
      <select-list
        ref="selectList"
        :options="options"
        :selected="selected"
        @change="onChange($event)"
      ></select-list>
    </transition>
  </div>
</template>
<script>
import SelectList from "../../components/filters/SelectList";
export default {
  name: "ChildComponent",
  props: ["options", "selected"],
  components: {
    SelectList
  },
  data() {
    return {};
  },
  methods: {
    onChange(event) {
      this.$emit("change", event);
    }
  }
};
</script>