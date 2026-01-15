---
trigger: always_on
alwaysApply: true
---

请掌握`文档查询`方法, 不了解的`组件库`,`自定义组件`,`功能`, 先通过查询文档获得, 而不是搜索文件, 无法通过文档获得才搜索

# 文档查询

`lpc`命令是我开发的全局命令(looplan-cli), 可以在任何目录直接执行

一些依赖包, 你可以通过命令获取文档
- 一定不能在不了解某个组件的规则时直接生成

你可以通过`lpc getdoc 文档名`查询文档(同时查询多个用逗号拼接)

## 示例

例如 `lpc getdoc looplan-ui,looplan-ui/components/button`
例如你要获取`looplan-ui`的`lp-button`组件的用法:
- 可以先`lpc getdoc looplan-ui`,它会获取到looplan-ui的README.md的内容
- 然后, 你可以知道有哪些组件,和组件的链接是什么(link路径)
- 例如读取到按钮link描述为`- [Button 按钮](./components/button.md)`, 你就知道了获取按钮组件文档的名称为`looplan-ui/components/button`
- 然后就可以通过`lpc getdoc looplan-ui/components/button`获取这个按钮组件的文档

## 已部署的文档

这些库的文档你可以通过`lpc getdoc`获取

- looplan-ui  # ui组件库
- looplan     # 云组件访问能力
- LpDoc       # looplan-doc使用文档

