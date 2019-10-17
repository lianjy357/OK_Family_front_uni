import env from '@/lib/env.js';
import { httpRequest, uploadFileRequset } from '@/lib/request.js';

const baseUrl = env.baseUrl;

// 获取题目
export const intoExam = data => {
  let params = {
    url: '/obtain/intoExam',
    data: data,
		Type: 'GET',
		loading: false
  };
  return httpRequest(baseUrl, params);
};

// 保存竞赛结果
export const saveExamResult = data => {
  let params = {
    url: '/obtain/saveExamResult',
    data: data,
		Type: 'POST',
		loading: false,
		header: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  return httpRequest(baseUrl, params);
};

// 保存题目作答
export const saveUserSubjectAnswer = data => {
  let params = {
    url: '/obtain/saveUserSubjectAnswer',
    data: data,
		Type: 'POST',
		loading: false,
		header: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  return httpRequest(baseUrl, params);
};

export default {
  intoExam,                   // 获取题目
  saveUserSubjectAnswer,      // 保存题目作答
  saveExamResult              // 保存竞赛结果
};