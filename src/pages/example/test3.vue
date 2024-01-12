<template>
  <div class="center-container">
    <div class="auth-switch-links">
      <span @click="switchAuthType('password')">密码验证</span>
      <span @click="switchAuthType('sms')">短信验证</span>
    </div>

    <div v-if="authType === 'password'">
      <!-- 密码验证相关内容 -->
    </div>

    <div v-else>
      <!-- 短信验证相关内容 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authType: 'password', // 初始默认为密码验证
      // ... 其他数据 ...
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
  },
};
</script>

<style scoped>
.auth-switch-links {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.auth-switch-links span {
  margin: 0 20px;
  cursor: pointer;
  color: #4caf50;
  text-decoration: underline;
}

.auth-switch-links span:hover {
  font-weight: bold;
}
</style>
