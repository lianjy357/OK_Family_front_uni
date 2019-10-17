
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
  