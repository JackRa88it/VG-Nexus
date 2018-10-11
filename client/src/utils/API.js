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
  postGameVote: function(gameId, bool){
    return axios.post('/api/game/'+gameId+'/vote/',{vote: bool})
  },
  getForumList: function() {
    return axios.get("/api/forumList")
  },
  getBest: function(){
    return axios.get('/api/games/best')
  },
  getNewest: function(){
    return axios.get('/api/games/newest')
  },
  getTagsandGames: function(){
    return axios.get('/api/tags/games/all')
  },
  getRandom: function(){
    return axios.get('/api/games/random')
  },
  getFavorites: function(){
    return axios.get('/api/games/favorite')
  }
};
