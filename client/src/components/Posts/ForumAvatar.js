import React from "react";

  //navigation to user profile when clicking on username
//   handleUsernameClick = event => {
//     if (event.target.getAttribute("class") === "username") {
//       //route to userpage
//       console.log('testing123gimmegimmesomecreamcheese')
//     }
//   }

const ForumAvatar = (props) => {
  console.log(props.user)
  //navigation to user profile when clicking on username
  const handleUsernameClick = event => {
    if (event.target.getAttribute("class") === "username") {
      //route to userpage
      console.log('testing123gimmegimmesomecreamcheese')
    }
  }
  return(
  <div className="avatarContainer">
    <div className="avatarImage"></div>
    <div className="username"></div>
    <div className="userScore"></div>
  </div>
  )
}

export default ForumAvatar;