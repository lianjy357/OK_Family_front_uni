/**
 * 赛事相关数据 api
 */
import env from '@/lib/env.js';
import { httpRequest, uploadFileRequset } from '@/lib/request.js';

const baseUrl = env.baseUrl;

// 获取赛事情况
export const getMatch = () => {
  let params = {
    url: '/obtain/getMatch',
    data: null,
    Type: 'GET',
    loading: false
  };
  return httpRequest(baseUrl, params);
};

// 判断练习次数是否达到上限
export const getTrainCount = () => {
	let params = {
		url: '/obtain/getTrainCount',
		data: null,
		Type: 'GET',
		loading: false,
	};
	return httpRequest(baseUrl, params);
};

// 判断用户是否拥有决赛资格
export const getAuthority = () => {
	let params = {
		url: '/obtain/getAuthority',
		data: {},
		Type: 'GET',
	};
	return httpRequest(baseUrl, params);
};

// 获取我的成绩详情结果
export const getScoresDetail = data => {
	
};

// 获取TOP和combo排行榜
export const getScoresRanking = data => {
	let params = {
		url: '/obtain/getScoresRanking',
		data: data,
		Type: 'GET',
		loading: false,
	};
	return httpRequest(baseUrl, params);
};

// 获取我的练习结果
export const getPractice = data => {
	let params = {
		url: '/obtain/getPractice',
		data: data,
		Type: 'GET',
		loading: false,
	};
	return httpRequest(baseUrl, params);
};

// 赛事规则
export const getMatchRule = data => {
	let params = {
		url: '/obtain/getMatchRule',
		data: data,
		Type: 'GET',
		loading: false,
	};
	return httpRequest(baseUrl, params);
};

export default {
  getMatch,               // 获取赛事情况
	getTrainCount,					// 判断练习次数是否达到上限
	
	getPractice,						// 获取我的练习结果
	getScoresRanking,				// 获取TOP 和 combo 排行榜
	
	getMatchRule,						// 赛事规则
	
	getAuthority,						// 判断用户是否拥有决赛资格
};