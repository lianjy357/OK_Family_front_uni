# 项目说明

## 这个项目缺少内容

由于配置了服务器地址，地址信息将不再公开查看。
我写个案例提供参考

文件放置在`lib/env.js`

```js
// lib/env.js
// 线上环境
const prop = {
	baseUrl: "",
}
// 测试环境
const test = {
	baseUrl: "http://192.168.0.187:19004",
}
// dev  
const dev = {
	baseUrl: "http://127.0.0.1:5000",
}
const env = {
	baseUrl: dev.baseUrl,
}
export default env
```
