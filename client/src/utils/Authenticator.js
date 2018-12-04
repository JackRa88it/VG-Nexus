import API from "./API"

// A single instance of Authenticator with two properties, and two methods
const Authenticator = {
    // default values indicating user is not authenticated
    isAuthenticated: false,
    user:undefined,
    authenticate(cb) {
      // Call to API to check authentication
      API.authenticate()
      .then((res) =>
      {
        this.isAuthenticated = true;
        this.user = res.data;

        // callback function to front end
        if(cb){ cb() } 
      },
      // unable to authenticate, log errors
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