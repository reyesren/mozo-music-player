import React from 'react';
import {
  Container,
  Row,
  Jumbotron,
} from 'react-bootstrap';

const About = () => {
  return (
    <>
      <Jumbotron className="pt-5 pb-5 mb-0 top-section" fluid>
        <Container>
          <h1 className="mb-3">Mozo Music Player</h1>
          <h4>
            Your multi-feature all in one music player library
          </h4>
        </Container>
      </Jumbotron>

      <Jumbotron className="pt-5 pb-5 description-section" fluid>
        <Container>
          <p className="mb-5">
            The Mozo music player is a multi-feature all in one type of music player where users 
            can create their own accounts and upload new songs to their music library. 
            Some of the features incorporated in the application are uploading music audio files into your 
            account, uploading music from a youtube url to your account, being able to download your 
            music from your library to your local storage, creating public and private playlists, 
            playing your music on the application and shuffling throughyour music. You can also 
            search for different public playlists created by other users. The application will also give users 
            the ability to add playlists to their favourites so that they can refer to it whenever they 
            need to. User's will also have the ability to share their playlists on different social media platforms. 
          </p>

          <h5 className="authors mt-5">
            ~ Renzo Reyes, Mohammed Osumah
          </h5>
        </Container>
      </Jumbotron>
    </>
  );
};

export default About;
