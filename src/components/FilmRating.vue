<template>
	<div class="film-rating">
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
			<h1>Film Rating List</h1>
			<!-- 其他内容可以在这里添加 -->
		</main>
	</div>
</template>

<script>
	export default {
		name: 'FilmRating',
		data() {
			return{
				user: JSON.parse(localStorage.getItem('user')) || null // 从localStorage获取用户信息
			}
		},
		methods: {
			
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
		/* 确保所有元素的边距和内边距被包含在元素的总宽度和高度内 */
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background: #e6e7f9;
	}

	/* 导航菜单容器样式 */
	.nav-container {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	/* 导航菜单样式 */
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
		/* 添加过渡效果 */
	}

	nav a:hover {
		color: #8a2be2;
		/* 悬停时字体变色 */
		border-bottom: 2px solid #8a2be2;
		/* 悬停时添加底部边框 */
	}

	/* 用户账户链接和头像容器样式 */
	.account {
		display: flex;
		align-items: center;
		gap: 10px;
		/* 调整链接和头像之间的间距 */
	}

	.account a {
		color: #8a2be2;
		text-decoration: none;
	}

	.profile {
		display: flex;
		align-items: center;
		gap: 10px;
		/* 调整头像和文本之间的间距 */
	}

	.profile img {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		background-color: #d8d8d8;
		/* 设置背景颜色，以便更好地显示圆形 */
		padding: 5px;
		/* 调整内边距 */
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
</style>