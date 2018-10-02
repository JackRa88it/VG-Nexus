import React, { Component } from 'react';
// import axios from 'axios';

class Form extends Component{
    render(){
        return(
        <form action="http://localhost:3001/upload" method="post" encType="multipart/form-data">
        Game ZIP file:
        <input type="file" name="filetoupload" id='fileInput'/><br />
        Thumbnail: 
        <input type='file' name='thumbnail' id='fileInput'/><br />
        Title:
        <input type='text' name ='title' /><br />
        Description:
        <input type='text' name ='description' /><br />
        <input type="submit" />
        </form>
        )
    }
}

export default Form;
