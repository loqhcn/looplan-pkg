<template>
    <div v-if="visible" class="create-mask" @click.self="emit('close')">
        <div class="create-dialog">
            <div class="dialog-head">
                <div class="title">创建组件包</div>
                <button class="close-btn" @click="emit('close')">x</button>
            </div>

            <div class="dialog-body">
                <div class="form-item">
                    <div class="label">包名</div>
                    <input
                        v-model.trim="form.pkgName"
                        class="input"
                        type="text"
                        placeholder="如: looplan-example-button"
                    />
                </div>

                <div class="form-item">
                    <div class="label">标题</div>
                    <input
                        v-model.trim="form.title"
                        class="input"
                        type="text"
                        placeholder="组件包标题，可选"
                    />
                </div>

                <div class="form-item">
                    <div class="label">组件名称</div>
                    <input
                        v-model.trim="form.componentName"
                        class="input"
                        type="text"
                        placeholder="如: Button"
                    />
                </div>
            </div>

            <div class="dialog-foot">
                <lp-button @click="emit('close')">取消</lp-button>
                <lp-button type="primary" :disabled="submitting" @click="onSubmit">
                    {{ submitting ? '创建中...' : '立即创建' }}
                </lp-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

interface CreatePkgPayload {
    pkgName: string;
    title: string;
    componentName: string;
}

const props = defineProps<{
    visible: boolean;
    serverBase: string;
}>();

const emit = defineEmits<{
    close: [];
    created: [payload: { pkgName: string; message: string }];
    error: [message: string];
}>();

const submitting = ref(false);

const form = reactive<CreatePkgPayload>({
    pkgName: '',
    title: '',
    componentName: '',
});

const onSubmit = async () => {
    if (!form.pkgName) {
        emit('error', '请先输入包名');
        return;
    }
    submitting.value = true;
    try {
        const res = await fetch(`${props.serverBase}/CreatePkg.create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.ok) {
            emit('error', data?.message || '创建失败');
            return;
        }
        emit('created', { pkgName: form.pkgName, message: data?.message || '创建成功' });
        form.pkgName = '';
        form.title = '';
        form.componentName = '';
        emit('close');
    } catch {
        emit('error', '请求服务端失败');
    } finally {
        submitting.value = false;
    }
};
</script>

<style lang="scss" scoped>
.create-mask {
    position: fixed;
    inset: 0;
    background: rgba(17, 24, 39, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1200;
}

.create-dialog {
    width: 560px;
    max-width: calc(100vw - 24px);
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.24);
}

.dialog-head {
    padding: 14px 16px;
    border-bottom: 1px solid #e6edf7;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    font-size: 16px;
    font-weight: 600;
    color: #2a3344;
}

.close-btn {
    width: 26px;
    height: 26px;
    border: 0;
    border-radius: 6px;
    background: #f0f4fb;
    color: #657086;
    cursor: pointer;
}

.dialog-body {
    padding: 14px 16px 4px;
}

.form-item {
    margin-bottom: 12px;
}

.label {
    margin-bottom: 6px;
    font-size: 13px;
    color: #536078;
}

.input {
    width: 100%;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #d9e2f1;
    padding: 0 10px;
    outline: none;
}

.input:focus {
    border-color: #4b8dff;
    box-shadow: 0 0 0 3px rgba(75, 141, 255, 0.15);
}

.dialog-foot {
    padding: 12px 16px 16px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
