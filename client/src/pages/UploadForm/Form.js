import React, { Component } from 'react';
import axios from "axios";
import Authenticator from '../../utils/Authenticator';
import TagSelect from '../../components/Form/TagSelect';
import ImageUpload from './ImageUpload';
import './Form.css'
// importing {bracketed} exports from Authenticator and TagSelect not working

// import axios from 'axios';

Authenticator.authenticate()



class Form extends Component{
    state = {
        tags: [],
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
    render(){
        return(
            Authenticator.isAuthenticated ? (
                <form action="http://localhost:3001/upload" method="post" encType="multipart/form-data" id='gameForm' onSubmit={this.postGame}>
                <h1 id='uploadTitle'>Deploying a Game</h1>
                <br /><br />
                At VG Nexus we ensure that deployment is fast and simple. Any game that can run as a single HTML document can be uploaded to our website.
                <br /><br />
                <h2>Prerequisites</h2>
                <br /><br />
                1. Make sure the file you want to render is called index.html
                <br /><br />
                2. If you are uploading a game made in the Phaser framework append the following code block anywhere after your "game" object is defined:

                <pre>
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
                </pre>

                3. That's it! Now you just need to fill out the fields.
                Game ZIP file:
                <input type="file" name="filetoupload" id='fileInput'/><br />
                <br></br>
                3. Upload a thumbnail so that we can showcase your game.
                <br></br>
                Thumbnail: 
                {/* <input type='file' name='thumbnail' id='thumbnailInput'/><br /> */}
                <ImageUpload name = 'thumbnail'/>
                <br></br>
                4. Give your game a name
                <br></br>
                Name:
                <input type='text' name ='name' /><br />
                5. Give your game a description. You can put any attributions or portfolios here.
                <br></br>
                Description:
                <input type='text' name ='description' /><br />
                6. Select at least one tag
                <br></br>
                Tags:
                <TagSelect handleDelete={this.handleDelete} handleAddition={this.handleAddition}/>
                7. Now submit!
                <br></br>
                <input type="submit" />
                </form>
            ) : 
                ('403 Forbidden')
        )
    }
}

export default Form;
