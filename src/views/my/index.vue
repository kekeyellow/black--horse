<template>
  <div class="my-contaniner">
    <div class="top" v-if="user">
      <van-cell-group class="header">
        <van-cell center>
          <van-image slot='icon' width="70" height="70" round class="image"
          fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div slot="title" class="title">黑马头条号</div>
          <van-button size="small" round to='/user/profile' class="updata-btn">编辑资料</van-button>
        </van-cell>
      </van-cell-group>
      <van-grid class="list-title" :border='false'>
        <van-grid-item  >
          <div slot="text">
            <div class="number">6</div>
            <div class="title-name">头条</div>
          </div>
        </van-grid-item >
        <van-grid-item  text="文字">
          <div slot="text">
            <div class="number">6</div>
            <div class="title-name">头条</div>
          </div>
        </van-grid-item >
         <van-grid-item  text="文字">
           <div slot="text">
             <div class="number">6</div>
             <div class="title-name">头条</div>
           </div>
         </van-grid-item >
          <van-grid-item  text="文字">
            <div slot="text">
              <div class="number">6</div>
              <div class="title-name">头条</div>
            </div>
          </van-grid-item >
      </van-grid>
    </div>
    <div class="container" v-else>
       <div class="header">
           <img src="./头像.png" alt="" class="logode">
         <div @click='denglu'> 登录 / 注册</div>
       </div>
    </div>
    <van-grid :column-num="2" class="xiantiao">
      <van-grid-item icon="star-o" text="收藏"  class="collect" />
      <van-grid-item icon="clock-o" text="文字"  class="lishi"/>
    </van-grid>
    <van-cell title="消息通知" is-link  class="tongzhi"/>
    <van-cell title="小智同学" is-link  class="tongxue"/>
    <van-cell title="推出登录" center class="loginout" v-if="user" @click="onlgin"/>

  </div>
</template>
<script>
import { Dialog } from 'vant'
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'myaaa',
  data () {
    return {
      currentUser: {}
    }
  },
  components: {},

  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadCurrentUser()
  },
  mounted: {},

  methods: {
    onlgin () {
      Dialog.confirm({
        title: '推出题是',
        message: '确认推出么'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {
      })
    },
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data
      console.log(data)
      console.log('2')
    },
    denglu () {
      console.log('1')
      this.$router.push('login')
    }
  }
}
</script>
<style lang='less' scoped>
  .title{
    font-size: 14px;
    margin-left: 15px;
    color: #fff;
  }
  .updata-btn{
    height: 16px;
    font-size: 10px;
    color: #666;
  }
  .header{
    height: 106px;
     box-sizing: border-box;
  }
  .tongzhi{
    height: 45px;
    border-bottom: 1px solid #f5f7f9;
  }
  .list-title{
    text-align: center;
    height: 60px;
    .number{
      font-size: 16px;
      color: #fff;
    }
  }
 .title-name {
    font-size: 11px;
    color: #fff;
  }
/deep/ .top{
    background-size: cover;
    // background-color: pink;
    z-index: 6;
    background: url("./banner.png") no-repeat !important;
  }
   /deep/.van-grid-item__content {
    background-color: unset;
  }
  /deep/.van-cell-group {
    background-color: unset;
  }
  /deep/.van-cell{
    background-color: unset;
  }
  .van-hairline--top-bottom::after {
    border: unset;
}
.image{
  padding: 20px 0 10px 6px;
}
.collect{
  color: red;
}
.lishi {
  color: pink;
}
.xiantiao {
  border-bottom: 6px solid #f5f7f6;
}
.loginout{
  text-align: center;
  color: red;
}
body{
  width: 100%;
  height: 100%;
}
.header{
  text-align: center;
  font-size: 13px;
  color: #fff;
  height: 166px;
  background:url('./banner.png') no-repeat;
}
.logode{
  width: 66px;
  height: 66px;
  margin-top: 45px;
}
</style>
