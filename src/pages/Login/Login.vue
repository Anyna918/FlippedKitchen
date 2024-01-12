<template>
	<div class="login-container">
		<h1 class="login-title">心动厨房</h1>
		<p class="login-notice">你的厨房管理小助手</p>

		<div class="auth-switch-links">
			<span @click="switchAuthType('password')"
				:class="{'auth-switch-links-selected' : authType === 'password'}">密码验证</span>
			<span @click="switchAuthType('sms')"
				:class="{'auth-switch-links-selected' : authType === 'sms'}">短信验证</span>
		</div>

		<form class="login-form" @submit.prevent="login" v-if="authType === 'password'">
			<!-- <label for="username" class="login-label">用户名</label> -->
			<input placeholder="手机号" type="text" id="username" v-model="username" class="login-input" required>

			<!-- <label for="password" class="login-label">密码</label> -->
			<input placeholder="密码" style="margin-top: 30px;" type="password" id="password" v-model="password"
				class="login-input" required>

			<div class="password-notice-container">
				<p class="password-notice">修改密码</p>
				<p class="password-notice">忘记密码</p>
			</div>

			<button type="submit" class="login-button">登录</button>

		</form>

		<form class="login-form" @submit.prevent="login" v-if="authType === 'sms'">
			<!-- <label for="username" class="login-label">用户名</label> -->
			<input placeholder="手机号" type="text" id="username" v-model="username" class="login-input" required>

			<div class="password-input-container">
				<input placeholder="验证码" style="margin-top: 30px;" type="password" id="password" v-model="password"
					class="login-input" required>
				<button @click="getVerificationCode()" class="verify-button">获取验证码</button>
			</div>

			<button type="submit" class="login-button">登录</button>

		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				authType: 'password',
			};
		},
		methods: {
			switchAuthType(type) {
				this.authType = type;
			},
			login() {
				// 登录逻辑
				if (this.authType === 'password') {
					// 密码验证
				} else if (this.authType === 'sms') {
					// 短信验证
				}
			},
			login_abandon() {
				// 在这里处理登录逻辑，可以发送请求到后端验证用户信息
				console.log('登录信息:', {
					username: this.username,
					password: this.password
				});

				// 以下是一个简单的示例，实际中需要替换成真实的登录逻辑
				if (this.username === 'demo' && this.password === 'password') {
					alert('登录成功');
				} else {
					alert('登录失败，请检查用户名和密码');
				}
			},
			getVerificationCode() {
				// 处理获取验证码的逻辑
				console.log('获取验证码');
			},
		},
	};
</script>

<style scoped>
	body {
		background: linear-gradient(to bottom, #88BFFF 0%, #FFFFFF 100%);
		
	}

	.login-container {
		max-width: 400px;
		margin: auto;
		padding: 20px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		/* background-color: #ffffff; */
		margin-top: 120px;
	}

	.login-title {
		text-align: center;
		font-size: 50px;
		/* color: #333; */
		color: #888eff;
	}

	.login-notice {
		/* color: #A7FB96; */
		text-align: center;
		/* color: #333; */
		font-size: 15px;
	}

	.login-form {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		margin-top: 20px;
	}

	.login-label {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 6px;
		color: #555;
	}

	.login-input {
		height: 30px;
		/* margin-top: 15px; */
		padding: 8px;
		/* margin-bottom: 12px; */
		border: 1px solid #333;
		border-radius: 8px;
		font-size: 17px;
	}

	.login-button {
		background-color: #8DA6EE;
		color: #fff;
		padding: 10px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		margin-top: 40px;
	}

	.auth-switch-links {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.auth-switch-links span {
		margin: 0 20px;
		cursor: pointer;
		color: #4E8AC6;

	}

	.auth-switch-links-selected {
		font-weight: bold;
		text-decoration: underline;
	}

	.password-notice-container {
		display: flex;
		align-items: center;

	}

	.password-notice {
		flex: 1;
		text-align: center;
		padding: 10px;
		opacity: 80%;
		text-decoration: underline;
	}

	.password-input-container {
		display: flex;
		align-items: center;
	}

	.verify-button {
		margin-top: 30px;
		width: 100px;
		height: 50px;
		font-size: 16px;
		padding: 0;
		padding-top: 5px;
		background-color: rgba(0, 0, 0, 0);
		/* 使用 rgba，其中最后一个参数 0.5 表示透明度为 0.5 */
		;
		border: 1px solid #333;
	}

	.verify-button:active {
		background-color: #4E8AC6;
	}
</style>