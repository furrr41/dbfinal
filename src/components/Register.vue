<template>
	<div class="register-page">
		<img src="@/assets/fflogo.png" alt="Logo" class="logo" @click="goHome" />
		<div class="register-form">
			<h1>Registration</h1>
			<p>Start your films journey!</p>
			<form @submit.prevent="submitForm">
				<input type="text" v-model="name" placeholder="Name" required />
				<input type="password" v-model="password" placeholder="Password" required />
				<button type="submit">Register</button>
			</form>
			<p>Already have an account? &nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/login">Sign In</router-link></p>
		</div>
		<div class="image-placeholder"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			};
		},
		methods: {
			submitForm() {
				// 这里应该调用后端 API 来处理注册
				// 你可以在这里添加一个请求到后端的示例
				console.log('Form submitted:', this.name, this.email, this.password, this.confirmPassword);
			},
			goHome() {
				this.$router.push('/');
			}
		}
	};
</script>

<style scoped>
	.register-page {
		display: flex;
		height: 100vh;
	}

	.register-form {
		flex: 1;
		padding: 50px;
		max-width: 400px;
		/* 限制表单区域的最大宽度 */
		margin: auto;
		/* 垂直居中 */
		text-align: left;
		/* 左对齐 */
	}

	.image-placeholder {
		width: 40vw;
		/* 固定宽度 */
		background-color: #e5e7f9;
		/* 暂时用颜色占位，后期可以替换成图片 */
	}

	h1 {
		font-size: 36px;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	input {
		margin-bottom: 15px;
		/* 增大输入框之间的距离 */
		padding: 12px;
		/* 增加输入框高度 */
		font-size: 16px;
		/* 调整输入框文字大小 */
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 100%;
		/* 增加输入框宽度 */
		box-sizing: border-box;
		/* 确保 padding 包含在宽度内 */
	}
	
	input:focus {
	  border: 2px solid #761ed4;
	  outline: none;
	}

	button {
		padding: 15px;
		/* 增加按钮高度 */
		font-size: 16px;
		/* 调整按钮文字大小 */
		color: white;
		background-color: #8a2be2;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		width: 100%;
		/* 确保按钮宽度与输入框一致 */
		box-sizing: border-box;
		/* 确保 padding 包含在宽度内 */
	}

	button:hover {
		background-color: #6930a3;
	}

	p {
		color:#a9afba;
		margin: 20px 0;
	}

	.logo {
		position: absolute;
		width:20vw;
		left: 40px;
		top: 15px;
		cursor: pointer;
	}
</style>