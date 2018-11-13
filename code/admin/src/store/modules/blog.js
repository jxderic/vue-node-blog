import axios from 'src/utils/fetch'
import {
  blogTypes
} from './classify'

const music = {
  state: {
    blogTypes,
    list: [],
    total: 0
  },
  mutations: {
    BLOGLIST(state, data) {
      state.list = data.data.list;
      state.total = data.data.total;
    },
    GETTAG(state, data) {
      state.blogTypes = data;
    },
    ADDTAG(state, tag) {
      state.blogTypes.push({ name: tag });
    },
    DELETETAG(state, tag) {
      state.blogTypes = state.blogTypes.filter((element) => {
        return element.name !== tag;
      })
    }
  },
  actions: {
    getTag({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('blog/getTag')
          .then(res => {
            console.log(res);
            const tagArr = [];
            res.data.forEach((element) => {
              tagArr.push({ name: element.name });
            })
            commit('GETTAG', tagArr);
          }).catch(err => {
            reject(err)
          })
      })
    },

    addTag({ commit }, tag) {
      return new Promise((resolve, reject) => {
        axios.post('blog/addTag', {
          name: tag
        })
          .then(res => {
            console.log(res);
            commit('ADDTAG', res.data.name);
          }).catch(err => {
            reject(err)
          })
      })
    },

    deleteTag({ commit }, tag) {
      return new Promise((resolve, reject) => {
        axios.get('blog/deleteTag', {
          name: tag
        })
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },

    addBlog({
      commit
    }, info) {
      return new Promise((resolve, reject) => {
        axios.postFile('blog/add', info)
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },

    getBlogList({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        axios.get('blog/list', params)
          .then(res => {
            commit('BLOGLIST', res)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },
    delBlog({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        axios.get('blog/del', {
          id: id
        })
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },
    updateBlog({
      commit
    }, info) {
      return new Promise((resolve, reject) => {
        axios.postFile('blog/update', info)
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    }
  }
}
export default music
