<template>
    <div class="lp-container-mobile">
        <div class="lp-container-mobile__frame">
            <div class="lp-container-mobile__status-bar"></div>
            <div class="lp-container-mobile__body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
</script>
<script lang="ts">
export default {
    name: 'MobileContainer',
}
</script>
<style lang="scss">
.lp-container-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    background: #f0f2f5;
}

.lp-container-mobile__frame {
    width: 375px;
    height: 667px;
    background: #ffffff;
    border-radius: 28px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
}

.lp-container-mobile__status-bar {
    height: 28px;
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
}

.lp-container-mobile__body {
    flex: 1;
    display: flex;
    height: 0;
    flex-direction: column;
    background: #f5f6f8;
}
</style>
