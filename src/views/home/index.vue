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
       <div slot="nav-right" class="zhezhaode"></div>
       <div
         slot="nav-right"
         @click="isChannelEditShow = true"
         class="wap-nav-wrap"
       >
        <van-icon name="wap-nav" />
       </div>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height: 100%"
    >
      <channel-edit :channels="channels" :active='active'
      @update-active="active = $event"
      @close="isChannelEditShow = false"
      ></channel-edit>
    </van-popup>
  </div>

</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './component/article-list'
import ChannelEdit from './component/channel-edit'
export default {
  name: 'article',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },

  components: {
    ArticleList,
    ChannelEdit
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
  /deep/ .wap-nav-wrap {
    height: 30px;
    width: 30px;
    position: fixed ;
    top: 66px;
    right: 0;
    z-index: 6;
    background-color: #fff;
    // flex: unset;
    // flex-shrink: unset;
  }
  .zhezhaode{
    height: 30px;
    width: 36px;
    flex-shrink: 0;
  }

</style>
