<template>
	<div class="login-page">
		<img src="@/assets/fflogo.png" alt="Logo" class="logo" @click="goHome" />
		<div class="login-form">
			<h1>Sign In</h1>
			<p>Start your films journey!</p>
			<!-- <form @submit.prevent="submitForm"> -->
			<form>
				<input type="text" v-model="username" placeholder="Username" required />
				<input type="password" v-model="password" placeholder="Password" required />
				<button type="submit" @click="doSubmit()">Sign In</button>
			</form>
			<p>Don't have an account? &nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/register">Sign Up</router-link></p>
		</div>
		<div class="image-placeholder"></div>
	</div>
</template>

<script>
	import axios from 'axios';
	import api from '@/api/api';
	import qs from 'qs'; // 确保正确导入 qs 库

	export default {
		data() {
			return {
				username: '',
				password: ''
			};
		},
		methods: {
			doSubmit() {
			    let url = "http://123.60.134.9:8080/api/user/login";
			    let params = {
			        username: this.username,
			        password: this.password
			    }
			    axios.post(url, qs.stringify(params))
			        .then(response => {
			            console.log(response);
			            if (response.data.status === 'success') {
			                const { info } = response.data;
			                // 存储用户信息
			                localStorage.setItem('user', JSON.stringify(info));
			                // 更新应用状态
			                this.$emit('login', info);
			                // 重定向到主页
			                this.$router.push('/');
			            } else {
			                alert('Login failed. Please check your credentials.');
			            }
			        })
			        .catch(e => {
			            console.error('Error logging in:', e);
			            alert('Login failed. Please check your credentials.');
			        });
			},

			// submitForm() {
			//     api.login({
			//             username: this.username,
			//             password: this.password
			//         })
			//         .then(response => {
			//             if (response.data.status === 'success') {
			//                 const { info } = response.data;
			//                 // 存储用户信息
			//                 localStorage.setItem('user', JSON.stringify(info));
			//                 // 更新应用状态
			//                 this.$emit('login', info);
			//                 // 重定向到主页
			//                 this.$router.push('/');
			//             } else {
			//                 alert('Login failed. Please check your credentials.');
			//             }
			//         })
			//         .catch(error => {
			//             console.error('Error logging in:', error);
			//             alert('Login failed. Please check your credentials.');
			//         });
			// },
			goHome() {
				this.$router.push('/');
			}
		}
	};
</script>

<style scoped>
	.login-page {
		display: flex;
		height: 100vh;
	}

	.login-form {
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
		color: #a9afba;
		margin: 20px 0;
	}

	.logo {
		position: absolute;
		width: 20vw;
		left: 40px;
		top: 15px;
		cursor: pointer;
	}
</style>