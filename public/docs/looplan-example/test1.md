[TOC]

[组件文件](/packages/looplan-example/src/components/looplan-example.vue)

# 渲染效果

<lp-component is="looplan-example@Text"></lp-component>


# Props

```ts
export interface TextProps {
  text?: string
  size?: 'small' | 'medium' | 'large'
  color?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info'
  bold?: boolean
  italic?: boolean
  underline?: boolean
  copyable?: boolean
  disabled?: boolean
}
```