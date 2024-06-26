<template>
	<div class="films">
		<!-- 页面头部 -->
		<header>
			<!-- 菜单图标 -->
			<img src="@/assets/fflogo.png" alt="Logo" class="minilogo" @click="goHome"/>
			<!-- 导航菜单 -->
			<nav class="nav-container">
				<ul>
					<li><router-link to="/film-rating-list">Film rating list</router-link></li>
					<li><router-link to="/films">Films</router-link></li>
					<li><router-link to="/actors">Actors</router-link></li>
					<li><router-link to="/search">Search</router-link></li>
				</ul>
			</nav>
			<!-- 用户账户信息 -->
			<div class="account">
				<a v-if="!user" href="#" @click="$router.push('/register')">Do not have an account yet?</a>
				<div v-if="user" class="profile">
					<!-- 用户头像 -->
					<img src="@/assets/logo.png" alt="Profile" />
					<span>{{ user.userName }}</span>
					<button @click="logout">Logout</button>
				</div>
			</div>
		</header>

		<!-- 页面主体内容 -->
		<main>
			<h1>Films</h1>

			<!-- 类型选择框 -->
			<div class="type-select">
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
					@change="handleCheckAllChange">全选</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypesChange">
					<el-checkbox v-for="type in types" :label="type.value"
						:key="type.value">{{type.label}}</el-checkbox>
				</el-checkbox-group>
			</div>

			<!-- 电影列表容器 -->
			<div class="movie-container">
				<div class="movie-grid">
					<div v-for="movie in paginatedMovies" :key="movie.workId" class="movie-item">
						<img src="@/assets/poster.jpg" @click="goToDetail(movie.workId, movie.ordering)" />
						<p>{{ movie.title }}</p> <br />
						<p>{{ movie.workId }}</p>
					</div>
				</div>
			</div>

			<!-- 分页组件 -->
			<div class="pagination">
				<el-pagination layout="prev, pager, next" :current-page="currentPage" :page-size="pageSize"
					@current-change="handlePageChange" :total="totalMovies">
				</el-pagination>
			</div>
		</main>
	</div>
</template>

<script>
	import axios from 'axios';

	const typeOptions = [{
			value: 'Action',
			label: '动作'
		},
		{
			value: 'Crime',
			label: '犯罪'
		},
		{
			value: 'Drama',
			label: '剧情'
		},
		{
			value: 'Romance',
			label: '爱情'
		},
		{
			value:'Comedy',
			label:'喜剧'
		},
		{
			value:'War',
			label:'战争'
		},
		{
			value:'Adventure',
			label:'冒险'
		},
		{
			value:'Animation',
			label:'动漫'
		},
		// 更多类型
	];

	export default {
		name: 'Films',
		data() {
			return {
				user: JSON.parse(localStorage.getItem('user')) || null, // 从localStorage获取用户信息
				checkAll: false,
				checkedTypes: ['Action', 'Comedy'],
				types: typeOptions,
				isIndeterminate: true,
				movies: [],  // 从后端获取电影信息
				currentPage: 1,
				pageSize: 9,
				totalMovies: 0,
			};
		},
		created() {
			console.log("Films组件被创建了，好玩吗？我快死了。")
		},
		computed: {
			paginatedMovies() {
				const start = (this.currentPage - 1) * this.pageSize;
				return this.movies.slice(start, start + this.pageSize);
			}
		},

		methods: {
			fetchMovies() {
				const imagePath = require('@/assets/poster.jpg');
				axios.get('http://123.60.134.9:8080/api/movies/top-rated-with-number', {
						params: {
							number: 200
						}
					})
					.then(response => {
						const allMovies = response.data; // 假设返回的数据是电影数组
						console.log(allMovies);
						this.movies = allMovies.filter(movie => this.checkedTypes.includes(movie.genres));
						this.totalMovies = this.movies.length;
					})
					.catch(error => {
						console.error('Error fetching movies:', error);
					});
			},
			handlePageChange(page) {
				this.currentPage = page;
			},
			handleCheckAllChange(val) {
				this.checkedTypes = val ? this.types.map(type => type.value) : [];
				this.isIndeterminate = false;
				this.fetchMovies();
			},
			handleCheckedTypesChange(value) {
				const checkedCount = value.length;
				this.checkAll = checkedCount === this.types.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
				this.fetchMovies();
			},
			goToDetail(workId, ordering) {
				this.$router.push({
					name: 'Film Introduction',
					params: {
						id: workId,
						ordering: ordering
					}
				});
			},
			goHome() {
				this.$router.push('/');
			},
			logout() {
				// 移除localStorage中的用户信息
				localStorage.removeItem('user');
				// 清除当前组件的用户状态
				this.user = null;
				// 刷新页面或导航到登录页面
				this.$router.push('/login');
			}
		},
		mounted() {
			this.fetchMovies();
		}
	};
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background: #e6e7f9;
	}

	.nav-container {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	nav ul {
		list-style: none;
		display: flex;
		justify-content: space-around;
		width: 60%;
	}

	nav a {
		font-size: 16px;
		text-decoration: none;
		color: #555;
		padding: 5px;
		transition: color 0.3s, border-bottom 0.3s;
	}

	nav a:hover {
		color: #8a2be2;
		border-bottom: 2px solid #8a2be2;
	}

	.account {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.account a {
		color: #8a2be2;
		text-decoration: none;
	}

	.profile {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.profile img {
		height: 30px;
		width: 30px;
		border-radius: 50%;
		background-color: #d8d8d8;
		padding: 5px;
	}

	.minilogo {
		height: 50px;
	}

	.account>a:hover {
		text-decoration: underline;
	}

	main {
		padding: 10px 100px;
	}

	.type-select {
		margin-bottom: 20px;
	}

	.movie-container {
		max-width: 1300px;
		margin: 0 auto; /* 居中对齐 */
	}

	.movie-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.movie-item {
		width: 30%;
		margin-bottom: 20px;
		cursor: pointer;
	}

	.movie-item img {
		width: 100%;
	}

	.pagination {
		margin-top: 20px;
		display: flex;
		justify-content: center;
	}
</style>
