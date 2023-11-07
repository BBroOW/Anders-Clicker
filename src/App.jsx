import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import andersonCoin from "./assets/images/anderson-coin.png";
import clickImg from "./assets/images/click.png";
import video from "./assets/video/fnaf.mp4";
import Letsgo from "./assets/music/letsgo.mp3";
import Nekozilla from "./assets/music/nekozilla.mp3";
import OnAndON from "./assets/music/onandon.mp3";
import WhyWeLose from "./assets/music/whywelose.mp3";
import Arrow from "./assets/music/Arrow.mp3";
import Blank from "./assets/music/Blank.mp3";
import Cetus from "./assets/music/Cetus.mp3";
import Circles from "./assets/music/Circles.mp3";
import DifferentHeaven from "./assets/music/DifferentHeaven.mp3";
import ElectroLights from "./assets/music/ElectroLight.mp3";
import FallOfLight from "./assets/music/FallOfLight.mp3";
import Hellcat from "./assets/music/Hellcat.mp3";
import Invincible from "./assets/music/Invincible.mp3";
import Panda from "./assets/music/Panda.mp3";
import Shine from "./assets/music/Shine.mp3";
import ShootingStars from "./assets/music/ShootinStars.mp3";
import TropicLove from "./assets/music/TropicLove.mp3";
import Symbolism from "./assets/music/Symbolism.mp3";
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

const AndersonCoin = andersonCoin;

let image = anders1;
let randomSong;
let song;
let isSongPlaying = false;
let audioVolume = 0.2;

