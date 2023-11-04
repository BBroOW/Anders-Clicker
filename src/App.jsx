import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import anders1 from "./assets/images/anders1.png";
import anders2 from "./assets/images/anders2.png";
import anders3 from "./assets/images/anders3.png";
import anders4 from "./assets/images/anders4.png";
import anders5 from "./assets/images/anders5.png";
import anders6 from "./assets/images/anders6.png";
import anders7 from "./assets/images/anders7.png";
import anders8 from "./assets/images/anders8.png";
import anders9 from "./assets/images/anders9.png";
import anders10 from "./assets/images/anders10.png";
import andersonCoin from "./assets/images/anderson-coin.png";
import video from "./assets/video/fnaf.mp4";
import Letsgo from "./assets/music/letsgo.mp3";
import Nekozilla from "./assets/music/nekozilla.mp3";
import OnAndON from "./assets/music/onandon.mp3";
import WhyWeLose from "./assets/music/whywelose.mp3";

const AndersonCoin = andersonCoin;

let image = anders1;
let randomSong;
let song;
let isSongPlaying = false;
let audioVolume = 0.2;

function randomNumberMusic() {
  const randomNumberSong = Math.floor(Math.random() * 4);
  console.log(randomNumberSong);

  if (randomNumberSong === 0 && randomSong !== Letsgo) {
    randomSong = Letsgo;
  } else if (randomNumberSong === 1 && randomSong !== Nekozilla) {
    randomSong = Nekozilla;
  } else if (randomNumberSong === 2 && randomSong !== OnAndON) {
    randomSong = OnAndON;
  } else if (randomNumberSong === 3 && randomSong !== WhyWeLose) {
    randomSong = WhyWeLose;
  }
}

function volumeSlider() {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;
}

function playMusic() {
  if (isSongPlaying) {
    return;
  }

  randomNumberMusic();
  song = new Audio(randomSong);

  song.volume = audioVolume;
  isSongPlaying = true;

  song.addEventListener("ended", function () {
    isSongPlaying = false;
    volumeSlider();
    playMusic();
  });

  song.play();
}

function handleVolumeChange(event) {
  const newVolume = event.target.value / 100;
  audioVolume = newVolume;

  if (isSongPlaying && song) {
    song.volume = newVolume;
  }

  document.getElementById("demo").innerHTML = Math.round(newVolume * 100);
}

function AndersonCoinNumberChecker(clicks, setAndersonCoinNumber) {
  if (clicks >= 10 && clicks % 10 === 0) {
    const newAndersonCoinNumber = clicks / 10;
    setAndersonCoinNumber(newAndersonCoinNumber);
  }
}

function App() {
  const [clicks, setClicks] = useState(() => {
    return parseInt(localStorage.getItem("clicks")) || 0;
  });

  const [andersonCoinNumber, setAndersonCoinNumber] = useState(() => {
    return parseFloat(localStorage.getItem("coins")) || clicks / 10;
  });

  useEffect(() => {
    document.getElementById("displayClick").innerHTML = `${clicks} clicks`;
    AndersonCoinNumberChecker(clicks, setAndersonCoinNumber);
  }, [clicks, andersonCoinNumber]);

  function onClick() {
    playMusic();

    document.getElementById("img").style.transform = "scale(1.1)";
    setTimeout(() => {
      document.getElementById("img").style.transform = "scale(1)";
    }, 100);

    const randomNumber = Math.floor(Math.random() * 1000);

    if (randomNumber === 56) {
      let videoFnaf = document.getElementById("fnaf");
      videoFnaf.style.display = "block";

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

    const newClicks = clicks + 1;
    setClicks(newClicks);

    AndersonCoinNumberChecker(newClicks, setAndersonCoinNumber);

    localStorage.setItem("coins", andersonCoinNumber.toString());
    localStorage.setItem("clicks", newClicks.toString());
  }

  return (
    <div id="page">
      <div id="video">
        <video id="fnaf" src={video} style={{ display: "none" }} />
      </div>
      <div id="navbar">
        <div id="volume">
          <p>
            Volume: <span id="demo"></span>
          </p>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={audioVolume * 100}
            className="slider"
            id="myRange"
            onChange={handleVolumeChange}
          />
        </div>
        <h1 id="title">CLICK ANDERS</h1>
        <div id="login">
          <p>login</p>
        </div>
      </div>
      <div id="main-page">
        <div id="coins">
          <img src={AndersonCoin} alt="coins" />
          <p id="displayCoin">{andersonCoinNumber}</p>
        </div>
        <div id="main-button">
          <p id="displayClick"></p>
          <button type="button" onClick={onClick}>
            <img src={image} id="img" alt="Anders" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
