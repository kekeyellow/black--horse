<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#3296fa"
      placeholder="请输入搜索关键词"
    />
  <van-tabs v-model="active" class="tabtitle">
     <van-tab
       :title="channel.name"
       v-for="channel in channels"
       :key="channel.id"
     >
       <article-list :channel="channel"></article-list>
     </van-tab>
  </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './component/article-list'
export default {
  name: 'article',
  data () {
    return {
      active: 0,
      channels: []
    }
  },

  components: {
    ArticleList
  },
  created () {
    this.getUserlist()
  },
  computed: {},

  mounted: {},

  methods: {
    async getUserlist () {
      console.log('ceshide')
      const { data } = await getUserChannels()
      console.log(data)
      this.channels = data.data.channels
    }
  }
}

</script>
<style lang='less' scoped>
  .tabtitle {
    height: 41px;
  }

</style>
