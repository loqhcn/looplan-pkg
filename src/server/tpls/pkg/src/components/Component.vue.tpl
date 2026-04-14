<template>
    <div class="__COMPONENT_TAG__">
        {{ viewValue || '__COMPONENT_NAME__' }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { __COMPONENT_NAME__Props, __COMPONENT_NAME__Emits } from '../types'

const props = withDefaults(defineProps<__COMPONENT_NAME__Props>(), {
    modelValue: '',
})

const emit = defineEmits<__COMPONENT_NAME__Emits>()

const viewValue = computed({
    get() {
        return props.modelValue
    },
    set(value: string) {
        emit('update:modelValue', value)
    },
})
</script>

<style scoped>
.__COMPONENT_TAG__ {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    min-width: 120px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid #d9e0ee;
    color: #2b3447;
    background: #f7f9fd;
}
</style>
