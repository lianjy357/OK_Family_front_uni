import env from '@/lib/env.js';
import { httpRequest, uploadFileRequset } from '@/lib/request.js';

const baseUrl = env.baseUrl;

// 用户登入
export const userLogin = data => {
  let params = {
    url: '/login',
    data: data,
    Type: 'POST',
    loading: false,
    header: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  return httpRequest(baseUrl, params);
}
// 用户注册
export const userRegister = data => {
  let params = {
    url: '/register',
    data: data,
    Type: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  return httpRequest(baseUrl, params);
}

// 退出登录
export const logout = data => {
  let params = {
    url: '/logout',
    data: data,
    Type: 'POST',
  };
  return httpRequest(baseUrl, params);
}

// 发送验证码
export const sendVerifyCode = data => {
  let params = {
    url: '/verifyCode/sendVerifCode',
    data: data,
    Type: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  return httpRequest(baseUrl, params);
}


// 上传图片文件 data = { filePath  }
export const fileUpload = data => {
  let params = {
    url: '/upload/fileUpload',
    filePath: data.filePath,
    formData: data.formData || '',
    name: data.name,
  };
  return uploadFileRequset(baseUrl, params);
}
// 用户信息上传
export const saveSignUp = data => {
  let params = {
    url: '/obtain/saveSignUp',
    data: data,
    Type: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' }
  }
  return httpRequest(baseUrl, params)
}

// 获取用户信息
export const getUserNews = () => {
	let params = {
		url: '/obtain/getUserNews',
		data: null,
		Type: 'POST',
		loading: false
	};
	return httpRequest(baseUrl, params);
};

// 获取用户信息
export const getSignUp = () => {
	let params = {
		url: '/obtain/getSignUp',
		data: null,
		Type: 'POST',
	};
	return httpRequest(baseUrl, params);
};

// 重置密码
export const resetPassword = data => {
	let params = {
		url: '/forgetPassword',
		data: data,
		Type: 'POST',
		header: { 'content-type': 'application/x-www-form-urlencoded' }
	};
	return httpRequest(baseUrl, params);
};


export default {
  userLogin,                  // 用户登入
  logout,                     // 退出登录
  sendVerifyCode,             // 发送验证码
  userRegister,                // 用户注册
	getUserNews,								// 获取用户信息
  fileUpload,                 // 上传图片
  saveSignUp,                 // 保存报名信息
  getSignUp,                  // 获取用户报名信息
	
	resetPassword,							// 重置密码
	
};