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
const song1 = new Audio(Letsgo);
const song2 = new Audio(Nekozilla);
const song3 = new Audio(OnAndON);
const song4 = new Audio(WhyWeLose);

function randomSong() {
  const randomNumberSong = Math.floor(Math.random() * 4);
  console.log("random song", randomNumberSong);

  switch (randomNumberSong) {
    case 0:
      song1.play();
      break;
    case 1:
      song2.play();
      break;
    case 2:
      song3.play();
      break;
    case 3:
      song4.play();
      break;
    default:
      console.log("Error");
  }
}

//function that random play song and swaps song after the song is done
song1.addEventListener("ended", randomSong);
song2.addEventListener("ended", randomSong);
song3.addEventListener("ended", randomSong);
song4.addEventListener("ended", randomSong);

function App() {
  randomSong();
  // State to keep track of trash count
  const [trashCount, setTrashCount] = useState(() => {
    // Initialize with the value from local storage or default to 0
    return parseInt(localStorage.getItem("trashCount")) || 0;
  });

  // Function to handle button click
  function onClick() {
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
