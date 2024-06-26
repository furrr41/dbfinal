<template>
	<div class="search">
		<!-- 页面头部 -->
		<header>
			<!-- 菜单图标 -->
			<img src="@/assets/fflogo.png" alt="Logo" class="minilogo" />
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
			<h1>Search</h1>
			<!-- 搜索框和按钮 -->
			<div class="search-container">
				<el-input v-model="input" placeholder="请输入电影名称" style="width: 600px;"></el-input>
				<el-button type="primary" plain @click="searchFilm">搜索</el-button>
			</div>
			<!-- 搜索结果表格 -->
			<div class="search-results" v-if="movies.length > 0">
				<h2>搜索结果：</h2>
				<div class="table-container">
					<el-table :data="movies" border style="width: 100%">
						<el-table-column prop="title" label="电影名">
							<template slot-scope="scope">
								<router-link
									:to="{ name: 'Film Introduction', params: { id: scope.row.workId, ordering: scope.row.ordering } }">{{ scope.row.title }}</router-link>
							</template>
						</el-table-column>
						<el-table-column prop="startyear" label="上映年份"></el-table-column>
						<el-table-column prop="genres" label="类型"></el-table-column>
						<el-table-column prop="region" label="地区"></el-table-column>
						<el-table-column prop="workId" label="编号"></el-table-column>
					</el-table>
				</div>
			</div>
			<div v-else-if="searched">
				<p>未找到相关电影</p>
			</div>
		</main>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'Search',
		data() {
			return {
				user: JSON.parse(localStorage.getItem('user')) || null, // 从localStorage获取用户信息
				input: '',
				movies: [],
				searched: false
			}
		},
		methods: {
			searchFilm() {
				axios.get('http://123.60.134.9:8080/api/movie/getFilmByTitle', {
						params: {
							title: this.input
						}
					})
					.then(response => {
						this.movies = response.data; // 假设返回的数据是电影对象的数组
						console.log("返回的数据是：\n", response.data);
						this.searched = true;
					})
					.catch(error => {
						console.error('Error fetching movies:', error);
						this.searched = true;
					});
			},
			logout() {
				// 移除localStorage中的用户信息
				localStorage.removeItem('user');
				// 清除当前组件的用户状态
				this.user = null;
				// 刷新页面或导航到登录页面
				this.$router.push('/login');
			},
			goHome() {
				this.$router.push('/');
			}
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
	}

	.account>a:hover {
		text-decoration: underline;
	}

	main {
		padding: 20px;
	}

	.search-container {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
	}

	.search-results {
		margin-top: 20px;
	}

	.search-results h2 {
		margin-bottom: 10px;
	}

	.table-container {
		width: 1000px;
		margin: 0 auto;
		/* 居中对齐 */
	}

	.search-results ul {
		list-style: none;
		padding: 0;
	}

	.search-results li {
		margin: 5px 0;
	}

	.search-results a {
		text-decoration: none;
		color: #555;
		transition: color 0.3s;
	}

	.search-results a:hover {
		color: #8a2be2;
	}
</style>