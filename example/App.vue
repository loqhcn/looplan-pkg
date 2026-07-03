<template>
  <div class="fullview">
    <RouterView></RouterView>
    <div class="lp-pkg-dev-box">
      <div class="item" @click="onHome">
        <lp-icon is="home" color="white"></lp-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, provide, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const state = reactive({
  activeTab: 'style',
  currentDoc: '',
  currentPath: '',
  styleMenus: [],
  componentMenus: []
});

// 提供全局上传配置
const globalUploadConfig = {
  url: 'http://api.looplan.cn/Storage.upload',
  type: 'upload',
  headers: {
    Authorization: localStorage.getItem('token') || '',
  },
};
provide('uploadConfig', globalUploadConfig);

const onTab = ({ value }: { value: string }) => {
  console.log(value);
  router.push({
    path: '/' + value
  });
}

const onHome = () => {
  router.push({ path: '/' });
}


onMounted(() => {

})

</script>


<style lang="scss">
.lp-pkg-dev-box {
  position: fixed;
  z-index: 9999;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  .item {
    padding: 4px 8px;
  }
}


.lp-mobile-layer {

  .lp-dialog__body {
    padding: 0;
    container-type: size;
    .lp-layout-em {
      font-size: calc(100cqw / 750);
    }
  }
}
</style>