import React from "react";
// import {Col, Container, Row} from "../Grid/";
import CommentList from "../CommentList/"
const Home = () => (
  <div>
    <h1>Home Page</h1>
    <iframe title='game' src='/user/Phaser-SRPG/index.html'></iframe>

    <form action="http://localhost:3001/upload" method="post" encType="multipart/form-data">
    <input type="file" name="filetoupload" /><br />
    <input type="submit" />
    </form>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna
      varius, blandit rhoncus sem. Morbi lacinia nisi ac dui fermentum, sed luctus urna tincidunt.
      Etiam ut feugiat ex. Cras non risus mi. Curabitur mattis rutrum ipsum, ut aliquet urna
      imperdiet ac. Sed nec nulla aliquam, bibendum odio eget, vestibulum tortor. Cras rutrum ligula
      in tincidunt commodo. Morbi sit amet mollis orci, in tristique ex. Donec nec ornare elit.
      Donec blandit est sed risus feugiat porttitor. Vestibulum molestie hendrerit massa non
      consequat. Vestibulum vitae lorem tortor. In elementum ultricies tempus. Interdum et malesuada
      fames ac ante ipsum primis in faucibus.
    </p>
  <CommentList />
  </div>
);

export default Home;
