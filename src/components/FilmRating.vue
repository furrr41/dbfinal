<template>
	<div class="film-rating">
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
			<h1>FindFilms TOP-100</h1> <br />
			<div class="card-container">
				<el-card class="box-card" v-for="(movie, index) in paginatedMovies" :key="movie.workId" >
					<div class="card-content">
						<img src="@/assets/poster1.jpg" alt="Movie Poster" class="movie-poster" @click="goToDetail(movie.workId, movie.ordering)"/>
						<div class="movie-details">
							<div class="rank">{{ index + 1 + (currentPage - 1) * pageSize }}</div>
							<p><strong>标题:</strong> {{ movie.title }}</p>
							<p><strong>评分:</strong> {{ movie.rating }}</p>
							<p><strong>上映年份:</strong> {{ movie.startYear }}</p>
							<p><strong>编号:</strong> {{ movie.workId }}</p>
						</div>
					</div>
				</el-card>
			</div>
			<el-pagination
				:current-page="currentPage"
				:page-size="pageSize"
				:total="totalMovies"
				layout="prev, pager, next"
				@current-change="handlePageChange"
			>
			</el-pagination>
		</main>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'FilmRating',
		data() {
			return {
				user: JSON.parse(localStorage.getItem('user')) || null, // 从localStorage获取用户信息
				movies: [], // 存储电影信息
				currentPage: 1,
				pageSize: 10, // 每页显示的电影数量
			};
		},
		computed: {
			paginatedMovies() {
				const start = (this.currentPage - 1) * this.pageSize;
				return this.movies.slice(start, start + this.pageSize);
			},
			totalMovies() {
				return this.movies.length;
			}
		},
		created() {
			this.fetchMovies();
		},
		methods: {
			fetchMovies() {
				axios.get('http://123.60.134.9:8080/api/movies/top-rated-with-number', {
						params: {
							number: 100
						}
					})
					.then(response => {
						this.movies = response.data; // 假设返回的数据是电影对象的数组
					})
					.catch(error => {
						console.error('Error fetching movies:', error);
					});
			},
			goHome() {
				this.$router.push('/');
			},
			logout() {
				localStorage.removeItem('user');
				this.user = null;
				this.$router.push('/login');
			},
			handlePageChange(page) {
				this.currentPage = page;
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
		height: 40px;
		width: 40px;
		border-radius: 50%;
		background-color: #d8d8d8;
		padding: 5px;
	}

	.minilogo {
		height: 50px;
		cursor: pointer;
	}

	.account>a:hover {
		text-decoration: underline;
	}

	main {
		padding: 20px;
	}

	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		max-width: 1000px;
		margin: 0 auto;
	}

	.box-card {
		width: 100%;
		cursor: pointer;
	}

	.card-content {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: center;
	}

	.movie-poster {
		width: auto;
		height: 150px;
		margin-right: 20px;
	}

	.rank {
		font-size: 24px;
		color: #e91e63;
		font-weight: bold;
		margin-bottom: 10px;
		text-align: center;
	}

	.movie-details {
		flex: 1;
		text-align: center;
	}

	.movie-details p {
		margin: 5px 0;
	}

	.text {
		font-size: 14px;
	}

	.item {
		padding: 18px 0;
	}
</style>
