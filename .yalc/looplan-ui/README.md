# 文档

# 安装

```
npm install looplan-ui
```

# 使用

```
import LooplanUI from 'looplan-ui';
import 'looplan-ui/lib/index.css';
import 'looplan-ui/lib/looplan-ui.css';

app.use(LooplanUI);
```

# 组件库

## 弹出层

```ts
import { LpLayer } from 'looplan-ui';
 LpLayer.Layer.src(TestSize.default)
        .useMask()              // 使用遮罩
        .props({                // 传递参数
            width: 'auto',
            height: 'auto'
        })
        .transition('zoom')     // 使用动画 支持zoom、slide-top、slide-bottom、slide-left、slide-right、fade、none
        .model(state)           // 使用v-model绑定
        .container('dialog')    // 使用容器(可以传入组件)
        .show({                 // 显示
            width: '80vw',
            height: '80vh'
        });
```

## toast

```ts
import { LpToast } from 'looplan-ui';
LpToast.toast('提示信息');
```


详细参考[layer.vue](./example/views/layer.vue)