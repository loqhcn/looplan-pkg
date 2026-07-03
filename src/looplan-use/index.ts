import { useModelTable } from './src/useModelTable'
import { LpLayer } from 'looplan-ui';


async function copyText(text: string) {
    // 方案1：优先使用现代剪贴板 API（HTTPS/localhost 环境） 
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text); 
            LpLayer.toast('复制成功', { duration: 2000 });
            return;
        } catch (err) {
           fallbackCopyTextToClipboard(text)
           return;
        }
    }
    fallbackCopyTextToClipboard(text)
}


// 降级复制方法：用 textarea 模拟 
function fallbackCopyTextToClipboard(text: string) {
    // 创建临时 textarea 元素 
    const textarea = document.createElement('textarea');
    textarea.value = text;
    // 隐藏元素，避免视觉干扰 
    textarea.style.position = 'fixed';
    textarea.style.top = '-999px';
    textarea.style.left = '-999px';
    document.body.appendChild(textarea);
    // 选中内容并复制 
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    // 兼容移动设备 
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            LpLayer.toast('复制成功', { duration: 2000 });
        } else {
            throw new Error('execCommand copy failed');
        }
    } catch (err) {
        console.error('降级复制失败', err);
        LpLayer.toast('复制失败，请手动复制', { duration: 2000 });
    } finally {
        // 移除临时元素 
        document.body.removeChild(textarea);
    }
}

export {
    useModelTable,
    copyText
}