import LpForm from './src/lp-form.vue';
import LpFormItem from './src/lp-form-item.vue';
import LpInput from './src/lp-input.vue';
import LpInputNumber from './src/lp-input-number.vue';
import LpSelect from './src/lp-select.vue';
import LpRadio from './src/lp-radio.vue';
import LpRadioGroup from './src/lp-radio-group.vue';
import LpSwitch from './src/lp-switch.vue';
import LpUpload from './src/lp-upload.vue';
export * from './types/index';
declare let component: {
    install: (app: any) => void;
};
export { LpForm, LpFormItem, LpInput, LpInputNumber, LpSelect, LpRadio, LpRadioGroup, LpSwitch, LpUpload };
export default component;
