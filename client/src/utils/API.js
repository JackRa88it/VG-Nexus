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
    return axios.post('/api/game/' + gameId + '/post/',{text: text})
  },
  getGameComments: function(gameId){
    console.log('getting game comments!')
    return axios.get('/api/game/'+ gameId+'/post/' )
  },
  getGameData: function(gameId){
    return axios.get('/api/game/' + gameId)
  },
  postVote: function(postId, bool){
    return axios.post('/api/post/'+postId+'/vote/', {vote: bool})
  },
  getVote: function(postId){
    return axios.get('/api/post/'+postId+'/vote/')
  },
  getForumList: function() {
    return axios.get("/api/forumList")
  },
  getThreadList: function(forumId) {
    return axios.get("/api/threadList/" + forumId)
  },
  getPostList: function(threadId) {
    return axios.get("/api/postList/" + threadId)
  },
  submitNewPost: function(newPost) {
    return axios.post('/api/community/newPost/', {newPost: newPost})
  }
  // joinChannel: function(channel){
  //   return axios.get('/api/channels/'+channel)
  // }
};
