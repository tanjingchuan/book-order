import Vue from 'vue'
import Vuex from 'vuex'
import axios from './http.js'

Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER', // 用户信息
  SET_COURSE_DATA: 'SET_COURSE_DATA' // 教师数据
}

const state = { // 需要维护的状态
  isAutnenticated: false,  // 是否认证
  user: {},   // 存储用户信息
  courseData: [], // 教师课程数据
}

const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user
}

const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated)
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user
    else
      state.user = {}
  },
  [types.SET_COURSE_DATA] (state, courseData) {
    state.courseData = courseData
  }
}

const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
  },
  // 教师课程信息初始化
  async initTeaCourses ({commit}, teaName) {
    const res = await axios.get("api/data/tea_courses", {
      params: {
        teaName
      }
    })
    commit(types.SET_COURSE_DATA, res.data)
    return Promise.resolve(res.data)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
