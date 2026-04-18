api请求依赖`looplan`模块

当前项目配置了data,main这两个ModelSpace
- data 用于访问各种数据表
- main 为平台核心服务(只支持云函数)


可以通过`lpc modeldoc 账户名@模型名` 查看模型文档(表结构和功能实现)

## 模型方法示例

- 数据模型实现了常用的增删改查方法
- 包含 add,count,delete,exists,list,multiDelete,multiSave,paginate,paginateX,restore,row,save,saveField,saveOptions,update
- 通过这些方法实现数据表的增删改查操作

示例代码:
```ts
import {useModelSpace} from 'looplan';
// 引入data空间
const dataSpace = useModelSpace('data');
// 引入分类模型
const cateModel = dataSpace.useModel(modelName:string);
// 调用数据模型方法实例
const {error,list} = await cateModel.list();
```

## 云函数示例

```ts
import {useModelSpace} from 'looplan';
// 引入data空间
const dataSpace = useModelSpace('data');
// 示例：云对象调用
const exampleCloudObject = dataSpace.useCloudObject('云对象名称');
// 调用云对象方法实例
const res = await exampleCloudObject.list();

// 演示云函数调用
const exampleCloudFunction = dataSpace.useCloudFunction('云函数名称');
// 调用云函数方法实例
const res = await exampleCloudFunction();
```