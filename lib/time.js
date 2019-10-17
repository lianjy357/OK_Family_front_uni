// 秒转换成 倒计时
export const secondToTime = (seconds, strType = ':') => {

	let min = seconds % 3600;
	// 小时
	let hour = Math.floor(seconds / 3600);
	// 分钟
	let mins = Math.floor(min / 60);
	// 秒
	let second = seconds % 60;

	hour = hour < 10 ? '0' + hour : hour;
	mins = mins < 10 ? '0' + mins : mins;
	second = second < 10 ? '0' + second : second;
	let str = strType == ':' ? hour + ':' + mins + ':' + second : hour + '时' + mins + '分' + second + '秒';

	return str
};

// 秒转时钟数组
export const secondToClock = (seconds) => {
	let min = seconds % 3600;
	// 小时
	let hour = Math.floor(seconds / 3600);
	// 分钟
	let mins = Math.floor(min / 60);
	// 秒
	let second = seconds % 60;

	hour = hour < 10 ? '0' + hour : hour;
	mins = mins < 10 ? '0' + mins : mins;
	second = second < 10 ? '0' + second : second;

	let str = [hour, mins, second]

	return str
}


// 秒转 时间 (xx分xx秒)
export const timeCosumingTrans = (seconds) => {
	// 分钟
	let mins = Math.floor(seconds / 60);
	// 秒
	let second = seconds % 60;

	mins = mins < 10 ? '0' + mins : mins + '';
	second = second < 10 ? '0' + second : second + '';

	let strArr = [mins, second];
	return strArr
}

export const timeCosumingFormat = (seconds) => {
	if (!seconds && seconds !== 0) {
		return '00分00秒';
	}
	seconds = seconds * 1;
	// 分钟
	let mins = Math.floor(seconds / 60);
	// 秒
	let second = seconds % 60;

	mins = mins < 10 ? '0' + mins : mins + '';
	second = second < 10 ? '0' + second : second + '';

	let strArr = `${mins}分${second}秒`;
	return strArr
}


/**
   * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * eg: ("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
   * ("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
   * ("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
   * ("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
   * ("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
   */
export const DateFormat = (time, fmt = 'yyyy-MM-dd hh:mm:ss') => {
	// if (typeof time === 'string') time = new Date(time);
	time = DateHackForNet(time);

	const o = {
		'M+': time.getMonth() + 1, // 月份
		'd+': time.getDate(), // 日
		'h+': time.getHours(), // 小时
		'H+': time.getHours(), // 小时
		'm+': time.getMinutes(), // 分
		's+': time.getSeconds(), // 秒
		'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
		'S': time.getMilliseconds(), // 毫秒
	};
	const week = ['/u65e5', '/u4e00', '/u4e8c', '/u4e09', '/u56db', '/u4e94', '/u516d'];

	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[time.getDay()]);
	}
	for (const k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? String(o[k]) : ('00' + o[k]).substr(('' + o[k]).length));
		}
	}
	return fmt;
};

export function DateHackForNet(time) {
	if (!time) return new Date();
	if (typeof time === 'string') {
		// xxxx-xx-xx xx:xx:xx 格式的时间
		const date = time.match(/(\d\d\d\d)\-(\d\d)\-(\d\d) (\d\d):(\d\d):?(\d\d)?/);
		if (date) return new Date(date[1], date[2] - 1, date[3], date[4], date[5], date[6] || 0);

		// xxxx-xx-xxTxx:xx:xx 格式的时间
		const date2 = time.match(/(\d\d\d\d)\-(\d\d)\-(\d\d)T(\d\d):(\d\d):?(\d\d)?/);
		// console.log('date2', date2, time);
		if (date2) return new Date(date2[1], date2[2] - 1, date2[3], date2[4], date2[5], date2[6] || 0);
	}
	return new Date(time);
}
