import API from "./API"

const Authenticator = {
    isAuthenticated: false,
    user:undefined,
    authenticate(cb) {
      API.authenticate()
      .then(
        (res)=>{this.isAuthenticated = true;
                this.user = res.data;
                if(cb){cb()}},
      ).catch((err)=> {console.log(err)})
    },
    signout(cb) {
      API.logout()
      .then(()=>{
        this.isAuthenticated = false;
        this.user = undefined;
        if(cb){
          cb();
        }
      })
    },
  };

export default Authenticator;