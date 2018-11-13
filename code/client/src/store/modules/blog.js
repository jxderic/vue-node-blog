import axios from '../../utils/fetch'
import { blogTypes } from './classify'

const blog = {
  state: {
    types: blogTypes,
    list: [],
    homeList: [],
    info: {},
    currType: '',
    pagesize: 5,
    loadingMore: false,
    loadingBol: true,
    replyNum: 0 // 判断评论是回复评论还是发表评论
  },
  mutations: {
    BLOGLIST(state, res) {
      state.list = res;
    },
    BLOGINFO(state, res) {
      state.info = res.data;
    },
    BLOGREPLY(state, res) {
      state.replyNum = res;
    }
  },
  actions: {
    // 获取博客列表
    async getBlogList({ commit, state }, params) {
      params.pagesize = params.pagesize || state.pagesize
      params.type = params.type === 'all' ? null : params.type
      state.loadingMore = true
      state.loadingBol = false
      return new Promise((resolve, reject) => {
        axios.get('blog/list', params)
          .then(res => {
            state.loadingMore = false;
            resolve(res)
            if (res.data.length <= 0 && params.pageindex > 1) return
            if (params.pageindex > 1) {
              commit('BLOGLIST', state.list.concat(res.data))
            } else {
              commit('BLOGLIST', res.data)
            }
            if (res.data.length >= state.pagesize) {
              state.loadingBol = true;
            }
          }).catch(err => {
            // console.log(err)
            reject(err)
          })
      })
    },

    // 获取博客详情
    getBlogInfo({ commit }, _id) {
      return new Promise((resolve, reject) => {
        axios.get('blog/info', { _id })
          .then(res => {
            commit('BLOGINFO', res)
            resolve(res)
          }).catch(err => {
            // console.log(err)
            reject(err)
          })
      })
    },
    // 添加博客评论
    addComment({
      commit
    }, info) {
      return new Promise((resolve, reject) => {
        console.log(info);
        axios.post('blog/addComment', info)
          .then(res => {
            console.log(res);
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },
    // 回复评论
    replyComment({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        const blog = state.info;
        console.log(blog);
        blog.comments[state.replyNum - 1]
      })
    }
  }
}
export default blog
