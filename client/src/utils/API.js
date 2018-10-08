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
  },
  chatRoom: function(){
    return axios.get('/api/chatRoom')
  },
  postGameComment: function(gameId,text){
    return axios.post('/api/game/comments/' + gameId,{text: text})
  },
  getGameData: function(gameId){
    return axios.get('/api/game/' + gameId)
  },
  votePost: function(postId, bool){
    return axios.post('/api/post/vote/' + postId, {vote: bool})
  }
  // joinChannel: function(channel){
  //   return axios.get('/api/channels/'+channel)
  // }
};
