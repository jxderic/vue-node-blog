<template>
  <section class="list-box">
    <div class="total">
      <span>留言总数：</span>
      <span class="total-num">{{comments.length}}</span>
    </div>
    <ul class="comment-wrap">
      <items v-for="(item, index) in comments" :key="item.name + item.time" :comment="item" :index="index"></items>
    </ul>
  </section>
</template>
<script>
import items from './items'
export default {
  name: 'CommentList',
  props: {
    comments: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  components: {
    items
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
  .total {
    line-height: 40px;
    border-bottom: 1px dashed #bba477;
    span {
      vertical-align: middle;
      color: #bba477;
    }
    .total-num {
      color: #c1866a;
    }
  }
</style>
