<template>
	<div class="zsgc">
		<!-- 页面头部 -->
		<header>
			<!-- 菜单图标 -->
			<img src="@/assets/fflogo.png" alt="Logo" class="minilogo" @click="goHome" />
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
			<h1>管理员后台</h1>
			<br />
			<div class="controls-container">
				<!-- 返回按钮 -->
				<el-button size="small" round v-if="isSearchActive" type="primary" plain
					@click="handleClear">返回</el-button>
				<div class="search-container">
					<el-input placeholder="请输入电影名称" v-model="searchQuery" clearable @clear="handleClear"
						@input="handleInput" class="search-input">
						<el-button slot="append" icon="el-icon-search" @click="searchMovie"></el-button>
					</el-input>
				</div>
			</div>
			<br />
			<!-- 添加按钮 -->
			<el-button type="success" plain @click="showAddDialog">添加电影</el-button>
			<br /><br /><br />
			<!-- 表格显示 -->
			<div class="table-container">
				<el-table :data="movies" border style="width: 100%">
					<el-table-column prop="title" label="电影名" />
					<el-table-column prop="region" label="地区" />
					<el-table-column prop="workId" label="编号" />
					<el-table-column prop="language" label="语言" />
					<el-table-column prop="startYear" label="上映年份" />
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="info" @click="editMovie(scope.row)">修改</el-button>
							<el-button type="danger" @click="confirmDelete(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!-- 修改对话框 -->
			<el-dialog title="修改电影信息" :visible.sync="dialogVisible">
				<el-form :model="currentMovie">
					<el-form-item label="电影名">
						<el-input v-model="currentMovie.title" disabled></el-input>
					</el-form-item>
					<el-form-item label="地区">
						<el-input v-model="currentMovie.region"></el-input>
					</el-form-item>
					<el-form-item label="编号">
						<el-input v-model="currentMovie.workId" disabled></el-input>
					</el-form-item>
					<el-form-item label="语言">
						<el-input v-model="currentMovie.language"></el-input>
					</el-form-item>
					<el-form-item label="上映年份">
						<el-input v-model="currentMovie.startyear"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="saveMovie">保存</el-button>
				</span>
			</el-dialog>

			<!-- 添加对话框 -->
			<el-dialog title="添加电影信息" :visible.sync="addDialogVisible">
				<el-form :model="newMovie">
					<el-form-item label="电影名">
						<el-input v-model="newMovie.title"></el-input>
					</el-form-item>
					<el-form-item label="地区">
						<el-input v-model="newMovie.region"></el-input>
					</el-form-item>
					<el-form-item label="语言">
						<el-input v-model="newMovie.language"></el-input>
					</el-form-item>
					<el-form-item label="上映年份">
						<el-input v-model="newMovie.startyear"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="addDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="addMovie">添加</el-button>
				</span>
			</el-dialog>
		</main>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';

	export default {
		name: 'ZSGC',
		data() {
			return {
				user: JSON.parse(localStorage.getItem('user')) || null, // 从localStorage获取用户信息
				movies: [], // 存储电影信息
				dialogVisible: false, // 控制修改对话框显示
				addDialogVisible: false, // 控制添加对话框显示
				currentMovie: {}, // 当前选中的电影信息
				newMovie: { // 新电影信息
					title: '',
					region: '',
					language: '',
					startyear: ''
				},
				searchQuery: '',
				isSearchActive: false, // 控制是否在搜索状态
			};
		},
		created() {
			console.log("zsgc组件说你好，恨来自zyq");
			this.fetchMovies();
		},
		methods: {
			fetchMovies() {
				axios.get('http://123.60.134.9:8080/api/movies/top-rated-with-number', {
						params: {
							number: 200
						}
					})
					.then(response => {
						this.movies = response.data; // 假设返回的数据是电影对象的数组
						this.isSearchActive = false; // 确保非搜索状态
					})
					.catch(error => {
						console.error('Error fetching movies:', error);
					});
			},
			searchMovie() {
				if (!this.searchQuery) {
					this.fetchMovies();
					return;
				}
				axios.get('http://123.60.134.9:8080/api/movie/getFilmByTitle', {
						params: {
							title: this.searchQuery
						}
					})
					.then(response => {
						this.movies = response.data; // 假设返回的数据是电影对象的数组
						this.isSearchActive = true; // 进入搜索状态
					})
					.catch(error => {
						console.error('Error searching movies:', error);
					});
			},
			editMovie(movie) {
				this.currentMovie = {
					...movie
				}; // 复制电影信息到当前电影
				this.dialogVisible = true; // 显示对话框
			},
			saveMovie() {
				axios.post('http://123.60.134.9:8080/api/movies/update', qs.stringify({
						workId: this.currentMovie.workId,
						ordering: this.currentMovie.ordering,
						region: this.currentMovie.region,
						language: this.currentMovie.language,
						startYear: this.currentMovie.startyear
					}))
					.then(response => {
						this.$message.success('电影信息修改成功');
						const index = this.movies.findIndex(m => m.workId === this.currentMovie.workId);
						if (index !== -1) {
							this.movies.splice(index, 1, this.currentMovie);
						}
						this.dialogVisible = false; // 关闭对话框
					})
					.catch(error => {
						this.$message.error('电影信息修改失败，请重试');
						console.error('Error updating movie:', error);
					});
			},
			confirmDelete(movie) {
				this.$confirm('此操作将永久删除该电影, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteMovie(movie.workId, movie.ordering);
				}).catch(() => {
					this.$message.info('已取消删除');
				});
			},
			deleteMovie(workId, ordering) {
				axios.post('http://123.60.134.9:8080/api/movies/delete', qs.stringify({
						workId: workId,
						ordering: ordering
					}))
					.then(response => {
						this.$message.success('电影删除成功');
						this.movies = this.movies.filter(movie => movie.workId !== workId);
					})
					.catch(error => {
						this.$message.error('电影删除失败，请重试');
						console.error('Error deleting movie:', error);
					});
			},
			showAddDialog() {
				this.newMovie = { // 重置新电影信息
					title: '',
					region: '',
					language: '',
					startyear: ''
				};
				this.addDialogVisible = true; // 显示添加对话框
			},
			addMovie() {
				axios.post('http://123.60.134.9:8080/api/movies/insert', qs.stringify({
						title: this.newMovie.title,
						region: this.newMovie.region,
						language: this.newMovie.language,
						startYear: this.newMovie.startyear
					}))
					.then(response => {
						this.$message.success('电影添加成功');
						this.movies.push({
							...this.newMovie,
							workId: response.data.workId // 假设后端返回新添加电影的workId
						});
						this.addDialogVisible = false; // 关闭对话框
					})
					.catch(error => {
						this.$message.error('电影添加失败，请重试');
						console.error('Error adding movie:', error);
					});
			},
			handleClear() {
				this.searchQuery = '';
				this.fetchMovies();
			},
			handleInput() {
				if (!this.searchQuery) {
					this.fetchMovies();
				}
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
	}

	.account>a:hover {
		text-decoration: underline;
	}

	main {
		padding: 20px;
	}

	.table-container {
		width: 1200px;
		margin: 0 auto;
		/* 居中对齐 */
	}

	.controls-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.search-container {
		display: flex;
		justify-content: center;
		/* 水平居中对齐 */
		flex: 1;
	}

	.search-input {
		width: 1000px;
	}
</style>