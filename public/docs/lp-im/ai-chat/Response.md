# 流式输出规则
- 标准是总体结构保持一个标准json
- res定义json基本字段，code,msg,data
- say定义输出内容
- data定义额外数据

## 示范
```text
res:{"code":200,"msg":"success","data":{"content":""}}
say:{"content":"输出内容1"}
say:{"content":"输出内容2"}
data:{"key":"value","key2":"value2"}
```

## 带思考的
```text
res:{"code":200,"msg":"success","data":{"content":"","think":""}}
think:{"content":"思考内容1"}
think:{"content":"思考内容2"}
say:{"content":"输出内容1"}
say:{"content":"输出内容2"}
data:{"key":"value","key2":"value2"}
```