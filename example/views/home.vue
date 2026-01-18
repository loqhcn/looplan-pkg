<template>
    <div class="full padding">
        <div>

            <!-- <demo1></demo1> -->
            home
            <div class="list">
                <div class="item flex " v-for="pkg in packageConfigs" :key="pkg.name">
                    {{ pkg.name }}
                    <lp-button @click="onOpen(pkg)">打开</lp-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, inject } from 'vue';
import { packages } from '@example/lib/parsePackages';
import { useRoute, useRouter } from 'vue-router';
import { $store } from 'looplan-doc';


const packageConfigs = packages.map(pkg => pkg.packageConfig);
const route = useRoute();
const router = useRouter();

const state = reactive({
    currentDoc: '',
})

const onOpen = async (row: any) => {
    console.log('onOpen', row)
    await $store('app').loadAppFromGateway(row.name);
    $store('app').loadDocLayout();
    console.log('onOpen')
    router.push({ path: `/${row.name}` });
}


onMounted(() => {
    console.log('packageConfigs', packageConfigs)
})
</script>
<script lang="ts">
export default {
    title: '首页'
}
</script>
<style lang="scss"></style>