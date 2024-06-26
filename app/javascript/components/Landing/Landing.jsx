import React, { useEffect } from 'react';
import { 
  Button,
  ButtonGroup, 
  Container, 
  Row, 
  Col,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import usePlaylists from "../playlists/sidebar/SidebarLogic";
import useLanding from "./LandingLogic";


const Landing = () => {

  const isLoggedIn = useSelector((state) => {
    return state.auth.loggedIn;
  });

  const loggedInUser = useSelector((state) => {
    return state.auth.user.username;
  });

  const {
    playlistOrder,
    handleMostPopular,
    handleMostFavourited,
    handleMostRecent,
    handleOldest,
    viewPlaylists,
  } = useLanding(loggedInUser);

  const {
    getPlaylists,
  } = usePlaylists(loggedInUser);

  useEffect(() => {
    getPlaylists();
  }, [playlists, loggedInUser, playlistOrder]);

  const playlists = useSelector((state) => {
    return state.playlist.playlists;
  });

  return (
    <>
        {isLoggedIn ? 
          (<Container>
            <Row className="mt-4 mb-3">
              <Col>
                <ButtonGroup size="lg" className="btn-block">
                  <Button 
                    variant="light"
                    className={playlistOrder === "mp" ? "btn-order-active" : "btn-order"}
                    onClick={handleMostPopular}
                  >
                    Most Popular
                  </Button>
                  <Button 
                    variant="light" 
                    className={playlistOrder === "mf" ? "btn-order-active" : "btn-order"}
                    onClick={handleMostFavourited}
                  >
                    Most Favourited
                    </Button>
                  <Button
                    variant="light"
                    className={playlistOrder === "mr" ? "btn-order-active" : "btn-order"}
                    onClick={handleMostRecent}
                  >
                    Most Recent
                  </Button>
                  <Button 
                    variant="light" 
                    className={playlistOrder === "o" ? "btn-order-active" : "btn-order"}
                    onClick={handleOldest}
                  >
                    Oldest
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>

            <Row className="mb-2 vertical-overflow">
              <Col>
                {viewPlaylists(playlists, playlistOrder)}
              </Col>
            </Row>
          </Container>) 
          : null};
    </>
  );
};

export default Landing;
