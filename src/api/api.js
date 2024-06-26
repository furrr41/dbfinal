/* 集中管理所有与后端 API 的交互请求
   通过在 api.js 文件中添加新的方法，
   可以方便地在 Vue 组件中调用后端 API 并处理返回的数据 */


import axios from 'axios';
import qs from 'qs'; // 确保正确导入 qs 库

// 创建 axios 实例
const apiClient = axios.create({
	baseURL: 'http://123.60.134.9:8080', // 请替换为你的后端地址
	withCredentials: false, // 这个配置项取决于你的后端配置
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded' // 设置请求头
	}
});

export default {
	// 获取评分最高的电影
	// getTopRatedMovies() {
	// 	return apiClient.get('/api/movies/top-rated', {
	// 		params: {
	// 			minRatingNum: 200000,
	// 			limit: 9
	// 		}
	// 	});
	// },

	getTopRatedMovies2() {
		return apiClient.get('/api/movies/top-rated');
	},



	// 获取电影详细信息
	getMovieDetails(movieId) {
		return apiClient.get(`/api/movies/getFilmById`);
	},

	// 你可以在这里添加更多的 API 请求方法
	// 示例：获取所有电影
	getAllMoviesByRating(numsMovies) {
		return apiClient.get('/api/movies');
	},

	// 用户登录
	login(credentials) {
		return apiClient.post('/api/user/login', qs.stringify(credentials)); // 使用 qs 库序列化请求体
	}

};