function randomNumberMusic() {
  const randomNumberSong = Math.floor(Math.random() * 17);
  console.log(randomNumberSong);

  if (randomNumberSong === 0 && randomSong !== Letsgo) {
    randomSong = Letsgo;
  } else if (randomNumberSong === 1 && randomSong !== Nekozilla) {
    randomSong = Nekozilla;
  } else if (randomNumberSong === 2 && randomSong !== OnAndON) {
    randomSong = OnAndON;
  } else if (randomNumberSong === 3 && randomSong !== WhyWeLose) {
    randomSong = WhyWeLose;
  } else if (randomNumberSong === 4 && randomSong !== Arrow) {
    randomSong = Arrow;
  } else if (randomNumberSong === 5 && randomSong !== Blank) {
    randomSong = Blank;
  } else if (randomNumberSong === 6 && randomSong !== Cetus) {
    randomSong = Cetus;
  } else if (randomNumberSong === 7 && randomSong !== Circles) {
    randomSong = Circles;
  } else if (randomNumberSong === 8 && randomSong !== DifferentHeaven) {
    randomSong = DifferentHeaven;
  } else if (randomNumberSong === 9 && randomSong !== ElectroLights) {
    randomSong = ElectroLights;
  } else if (randomNumberSong === 10 && randomSong !== FallOfLight) {
    randomSong = FallOfLight;
  } else if (randomNumberSong === 11 && randomSong !== Hellcat) {
    randomSong = Hellcat;
  } else if (randomNumberSong === 12 && randomSong !== Invincible) {
    randomSong = Invincible;
  } else if (randomNumberSong === 13 && randomSong !== Panda) {
    randomSong = Panda;
  } else if (randomNumberSong === 14 && randomSong !== Shine) {
    randomSong = Shine;
  } else if (randomNumberSong === 15 && randomSong !== ShootingStars) {
    randomSong = ShootingStars;
  } else if (randomNumberSong === 16 && randomSong !== TropicLove) {
    randomSong = TropicLove;
  } else if (randomNumberSong === 17 && randomSong !== Symbolism) {
    randomSong = Symbolism;
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

const initialUpgradeCost = 10; // Initial cost of the upgrade
let upgradeCost = initialUpgradeCost; // Variable to track the current upgrade cost

function App() {
  const [clicks, setClicks] = useState(() => {
    return parseInt(localStorage.getItem("clicks")) || 0;
  });

  const [clickMultiplier, setClickMultiplier] = useState(() => {
    return parseInt(localStorage.getItem("clickMultiplier") || 1);
  });

  const [upgradeCost, setUpgradeCost] = useState(() => {
    return parseInt(localStorage.getItem("upgradeCost")) || initialUpgradeCost;
  });

  const [andersonCoinNumber, setAndersonCoinNumber] = useState(() => {
    return parseFloat(localStorage.getItem("coins")) || clicks / 10;
  });

  useEffect(() => {
    document.getElementById("displayClick").innerHTML = `${clicks} clicks`;
    localStorage.setItem("clicks", clicks);
  }, [clicks, andersonCoinNumber]);

  //make a function that resets a number every 10 clicks
  function coinUpdater() {
    if (clicks >= 10) {
      setAndersonCoinNumber(andersonCoinNumber + 1);
      localStorage.setItem("coins", andersonCoinNumber);
    }
  }

  useEffect(() => {
    if (clicks >= 10 && clicks % 10 === 0) {
      setAndersonCoinNumber(andersonCoinNumber + 1);
      localStorage.setItem("coins", andersonCoinNumber);
    }
    console.log("coins", andersonCoinNumber);
  }, [clicks]);

  useEffect(() => {
    localStorage.setItem("upgradeCost", upgradeCost);
  }, [upgradeCost]);

  function UpgradeClick() {
    if (andersonCoinNumber >= upgradeCost) {
      const newAndersonCoinNumber = andersonCoinNumber - upgradeCost;
      setAndersonCoinNumber(newAndersonCoinNumber);

      setClickMultiplier(clickMultiplier + 1);
      setUpgradeCost(upgradeCost * 5);

      localStorage.setItem("clickMultiplier", clickMultiplier + 1);
      localStorage.setItem("coins", newAndersonCoinNumber);
      console.log("Upgrade purchased!", newAndersonCoinNumber);
    }
  }

  function onClick() {
    playMusic();

    document.getElementById("image").style.transform = "scale(1.1)";
    setTimeout(() => {
      document.getElementById("image").style.transform = "scale(1)";
    }, 100);

    const randomNumber = Math.floor(Math.random() * 500);

    if (randomNumber === 1) {
      let videoFnaf = document.getElementById("fnaf");
      videoFnaf.style.display = "block";

      videoFnaf.play();

      // Make the video cover the entire screen
      videoFnaf.style.width = "100%";
      videoFnaf.style.height = "100%";
      videoFnaf.style.position = "absolute";
      videoFnaf.style.zIndex = "999";

      setTimeout(() => {
        videoFnaf.style.display = "none";
      }, 2500);
    } else {
      document.getElementById("fnaf").style.display = "none";
    }

    const newClicks = clicks + 1;
    setClicks(clicks + 1 * clickMultiplier);

    localStorage.setItem("coins", andersonCoinNumber);
    localStorage.setItem("clicks", newClicks);
  }

  if (clicks >= 1000) {
    image = anders2;
  }
  if (clicks >= 20000) {
    image = anders3;
  }
  if (clicks >= 300000) {
    image = anders4;
  }
  if (clicks >= 4000000) {
    image = anders5;
  }
  if (clicks >= 50000000) {
    image = anders6;
  }
  if (clicks >= 600000000) {
    image = anders7;
  }
  if (clicks >= 7000000000) {
    image = anders8;
  }
  if (clicks >= 80000000000) {
    image = anders9;
  }
  if (clicks >= 900000000000) {
    image = anders10;
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
      <div id="coins">
        <img src={AndersonCoin} alt="coins" />
        <p id="displayCoin">{andersonCoinNumber}</p>
      </div>

      <div id="upgrade-container">
        <p>Upgrade's</p>
        <div id="upgrades">
          <div id="upgrade-click">
            <button
              type="button"
              id="upgrade-click-button"
              onClick={UpgradeClick}
            >
              <img id="click-img" src={clickImg} />
              <p id="upgrade-click-price">{upgradeCost}</p>
            </button>
          </div>
        </div>
      </div>
      {/*<div id="leaderboard">leaderboard coming soon</div>*/}

      <div id="main-button">
        <p id="displayClick"></p>
        <button type="button" onClick={onClick}>
          <img src={image} id="image" alt="Anders" />
        </button>
      </div>
    </div>
  );
}

export default App;
