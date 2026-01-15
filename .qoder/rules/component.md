---
trigger: always_on
---


# 组件包

- 组件包的存放目录为`/packages`, 目录下有多个组件包

## 组件包目录结构

- src/             # 代码目录
- - components/    # 组件目录
- - index.ts       # 入口文件
- - config.ts      # 组件包配置信息
- - types.ts       # 存放类型定义
- package.json     # 组件包信息


# 如何开发组件


- 在`组件包目录/src/component/`新建组件文件
- 在`组件包目录/src/index.ts`导出新建的组件
- 在`/public/docs/组件包名/组件名.md`编写`组件文档`, [文档规范](./doc.md)
- 在`/public/docs/组件包名/README.md`里面添加`组件文档`的链接


编写完以后, 可以通过`http://localhost:7011/组件包名/组件名.md`访问到编写的文档

默认使用

## 开发要求
- 编写组件时 有使用其它组件需求的,要求使用`looplan-ui`里面的组件
- * 如果没有描述不用`looplan-ui`的组件, 就需要使用(例如, button, input等)