<template>
  <div>
    <van-nav-bar title='登录' left-arrow @click-left='$router.back()' />
    <van-form @submit='onLogin'>
      <van-field
        v-model='mobile'
        left-icon='phone-o'
        name='mobile'
        placeholder='   用户名'
        :rules='formRules.mobile'
      />
      <van-field
        v-model='code'
        type='password'
        name='code'
        class='iconfont iconyanzhengma'
        placeholder='   请输入验证码'
        :rules='formRules.code'
      >
        <template #button>
          <van-button round class='send-btn'>获取验证码</van-button>
        </template>
      </van-field>
    </van-form>
    <div style='margin: 16px;'>
      <van-button round block type='info' native-type='submit'>提交</van-button>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { require: true, message: '请输入手机号' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },

  components: {},

  computed: {},
  mounted: {},

  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录中...', // 提示文本
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        // const { data } = await login(this.user);
        this.$toast.success('登录成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.send-btn {
  background-color: #ededed;
  width: 100px;
  height: 30px;
}
.iconyanzhengma:before {
  display: flex;
  align-items: center;
  text-align: center;
}
</style>
