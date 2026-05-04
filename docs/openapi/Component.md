# Component OpenAPI

- baseUrl: `https://api.looplan.cn`
- 成功 code: `200`
- 鉴权: header 传 `x-sign`（与 `CloudObject_OpenApi` 一致）
- 请求方式: 默认 `POST`
- 响应格式: `Looplan.result(code, msg, data)`

## 1. 组件列表

- 路径: `/openapi/Component.list`
- 入参: 无

请求示例:

```http
POST https://api.looplan.cn/openapi/Component.list
x-sign: <tokenId>.<sign>
Content-Type: application/json
```

成功响应示例:

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "list": []
  }
}
```

## 2. 组件详情

- 路径: `/openapi/Component.detail`
- 入参:
- `id` number | string，必填

请求示例:

```http
POST https://api.looplan.cn/openapi/Component.detail
x-sign: <tokenId>.<sign>
Content-Type: application/json

{
  "id": 1
}
```

成功响应示例:

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "row": {}
  }
}
```

## 3. 通过名称获取组件详情

- 路径: `/openapi/Component.getByName`
- 入参:
- `name` string，必填（组件标识）
- 返回:
- `row` 组件信息
- `latestVersion` 最新版本信息（按 `versionCode desc, id desc` 取第一条，可能为 `null`）

请求示例:

```http
POST https://api.looplan.cn/openapi/Component.getByName
x-sign: <tokenId>.<sign>
Content-Type: application/json

{
  "name": "lp-test"
}
```

成功响应示例:

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "row": {},
    "latestVersion": {}
  }
}
```

## 4. 保存组件

- 路径: `/openapi/Component.save`
- 入参:
- `id` number | string，选填（有值=更新，无值=新增）
- `name` string，必填
- `title` string，必填
- `description` string，必填
- `img` string，选填

请求示例:

```http
POST https://api.looplan.cn/openapi/Component.save
x-sign: <tokenId>.<sign>
Content-Type: application/json

{
  "name": "lp-test",
  "title": "测试组件",
  "description": "组件描述",
  "img": ""
}
```

成功响应示例:

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "data": {
      "name": "lp-test",
      "title": "测试组件",
      "img": "",
      "description": "组件描述"
    },
    "saveResult": {}
  }
}
```

## 5. 删除组件

- 路径: `/openapi/Component.delete`
- 入参:
- `id` number | string，必填
- 说明: 软删除（写入 `deletedAt`）

请求示例:

```http
POST https://api.looplan.cn/openapi/Component.delete
x-sign: <tokenId>.<sign>
Content-Type: application/json

{
  "id": 1
}
```

成功响应示例:

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "id": 1
  }
}
```

## 6. 版本详情

- 路径: `/openapi/Component.versionDetail`
- 入参:
- `id` number | string，必填（版本表 `ct_cloud_components_version.id`）

请求示例:

```http
POST https://api.looplan.cn/openapi/Component.versionDetail
x-sign: <tokenId>.<sign>
Content-Type: application/json

{
  "id": 1001
}
```

成功响应示例:

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "row": {}
  }
}
```

## 7. 上传组件版本

- 路径: `/openapi/Component.upload`
- 入参:
- `file` File，必填（zip 包）
- `version` string，必填（例如 `1.0.0`）
- `id` number | string，选填（与 `name` 二选一）
- `name` string，选填（与 `id` 二选一）
- 说明: 服务端会解压 zip 后逐文件上传到 OSS，并回写版本记录

请求示例:

```http
POST https://api.looplan.cn/openapi/Component.upload
x-sign: <tokenId>.<sign>
Content-Type: multipart/form-data
```

成功响应示例:

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "userId": 1,
    "component": {},
    "version": {},
    "cloudResult": {
      "success": true,
      "totalFiles": 3,
      "mainUrl": "https://storage.loqh.cn/..."
    }
  }
}
```


获取表结构通过命令
```bash
# 云组件
lpc modeldoc main@ct_cloud_components
# 云组件版本
lpc modeldoc main@ct_cloud_components_version
```
