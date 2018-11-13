<template>
  <li>
    <div class="comment-container">
      <div class="head" v-if="comment.head">
        <img :src="require(`src/images/${comment.head}`)" alt="头像">
      </div>
      <div class="comment">
        <div class="info">
          <a class="name" :href="comment.url" target="_blank">{{comment.name}}</a>
          <span class="time">{{$moment(comment.time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          <span class="reply" @click="reply(index)">回复</span>
        </div>
        <p class="content">{{comment.desc}}</p>
      </div>
    </div>
    <ul v-if="comment.childNode">
      <li v-for="item in comment.childNode" :key="item.name + item.time" :comment="item" class="child-li">
        <div class="comment-container">
          <div class="head" v-if="item.head">
            <img :src="require(`src/images/${item.head}`)" alt="头像">
          </div>
          <div class="comment">
            <div class="info">
              <a class="name" :href="item.url" target="_blank">{{item.name}}</a>
              <span class="time">{{$moment(item.time).format('YYYY-MM-DD HH:mm:ss')}}</span>
              <span class="reply" @click="reply(index)">回复</span>
            </div>
            <p class="content">{{item.desc}}</p>
          </div>
        </div>
      </li>
    </ul>
    <comment-input v-if="replyNum === index + 1"></comment-input>
  </li>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import CommentInput from '../CommentInput/index'
export default {
  name: 'items',
  props: {
    comment: {
      type: Object
    },
    index: {
      type: Number,
      default: 0
    }
  },
  components: {
    CommentInput
  },
  computed: {
    ...mapGetters(['replyNum'])
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      changeReply: 'BLOGREPLY'
    }),
    reply(index) {
      this.changeReply(index + 1);
    }
  }
};
</script>
<style lang="less" scoped>
li {
  padding: 0.1rem 0;
  border-bottom: 1px dashed #bba477;

  .child-li {
    border-bottom: none;
    padding: 0;
    margin: 20px 0;
    width: calc(~"100% - 30px");
    padding-left: 30px;
  }

  .comment-container {
    display: flex;
  }

  .head {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  .comment {
    padding-left: 10px;
    width: calc(~"100% - 30px");
    font-size: 12px;
    line-height: 16px;
    color: #bba477;
  }
}
.info {
  .name {
    color: #c1866a;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }
  .time {
    color: #bab2b2;
    margin-left: 6px;
  }
  .reply {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
