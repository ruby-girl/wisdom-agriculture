import http from '@/utils/request.js'

// 登录
export const login = (data) => {
	return http.request({
		url: 'login',
		method: 'post',
		data,
	})
}


