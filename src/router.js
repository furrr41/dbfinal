import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Register from './components/Register.vue'; // 引入Register组件
import Login from './components/Login.vue'; // 引入Login组件
import FilmRating from './components/FilmRating.vue';
import Search from './components/Search.vue';
import Films from './components/Films.vue';
import Actors from './components/Actors.vue';
import FilmIntroduction from './components/FilmIntroduction.vue';
import ZSGC from './components/zsgc.vue';


Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/register', // 新增注册页面的路由
			name: 'Register',
			component: Register
		},
		{
			path: '/login', // 新增登录页面的路由
			name: 'Login',
			component: Login
		},
		{
			path: '/film-rating-list',
			name: 'FilmRating',
			component: FilmRating
		},
		{
			path: '/search',
			name: 'Search',
			component: Search
		},
		{
			path: '/films',
			name: 'Films',
			component: Films
		},
		{
			path: '/actors',
			name: 'Actors',
			component: Actors
		},
		{
			path: '/film_introduction',
			name: 'Film Introduction',
			component: FilmIntroduction
		},
		{
			path: '/zsgc',
			name: 'ZSGC',
			component: ZSGC
		},
	]
});