import './Form.css'

import React, { Component } from 'react';
import axios from "axios";
import Authenticator from '../../utils/Authenticator';
import TagSelect from '../../components/Form/TagSelect';
import ImageUpload from './ImageUpload';
import { Link } from "react-router-dom";
// importing {bracketed} exports from Authenticator and TagSelect not working

// import axios from 'axios';


class Form extends Component{
    state = {
        tags: [],
        description: ''
    }
    postGame = (event) => {
        event.preventDefault()
        console.log('posting game!')
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    render(){
        console.log(this.state.description)
        return(

            Authenticator.isAuthenticated ? (
                <form action="http://localhost:3001/upload" method="post" encType="multipart/form-data" id='gameForm' onSubmit={this.postGame}>
                <h1 id='uploadTitle'>Deploying a Game</h1>
                <br /><br />
                At VG Nexus we ensure that deployment is fast and simple. Any game that can run as a single HTML document can be uploaded to our website.
                <br /><br />
                <h2>Prerequisites</h2>
                <br /><br />
                <ol>
                    <li>Make sure the file you want to render is called index.html</li><br></br>
                    <li>If you are uploading a game made in the Phaser framework append the following code block anywhere after your "game" object is defined
                        <em> This code ensures that your game canvas will resize to fit the dimensions of it's parent element </em>
                    </li>
                </ol>
                <code><pre>
                    {`
    function resize() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var scale = Math.min(w / config.width, h / config.height);
        
        game.canvas.setAttribute('style',
            ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' +
            ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' +
            ' transform-origin: top left;   image-rendering: -moz-crisp-edges;image-rendering: -webkit-crisp-edges;' + 
            ' image-rendering: pixelated;image-rendering: crisp-edges;'
        );
        
        width = w / scale;
        height = h / scale;
        game.resize(width, height);
        game.scene.scenes.forEach(function (scene) {
            scene.cameras.main.setViewport(0, 0, width, height);
        });
    }

    window.addEventListener('resize', resize);
    if(game.isBooted) resize();
    else game.events.once('boot', resize);

    resize()
                    `}
               </pre> </code>

                <h2>Upload Files</h2>
                Game ZIP file: <br></br>
                <input type="file" name="filetoupload" id='fileInput'/><br />
                <br></br>
                Thumbnail: 
                <ImageUpload name = 'thumbnail'/>
                <br></br>
                <br></br>
                <h2>Game Info</h2>
                Name:
                <br></br>
                <input type='text' name ='name' /><br />
                <br></br>
                Description / Instructions
                <br></br>
                <textarea class="form-control" id="textInput" name = 'description' rows="3" onChange={this.handleInputChange}></textarea>
                <br />
                Tags(minimum one)
                <br></br>
                <TagSelect handleDelete={this.handleDelete} handleAddition={this.handleAddition}/>
                <br></br>
                <input type="submit" />
                </form>
            ) : (
                <div className="text-center">
                    <h3>Sorry about that ...</h3> <p>Game uploading is only available for verified users. <br />
                    <Link className="linkable" to="/login_signup">Signup</Link> to get started.</p>
               </div>
              )
        )
    }
}

export default Form;
