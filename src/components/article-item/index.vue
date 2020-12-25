<template>
  <van-cell>
    <div slot="title" class="title">{{article.title}}</div>
    <div slot="label">
      <div v-if='article.cover.type === 3'>
        <div
          class="tupian"
        >
          <van-image
            v-for="(img, index) in article.cover.images"
            :key="index"
            class="img"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="pinlun">
        <span>{{article.name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
    class="rightimg"
      v-if="article.cover.type === 1"
      fit="conver"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
  .tupian{
    display: flex;
    justify-content: space-around;
  }
  .img {
    flex: 1;
    width: 111px;
    height: 71px;
    &:not(:last-child) {
      padding-right: 4px;
    }
  }
  .rightimg{
    width: 106px;
    height: 76px;
  }
  .title{
    font-size: 16px;
  }
  .pinlun{
    font-size: 14px;
  }
  /deep/ .van-cell__value{
    flex: unset;
    width: 106px !important;
  }
</style>
