import React, { Component } from 'react';
import axios from "axios";
import Authenticator from '../Authenticate'

// import axios from 'axios';

Authenticator.authenticate()

class Form extends Component{
    postGame(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        console.log(formData)
        axios.post("/upload",formData)
            .then(res =>{
                    console.log(res)
                    window.location.assign(res.data)
                }
            ).catch(err => console.log(err))
        return false
    }
    render(){
        return(
            Authenticator.isAuthenticated ? (
        <form action="http://localhost:3001/upload" method="post" encType="multipart/form-data" id='gameForm' onSubmit={this.postGame}>
        Game ZIP file:
        <input type="file" name="filetoupload" id='fileInput'/><br />
        Thumbnail: 
        <input type='file' name='thumbnail' id='thumbnailInput'/><br />
        Title:
        <input type='text' name ='title' /><br />
        Description:
        <input type='text' name ='description' /><br />
        <input type="submit" />
        </form>
        ) : 
        ('403 Forbidden')
        )
    }
}

export default Form;
