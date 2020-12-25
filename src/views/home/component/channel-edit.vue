<!--  -->
<template>
  <div class="container">
    <van-cell>
      <div slot="title">我的频道</div>
      <van-button plain type="danger" mini round class="bianji" @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :column-num="4">
      <van-grid-item class="shanchu"
      :icon="isEdit && index !== 0 ? 'clear' : ''"
      :class="{active: index === active}"
      :text="title.name" v-for="(title,index) in channels" @click="onUserChannelClick(index,title)"
      :key="index"/>
    </van-grid>
    <van-cell>
      <div slot="title">推荐频道</div>
    </van-cell>
    <van-grid :column-num="4">
      <van-grid-item
      :text="title.name" v-for="(title,index) in recommendChannels"
      :key="index" class="bgq" @click="onAdd(title)"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/article'
import { addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    channels: {
      type: Object,
      require: true
    },
    active: {
      type: Number,
      requird: true
    }
  },
  components: {},

  created () {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channels => {
        return !this.channels.find(channel => {
          return channel.id === channels.id
        })
      })
    }
  },

  mounted: {},

  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAdd (title) {
      this.channels.push(title)
      try {
        if (this.user) {
          addUserChannel({
            id: title.id,
            seq: this.channels.length
          })
          this.$toast('添加成功')
        } else {
          setItem('TOUTIAO_CHANNELS', this.Channels)
        }
      } catch (err) {
        this.$toast.fail('保存失败，请稍后重试')
      }
    },
    onUserChannelClick (index, title) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index, title)
      } else {
        this.switchChannel(index)
      }
    },
    async deleteChannel (index, channel) {
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.channels.splice(index, 1)
      try {
        if (this.user) {
          await deleteUserChannel(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.userChannels)
        }
      } catch (err) {
        this.$toast.fail('嗯')
      }
    },
    switchChannel (index) {
      console.log('切换了' + index)
      this.$emit('update-active', index)
      this.$emit('close')
    }
  }
}
</script>
<style lang='less' scoped>
  .container{
    margin-top: 47px;
  }
  .bianji{
    height: 20px;
    color: #fcacac;
  }
  .van-button--danger {
    border: 1px solid #fcacac;
  }
  /deep/.van-grid-item__content {
    width: 70px;
    height: 43px;
    margin-left: 13px;
    margin-top: 13px;
    border-radius: 10%;
    background-color: pink;
  }
   /deep/ .van-grid-item__icon {
   position: absolute;
   top: -7px;
   right: -4px;
   font-size: 19px;
   }
  /deep/ .van-grid-item__text {
    margin-top: 0px;
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
</style>
