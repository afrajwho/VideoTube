import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import VideoPlayer from './VideoPlayer';
import axios from 'axios';

function App() {
  const playerRef = useRef(null);
  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    // Fetch video link from the backend
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getVideoLink`)
      .then(response => {
        setVideoLink(response.data.videoLink);
      })
      .catch(error => {
        console.error('Error fetching video link:', error);
      });
  }, []);

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL"
      }
    ]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <>
      <div>
        <h1>Video player</h1>
      </div>
      <VideoPlayer
        options={videoPlayerOptions}
        onReady={handlePlayerReady}
      />
    </>
  );
}

export default App;