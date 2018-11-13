<template>
  <section class="reply-box">
    <i class="el-icon-error reply-close" v-if="replyNum" @click="closeReply"></i>
    <h2 class="reply-title">{{replyNum ? '回复评论' : '发表评论'}}</h2>
    <div class="content">
        <el-form :model="comment" :rules="rules" ref="form" label-position="top" class="form">
            <el-form-item label="说点什么吧：" prop="desc">
                <el-input type="textarea" v-model="comment.desc" placeholder="Say something"></el-input>
            </el-form-item>
            <el-form-item label="昵称（必须）：" prop="name">
                <el-input type="text" v-model="comment.name" placeholder="昵称会被公开显示"></el-input>
            </el-form-item>
            <el-form-item label="url：" prop="url">
                <el-input type="text" v-model="comment.url" placeholder="Url将会当做名字外链使用"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" class="submit-btn" round @click="replyNum ? reply() : submitForm('form')">发表评论</el-button>
            </el-form-item>
        </el-form>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import util from '../../../../utils/util.js'
export default {
  data() {
    return {
      comment: {
        desc: '',
        name: '',
        url: '',
        head: '',
        time: null,
        childNode: [{
          desc: '333',
          name: 'eee',
          url: '',
          head: '',
          time: null
        }]
      },
      rules: {
        desc: [
          { required: true, message: '请填写评论', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  computed: {
    ...mapGetters(['replyNum'])
  },
  methods: {
    ...mapActions(['addComment']),
    ...mapMutations({
      changeReply: 'BLOGREPLY'
    }),
    closeReply() {
      this.changeReply(0);
    },
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          try {
            this.comment.head = util.getRandom(1, 4) + '.jpg';
            this.comment.time = new Date();
            const info = { _id: this.$route.params.id, comment: this.comment };
            await this.addComment(info);
            await this.$store.dispatch('getBlogInfo', this.$route.params.id);
            this.$refs[formName].resetFields();
            this.loading = false;
          } catch (e) {
            this.loading = false
          }
        } else {
          console.log('error submit!!');
          this.loading = false;
          return false;
        }
      });
    },
    reply() {

    }
  }
}
</script>
<style lang="less" scoped>
  .reply-box {
    position: relative;
  }
  .reply-title {
    text-align: center;
    padding: 20px 0;
    font-size: 24px;
    color: #c1866a;
  }
  .reply-close {
    position: absolute;
    right: 0;
    top: 10px;
    color: #bba477;
    font-size: 28px;
  }
  .submit-btn {
    display: block;
    margin: 0 auto;
  }
</style>
