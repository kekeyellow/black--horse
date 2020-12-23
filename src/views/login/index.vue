<template>
  <div>
    <van-nav-bar title='登录' left-arrow @click-left='$router.back()' />
    <van-form
    :show-error="false"
    :show-error-message="false"
    ref="login-form"
    @submit="onLogin"
    validate-first
    @failed="onFailed">
      <van-field
        v-model='user.mobile'
        left-icon='phone-o'
        name='mobile'
        placeholder='   用户名'
        :rules='formRules.mobile'
      />
      <van-field
        v-model='user.code'
        type='password'
        name='code'
        class='iconfont iconyanzhengma'
        placeholder='   请输入验证码'
        :rules='formRules.code'
      >
        <template #button>
          <van-count-down class='send-btn' round v-if='isCountDownShow' :time='1000*10' format='ss s' @finish="isCountDownShow = false"/>
          <van-button v-else round class='send-btn' @click.prevent='onSendSms'
           :loading="isSendSmsLoading">获取验证码</van-button>
        </template>
      </van-field>
      <div class="loginbtn">
        <van-button round block type='info' native-type='submit' >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '17090086870',
        code: '246810'
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
      },
      isSendSmsLoading: false,
      isCountDownShow: false
    }
  },

  components: {},

  computed: {},
  mounted: {},
  methods: {
    async onLogin () {
      this.$toast.loading({
        duration: 1, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const { data } = await login(this.user)
        console.log('登录成功', data)
        this.$store.commit('setUser', data.data)
        this.$router.push('my')
      } catch (err) {
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false
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
.loginbtn{
  margin-top: 200px;
}
</style>
