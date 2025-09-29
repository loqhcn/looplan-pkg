# looplan-ui


- 弹出层 LpLayer
- 图标  lp-icon


## 弹出层


### toast

```ts

import { LpLayer } from 'looplan-ui';

LpLayer.toast('消息提示');

```

### 普通组件弹出层
```ts
import { LpLayer } from 'looplan-ui';
import TestComponent from '组件路径/组件名称.vue';



//打开弹出层
LpLayer.Layer.src(Demo1)
    //使用内置容器dialog
    .container('dialog')
    // 开启遮罩层
    .useMask(true, {
        //是否允许点击遮罩层关闭
        close: false
    })
    .show({
        x: 'center',
        y: 'center',
    });
```

### 弹出层打开云组件

```ts
import { LpLayer } from 'looplan-ui';
import { loadComponent } from 'looplan';
const Demo1 = loadComponent('LooplanAppDemo@Demo1');

LpLayer.Layer.src(Demo1)
    //使用内置容器dialog
    .container('dialog')
    // 开启遮罩层
    .useMask(true, {
        //是否允许点击遮罩层关闭
        close: false
    })
    .show({
        x: 'center',
        y: 'center',
    });
```