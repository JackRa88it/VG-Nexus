import React, { Component } from 'react';
import axios from "axios";
import Authenticator from '../Authenticate'
import TagSelect from './TagSelect'

// import axios from 'axios';

Authenticator.authenticate()



class Form extends Component{
    state = {
        tags: [],
    }
    postGame = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        formData.append('tags',JSON.stringify(this.state.tags))
        axios.post("/upload",formData)
            .then(res =>{
                    window.location.assign(res.data)
                }
            ).catch(err => console.log(err))
        return false
    }

    handleDelete = (i,cb) => {
        const tags = this.state.tags.filter((tag, index) => index !== i)
        this.setState({
        tags: tags,
        });
        cb(tags)
    }

    handleAddition = (tag,cb) => {
        const tags = [...this.state.tags, tag]
        this.setState(({ tags: tags }));
        cb(tags)
    }

    render(){
        return(
            Authenticator.isAuthenticated ? (
                <form action="http://localhost:3001/upload" method="post" encType="multipart/form-data" id='gameForm' onSubmit={this.postGame}>
                Game ZIP file:
                <input type="file" name="filetoupload" id='fileInput'/><br />
                Thumbnail: 
                <input type='file' name='thumbnail' id='thumbnailInput'/><br />
                Name:
                <input type='text' name ='name' /><br />
                Description:
                <input type='text' name ='description' /><br />
                Tags:
                <TagSelect handleDelete={this.handleDelete} handleAddition={this.handleAddition}/>
                <input type="submit" />
                </form>
            ) : 
                ('403 Forbidden')
        )
    }
}

export default Form;
