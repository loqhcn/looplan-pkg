<template>
  <div class="fullview">
    <div class="m-layout x-full auto-center">
      <lp-tabs v-model="state.activeTab" :data="state.tabs" type="card" @change="onTab"></lp-tabs>
    </div>
    <div class="content pt">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { pages } from '@example/router';
import { useRouter,useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const state = reactive({
  activeTab: 'style',
  currentDoc: '',
  currentPath: '',
  tabs: pages,
  styleMenus: [],
  componentMenus: []
});

const onTab = ({ value }: { value: string }) => {
  console.log(value);
  router.push({
    path: '/' + value
  });
}

onMounted(() => {
  if(route.path == '/') {
    state.activeTab = pages[0].value;
    onTab({
      value: pages[0].value
    })
  }else{
    state.activeTab = route.path.replace('/','');
  }
})

</script>


<style lang="scss">

</style>