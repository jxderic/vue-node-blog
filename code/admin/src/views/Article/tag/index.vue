<template>
  <div class="tag-container">
    <el-tag
      :key="tag"
      v-for="tag in tagArr"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      inputVisible: false, // 控制标签输入框的显示
      inputValue: ''
    };
  },
  computed: {
    ...mapGetters(['blogTypes']),
    tagArr() {
      const arr = [];
      this.blogTypes.forEach(element => {
        arr.push(element.name);
      });
      return arr;
    }
  },
  mounted() {
    this.getTag();
  },
  methods: {
    ...mapActions(['addTag', 'getTag', 'deleteTag']),
    handleClose(tag) {
      this.deleteTag(tag);
      this.getTag();
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.addTag(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
};
</script>
<style lang="less" scoped>
.tag-container {
  padding: 40px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
