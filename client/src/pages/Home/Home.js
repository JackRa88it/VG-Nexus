import './Home.css'
import React from 'react'
import API from '../../utils/API'
import Authenticator from '../../utils/Authenticator';
import GameContainer from '../../components/GameContainer/'

class Home extends React.Component{
  state = {
    best: [],
    featured: [],
    tags: [],
    newest: [],
    random: [],
    favorites: [],
    authenticated: false
  }
  getFavorites(){
    API.getFavorites()
    .then((res)=>{
      console.log(res.data)
      this.setState({favorites:res.data})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  getRandom(){
    API.getRandom()
    .then((res)=>{
      this.setState({random:res.data})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  getBest(){
    API.getBest()
    .then((res)=>{
      this.setState({best:res.data})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  getNewest(){
    API.getNewest()
    .then((res)=>{
      this.setState({newest:res.data})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  getTagsandGames(){
    API.getTagsandGames()
    .then((res)=>{
      console.log(res.data)
      this.setState({tags: res.data})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  componentDidMount = () => {

    this.getBest()
    this.getNewest()
    this.getTagsandGames()
    this.getFavorites()
    this.getRandom()
    Authenticator.authenticate(() => {
      this.setState({ authenticated: true})
    })
  }

  render(){
    return(

      <div>
          <div className='homerow'>
            <div className='categoryHeader'>Featured</div>
            <div id='featured'></div>
          </div>
          
          <div className='homerow'>
            <GameContainer games={this.state.newest} header={'Newest Games'} />
            {(this.state.authenticated ?
              <GameContainer games={this.state.favorites} header={'Your favorites'} /> : 
              <GameContainer games={this.state.random} header={'Random'} />
            )}
          </div>
          <div className='homerow'>
            <div id='best'>
                <div className='categoryHeader'>Top Rated Games</div>
                {this.state.best.map((game)=>{
                  return(
                    <div className='bestBox'>
                      <div className='bestCard'>
                        <img src={'/assets/gameThumbnails/' + game.id}></img>
                        <div className='bestCardTitle'>{game.name}</div>
                        <div className='bestCardTags'>
                          {game.Tags.map((tag)=>{
                            return(
                              <div>{tag.name}</div>
                            )})
                          }
                        </div>
                        <div className='bestCardRating'>{game.rating.toFixed(3)} ({game.Votes.length} Votes)</div>
                      </div>
                      <div className='bestInfo'>
                          <div className='bestDescription'>{game.description}</div>
                          <div className='bestAuthor'>{game.User.username}</div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          <div className='homerow'>
            <div id='tags'>
              <div className='categoryHeader'>Games by tags</div>
              {this.state.tags.map((tag)=>{
                return(
                  <div className = 'tagBox'>
                    <div>{tag.name}</div>
                    <div className = 'tagGameBox'>
                      {tag.Games.map((game)=>{
                        return(
                          <div className = 'tagGame'>
                            <img src={'/assets/gameThumbnails/' + game.id}></img>
                            <div className = 'tagGameTitle'>{game.name}</div>
                            <div className = 'tagGameRating'>{game.rating.toFixed(2)}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      </div>
    )
  }
}


export default Home;
