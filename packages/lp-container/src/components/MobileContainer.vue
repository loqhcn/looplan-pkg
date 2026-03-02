<template>
    <div class="lp-container-mobile">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted } from 'vue';

const state = reactive({

})
</script>
<script lang="ts">
export default {
    name: 'MobileContainer',
}
</script>
<style lang="scss">
</style>
