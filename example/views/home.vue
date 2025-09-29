<template>
    <div class="m-layout">
        <div>

            <!-- <demo1></demo1> -->
            <looplan-text :text="state.currentDoc"></looplan-text>

        </div>
    </div>
</template>
<script setup lang="ts">
import { looplanText } from '@packages/looplan-text/src/index';
import { ref, reactive, onMounted } from 'vue';

const state = reactive({
    currentDoc: '12312312',
})
</script>
<script lang="ts">
export default {
    title: '首页'
}
</script>
<style lang="scss"></style>