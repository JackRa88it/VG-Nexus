import './Home.css'
import React from 'react'
import API from '../../utils/API'
class Home extends React.Component{
  state = {
    best: [],
    featured: [],
    tags: [],
    newest: [],
  }
  getBest(){
    API.getBest()
    .then((res)=>{
      console.log(res.data)
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
  componentDidMount(){
    this.getBest()
    this.getNewest()
    this.getTagsandGames()
  }
  render(){
    return(

      <div>
          <div className='homerow'>
            <div className='categoryHeader'>Featured</div>
            <div id='featured'></div>
          </div>

          <div className='homerow'>
            <div id='best'>
              <div className='categoryHeader'>Top Rated Games</div>
              {this.state.best.map((game)=>{
                return(
                  <div className='bestBox'>
                    <img src={'/assets/gameThumbnails/' + game.id}></img>
                  </div>
                )
              })}
            </div>
            <div id='favorites'>
              <div className='categoryHeader'>Your favorites</div>
            </div>
          </div>
          <div className='homerow'>
            <div id='new'>
              <div className='categoryHeader'>Newest Games</div>
              {this.state.best.map((game)=>{
                return(
                  <div className='newestBox'>
                    <img src={'/assets/gameThumbnails/' + game.id}></img>
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
