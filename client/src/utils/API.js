import axios from "axios";

export default {
  login: function(userInfo) {
    return axios.post("/api/login", userInfo);
  },
  signup: function(userInfo) {
    return axios.post("/api/signup",userInfo);
  },
  joinChat: function(){
    return axios.get("/api/messages")
  },
  authenticate: function(){
    return axios.get('/api/authenticate')
  },
  logout: function(){
    return axios.get('/api/logout')
  }
  // joinChannel: function(channel){
  //   return axios.get('/api/channels/'+channel)
  // }
};
