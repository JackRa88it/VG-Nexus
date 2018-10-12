import API from "./API"

const Authenticator = {
    isAuthenticated: false,
    username:"",
    user:undefined,
    authenticate(cb) {
      API.authenticate()
      .then(
        (res)=>{this.isAuthenticated = true;
                this.username = res.data.username;
                this.user = res.data;
                console.log(res)
                if(cb){cb()}},
      ).catch((err)=> {console.log(err)})
    },
    signout(cb) {
      API.logout()
      .then(()=>{
        this.isAuthenticated = false;
        this.username="";
        this.user = undefined;
        if(cb){
          cb();
        }
      })
    },
  };

export default Authenticator;