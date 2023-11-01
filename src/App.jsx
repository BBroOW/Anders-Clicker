import React, { useState, useEffect } from "react";
import "./App.css";
import anders1 from "./assets/images/anders1.png";
import anders2 from "./assets/images/anders2.png";
import video from "./assets/video/fnaf.mp4";
import Letsgo from "./assets/music/letsgo.mp3";
import Nekozilla from "./assets/music/nekozilla.mp3";
import OnAndON from "./assets/music/onandon.mp3";
import WhyWeLose from "./assets/music/whywelose.mp3";

let image = anders1;
let randomSong;
let song;
let isSongPlaying = false;
let audioVolume = 0.2;

function randomNumberMusic() {
  const randomNumberSong = Math.floor(Math.random() * 4);
  console.log(randomNumberSong);

  if (randomNumberSong === 0) {
    randomSong = Letsgo;
  } else if (randomNumberSong === 1) {
    randomSong = Nekozilla;
  } else if (randomNumberSong === 2) {
    randomSong = OnAndON;
  } else if (randomNumberSong === 3) {
    randomSong = WhyWeLose;
  }
}

function playMusic() {
  // Check if a song is currently playing
  if (isSongPlaying) {
    return;
  }

  randomNumberMusic(); // Select a new random song
  song = new Audio(randomSong);

  // Set isSongPlaying to true to indicate that a song is playing
  isSongPlaying = true;

  // Add an event listener for the "ended" event
  song.addEventListener("ended", function () {
    // Reset isSongPlaying to false when the song ends
    isSongPlaying = false;

    // Call randomNumberMusic again and play the new song
    playMusic();
  });

  // Play the song
  song.play();
}

function handleVolumeChange(event) {
  const newVolume = event.target.value / 100;
  audioVolume = newVolume;

  if (isSongPlaying && song) {
    song.volume = newVolume;
  }

  // Update the displayed volume level
  document.getElementById("demo").innerHTML = Math.round(newVolume * 100);
}




function App() {
  // State to keep track of trash count
  const [trashCount, setTrashCount] = useState(() => {
    // Initialize with the value from local storage or default to 0
    return parseInt(localStorage.getItem("trashCount")) || 0;
    volumeSlider() 
    
  });

  // Function to handle button click
  function onClick() {
    playMusic();
    const randomNumber = Math.floor(Math.random() * 1000);
    console.log(randomNumber);

    if (randomNumber === 56) {
      let videoFnaf = document.getElementById("fnaf");
      videoFnaf.style.display = "block";

      // Play video in fullscreen
      if (videoFnaf.requestFullscreen) {
        videoFnaf.requestFullscreen();
      } else if (videoFnaf.mozRequestFullScreen) {
        videoFnaf.mozRequestFullScreen();
      } else if (videoFnaf.webkitRequestFullscreen) {
        videoFnaf.webkitRequestFullscreen();
      } else if (videoFnaf.msRequestFullscreen) {
        videoFnaf.msRequestFullscreen();
      }

      videoFnaf.play();

      setTimeout(() => {
        // Exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }

        videoFnaf.style.display = "none";
      }, 2500);
    } else {
      document.getElementById("fnaf").style.display = "none";
    }

    const newTrashCount = trashCount + 1;
    setTrashCount(newTrashCount);

    // Store the updated count in local storage
    localStorage.setItem("trashCount", newTrashCount.toString());
  }

  // Use useEffect to update the DOM when the component mounts
  useEffect(() => {
    document.getElementById("displayClick").innerHTML = trashCount;
  }, [trashCount]);

  if (trashCount >= 10) {
    image = anders2;
  }

  return (
    <div id="page">
      <div id="video">
        <video id="fnaf" src={video} style={{ display: "none" }} />
      </div>
      {/* Volume slider */}
      <div id="volume">
        <input
          type="range"
          min="0"
          max="100"
          defaultValue={audioVolume * 100}
          className="slider"
          id="myRange"
          onChange={handleVolumeChange}
        />
        <p>
          Volume: <span id="demo">{Math.round(audioVolume * 100)}</span>
        </p>
      </div>
      <h1>Click Anders</h1>
      <button type="button" id="søppelenhet" onClick={onClick}>
        <img src={image} alt="" />
      </button>
      <div id="displayClick">
        <p></p>
      </div>
    </div>
  );
}

export default App;
