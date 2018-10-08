import API from "./API"

const Authenticator = {
    isAuthenticated: false,
    authenticate(cb) {
      API.authenticate()
      .then(
        (res)=>{this.isAuthenticated = true;if(cb){cb()}},
        (err)=>{console.log(err)}
      )
    },
    signout(cb) {
      API.logout()
      .then(()=>{
        this.isAuthenticated = false;
        if(cb){
          cb();
        }
      })
    }
  };

export default Authenticator;