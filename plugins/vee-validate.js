import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import vi from "vee-validate/dist/locale/vi";

Validator.localize({ vi: vi });
Vue.use(VeeValidate, { locale: "vi", fieldsBagName: "vvFields" });
Validator.extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true
});
