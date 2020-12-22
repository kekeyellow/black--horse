<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to='/'>首页的</van-tabbar-item>
      <van-tabbar-item icon="search" to='/qa'>问答</van-tabbar-item>
      <van-tabbar-item class="iconfont iconshipin" to='/video'>视频</van-tabbar-item>
      <van-tabbar-item class="iconfont iconwode" to='/my'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
