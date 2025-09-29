浏览器端怎么实现把ts定义的interface转换为json数据

例如  
```ts
export interface ComponentOption {
    /**
     * 标题
     */
    title: string;
    /**
     * 名称
     */
    name?: string;

}
```

转换为 
```json
[
    {
        "title": "标题",
        "name": "title",
        "type": "string",
        "required": true,
    },
    {
        "title": "名称",
        "name": "name",
        "type": "string",
        "required": false,
    }
]
```