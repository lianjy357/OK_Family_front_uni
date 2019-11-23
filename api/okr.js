/**
 * 赛事相关数据 api
 */
import env from '@/lib/env.js';
import { httpRequest, uploadFileRequset } from '@/lib/request.js';

const baseUrl = env.baseUrl;

// 获取OKR信息
export const getOKRInfo = () => {
  let params = {
    url: '/getOKRInfo',
    data: null,
    Type: 'GET',
    loading: true
  };
  return httpRequest(baseUrl, params);
};
// 用户登入
export const saveOKRInfo = data => {
  let params = {
    url: '/saveOKRInfo',
    data: data,
    Type: 'POST',
    loading: false,
    // header: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  return httpRequest(baseUrl, params);
}


export default {
  getOKRInfo,               // 获取OKR信息
  saveOKRInfo,              // 保存OKR信息
};