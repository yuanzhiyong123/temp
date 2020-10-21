import Vue from 'vue';
import Vuex from 'vuex';
import {
  verify
} from '@/assets/js/api.js'
import {
  get_cookie,
  getUrlSid,
  set_cookie,
  deleteCookie
} from '@/assets/js/util.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    msg: 'hello world',
    userName: '',
    email: get_cookie("oa_email"),
    isCollapse: false,  //导航栏 默认不折叠
    url: "https://abccmproxy.cmcm.com/r/w?cmd=API_com.cm.cheetah.httpapi.login&forward=http://localhost:8080"  //登陆校验跳转
  },
  getters: {
    //获取用户名
    getUserName(state){
      return state.userName
    },
    //获取用户邮箱
    getEmail(state){
      return state.email
    },
    //获取跳转url
    getVerifyUrl(state) {
      return state.url;
    },
    //获取跳转url
    getIsCollapse(state) {
      return state.isCollapse;
    }
  },
  mutations: {
    //存储用户名及邮箱
    setUserName(state, data) {
      state.userName = data.userName;
      state.email = data.email;
    },
    //设置导航栏是否折叠
    setCollapse(state) {  
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {
    //登陆校验
    verify(context) {
      const url = context.state.url;
      let _sid;
      if (getUrlSid("sid") == null && get_cookie("sid") == "") {
        window.location.href = url;
        //调转登录
      } else {
        //验证sid
        if (getUrlSid("sid") == null) {
          _sid = get_cookie("sid");
        } else {
          _sid = getUrlSid("sid");
          set_cookie("sid", _sid, "1");
        }
        let params = {
          sid: _sid
        };
        verify(params).then(res => {
          if (res.result == "ok") {
            let email = JSON.parse(res.data).uid;
            let userName = JSON.parse(res.data).username;
            set_cookie("oa_email", email, "1");
            context.commit('setUserName', {
              email,
              userName
            })
          } else {
            window.location.href = url;
          }
        }, err => {
          window.location.href = url;
        });
      }
    }
  }
});
