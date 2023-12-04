<template>
  <view class="content">
    <p>这是一个示例页面</p>
    <button @click='goBack'>返回上个页面</button>
    <button @click="apiTest">接口测试</button>
    <button @click="login">防抖</button>
    <button @click="handIn">节流</button>
  </view>
</template>

<script>
  import { ref } from 'vue'; // 导入 ref
  import { testApi } from '@/api/test-api.js';
  import { debounce, throttle } from '@/utils/index.js';

  export default {
    setup() {
      const handIn = throttle(() => {
        console.log("提交成功");
      }, 1000);

      const login = debounce(() => {
        console.log("登陆成功");
      }, 500);

      function goBack() {
        uni.navigateBack();
      }

      function apiTest() {
        return testApi.getTestInfo();
      }

      return {
        goBack,
        apiTest,
        login,
        handIn 
      };
    }
  };
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
