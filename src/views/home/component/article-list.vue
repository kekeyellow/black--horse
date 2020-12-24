<!--  -->
<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <article-item  v-for="articlea in articles"
          :article='articlea' :key="articlea.art_id"/>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '../../../components/article-item/'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false, // 下拉刷新的 loading 状态
      refreshSuccessText: '',
      scrollTop: 0
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },

  components: {
    ArticleItem
  },

  computed: {},

  mounted: {},

  methods: {
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道 ID
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      const { results } = data.data
      this.articles.push(...results)
      this.loading = false
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把加载状态设置结束，不再触发加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新，组件自己就会展示 loading 状态
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道的Id
        timestamp: Date.now(), // 为了大家方便学习，只要你传递不同的时间戳就一定给你返回不一样的数据，而且数据不为空
        with_top: 1
      })
      // 2. 把数据放到数据列表中（往顶部追加）
      const { results } = data.data
      this.articles.unshift(...results)
      // 3. 关闭刷新的状态 loading
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}

</script>
<style lang='less' scoped>
.article-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 96px;
    bottom: 50px;
    overflow-y: auto;
    z-index: 66;
  }
</style>
