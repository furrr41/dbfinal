<template>
	<div class="movie-detail">
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
			<div class="movie-header">
				<el-button class="back-button" @click="goBack" icon="el-icon-arrow-left">返回</el-button>
				<h1 class="movie-title">{{ themovie.title }}</h1>
			</div>
			<div class="movie-content">
				<div class="movie-image">
					<img src="@/assets/poster.jpg" alt="Movie Image" />
				</div>
				<div class="movie-details">
					<p><strong>类型:</strong> {{ themovie.genres }}</p>
					<p><strong>上映时间:</strong> {{ themovie.startyear }}</p>
					<p><strong>主演:</strong> {{ thecrewnames.join(',  ') }}</p>
					<p><strong>评分:</strong> {{ themovie.rating }}</p>
					<el-rate v-model="rating" show-text></el-rate>
					<el-row class="buttons">
						<el-button type="warning" icon="el-icon-star-off" circle></el-button>
						<el-button type="primary" icon="el-icon-edit" circle></el-button>
					</el-row>
				</div>
			</div>
			<div class="comments-section">
				<div class="input-container">
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
					</el-input>
					<el-button type="success" icon="el-icon-check" circle class="submit-button" @click="submitComment"></el-button>
				</div>
				<el-card class="box-card" v-for="comment in paginatedComments" :key="comment.id">
					<div class="comment">
						<!-- <img :src="comment.avatar" alt="Avatar" class="avatar" /> -->
						<div class="comment-content">
							<!-- <p><strong>{{ comment.userId }}</strong></p> -->
							<p>{{ comment.content }}</p>
						</div>
					</div>
				</el-card>
				<el-pagination layout="prev, pager, next" :current-page="currentPage" :page-size="pageSize"
					@current-change="handlePageChange" :total="totalComments">
				</el-pagination>
			</div>
		</main>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	
	export default {
		name: 'MovieDetail',
		data() {
			return {
				user: JSON.parse(localStorage.getItem('user')) || null, // 从localStorage获取用户信息
				
				themovie: {},
				thecrewnames: [],
				thecomments: [],
				
				rating: 0,
				textarea: '',
				currentPage: 1,
				pageSize: 8, // 每页显示8条评论
			};
		},
		created() {
			console.log("这是introduction，所以我的数据呢？");
			this.fetchMovieDetails();
		},
		
		computed: {
			paginatedComments() {
				const start = (this.currentPage - 1) * this.pageSize;
				return this.thecomments.slice(start, start + this.pageSize);
			},
			totalComments() {
				return this.thecomments.length;
			}
		},
		methods: {
			fetchMovieDetails() {
				const workId = this.$route.params.id;
				const ordering = this.$route.params.ordering;
				console.log("workId是：", workId);
				console.log("ordering是：", ordering);
				axios.get(`http://123.60.134.9:8080/api/movies/getFilmById`, {
					params: {
						id: workId,
						ordering: ordering
					}
				})
				.then(response => {
					console.log(response.data);
					this.themovie = response.data.film;
					console.log("themovie如下：\n:", this.themovie);
					this.thecrewnames = response.data.crewnames;
					console.log("thecrewnames如下：\n:", this.thecrewnames);
					this.thecomments = response.data.comments;
					console.log("thecomments如下：\n:", this.thecomments);
				})
				.catch(error => {
					console.error('Error fetching movie details:', error);
				});
			},
			submitComment() {
				if (!this.user) {
					this.$message.error('请先登录再发表评论');
					return;
				}

				const filmId = this.themovie.workId;
				const userName = this.user.userName;
				const content = this.textarea;

				if (!content.trim()) {
					this.$message.error('评论内容不能为空');
					return;
				}

				axios.post('http://123.60.134.9:8080/api/user/comment', qs.stringify({
					filmId,
					userName,
					content
				}))
				.then(response => {
					this.$message.success('评论提交成功');
					this.thecomments.push({
						id: Date.now(), // 模拟一个评论ID，可以在后端生成并返回
						content
					});
					this.textarea = '';
					this.currentPage = Math.ceil(this.totalComments / this.pageSize); // 刷新到最后一页
				})
				.catch(error => {
					this.$message.error('评论提交失败，请重试');
					console.error('Error submitting comment:', error);
				});
			},
			logout() {
			  localStorage.removeItem('user');
			  this.user = null;
			  this.$router.push('/login');
			},
			
			goHome() {
				this.$router.push('/');
			},
			goBack() {
				this.$router.go(-1);
			},
			handlePageChange(page) {
				this.currentPage = page;
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
		padding: 30px 180px;
	}

	.movie-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		position: relative;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.movie-title {
		text-align: center;
		flex: 1;
	}

	.back-button {
		position: absolute;
		top: 0;
		left: 0;
		margin-top: 10px;
		font-size: 12px;
		padding: 5px 10px;
	}

	.movie-content {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.movie-image img {
		max-width: 300px;
	}

	.movie-details {
		text-align: left;
		padding: 0 0 0 30px;
		max-width: 400px;
	}

	.movie-details p {
		margin: 10px 0;
	}

	.buttons {
		margin-top: 20px;
	}

	.comments-section {
		margin-top: 40px;
		max-width: 1200px;
		margin: 40px auto 0 auto;
	}

	.comment {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.comment-content {
		flex: 1;
	}

	.box-card {
		margin-top: 20px;
		text-align: left;
	}

	.input-container {
		display: flex;
		align-items: center;
		margin-top: 20px;
		column-gap: 20px;
		max-width: 1200px;
		margin: 40px auto 0 auto;
	}

	.submit-button {
		margin-left: auto;
		/* 使按钮右对齐 */
	}
</style>
