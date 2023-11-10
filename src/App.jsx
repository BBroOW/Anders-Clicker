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
import playIcon from "./assets/images/play.png";
import pauseIcon from "./assets/images/pause.png";
import skipIcon from "./assets/images/skip.png";

const AndersonCoin = andersonCoin;

let playPauseIcon = pauseIcon;
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

// i want a function that can count the clicks and then when you have clicked 10 times it resets the counter and gives you 1 coin

const initialupgradeCostClick = 10; // Initial cost of the upgrade
let upgradeCostClick = initialupgradeCostClick; // Variable to track the current upgrade cost

const initialupgradeCostCoins = 50;
let upgradeCostCoins = initialupgradeCostCoins;

function App() {
  const [clicks, setClicks] = useState(() => {
    return parseInt(localStorage.getItem("clicks")) || 0;
  });

  const [counterForCoins, setCounterForCoins] = useState(() => {
    return parseInt(localStorage.getItem("counterForCoins")) || 0;
  });

  const [clickMultiplier, setClickMultiplier] = useState(() => {
    return parseInt(localStorage.getItem("clickMultiplier")) || 1;
  });

  const [coinMultiplier, setCoinMultiplier] = useState(() => {
    return parseInt(localStorage.getItem("coinMultiplier")) || 1;
  });

  const [upgradeCostClick, setupgradeCostClick] = useState(() => {
    return parseInt(localStorage.getItem("upgradeCostClick")) || initialupgradeCostClick;
  });

  const [upgradeCostCoins, setupgradeCostCoins] = useState(() => {
    return parseInt(localStorage.getItem("upgradeCostCoins")) || initialupgradeCostCoins;
  });

  const [andersonCoinNumber, setAndersonCoinNumber] = useState(() => {
    return parseInt(localStorage.getItem("coins")) || clicks / 10;
  });

  const [isPaused, setIsPaused] = useState(false);
  const [isUpgraded, setIsUpgraded] = useState(false);

  function skip() {
    if (isSongPlaying && song) {
      song.pause();
      isSongPlaying = false;
      playMusic();
    }
  }

  function playPause() {
    if (isSongPlaying && song) {
      setIsPaused(true);
      song.pause();
      isSongPlaying = false;
      document.getElementById("playPause").innerHTML = `<button><img src=${playIcon} alt="" /></button>`;
    } else {
      setIsPaused(false);
      song.play();
      isSongPlaying = true;
      document.getElementById("playPause").innerHTML = `<button><img src=${pauseIcon} alt="" /></button>`;
    }
  }

  useEffect(() => {
    document.getElementById("displayClick").innerHTML = `${clicks} clicks`;
    localStorage.setItem("clicks", clicks);
  }, [clicks, andersonCoinNumber]);

  useEffect(() => {
    if (counterForCoins >= 10) {
      setCounterForCoins(0);
      setAndersonCoinNumber(andersonCoinNumber + 1 * coinMultiplier);
      localStorage.setItem("coins", andersonCoinNumber);
    }
    console.log("counter", counterForCoins);
  }, [counterForCoins]);

  useEffect(() => {
    if (clicks < 10) {
      setAndersonCoinNumber(0);
      localStorage.setItem("coins", andersonCoinNumber);
    }
  }, [clicks]);

  useEffect(() => {
    localStorage.setItem("upgradeCostClick", upgradeCostClick);
  }, [upgradeCostClick]);

  function UpgradeClick() {
    if (andersonCoinNumber >= upgradeCostClick) {
      const newAndersonCoinNumber = andersonCoinNumber - upgradeCostClick;
      setAndersonCoinNumber(newAndersonCoinNumber);

      setClickMultiplier(clickMultiplier + 1);
      setupgradeCostClick(upgradeCostClick * 2);

      localStorage.setItem("clickMultiplier", clickMultiplier + 1);
      localStorage.setItem("coins", newAndersonCoinNumber);
      setIsUpgraded(true); // Set the upgrade status to true
      console.log("Upgrade purchased!", newAndersonCoinNumber);
    }
  }

  function UpgradeClickAnimation() {
    if (andersonCoinNumber >= upgradeCostClick) {
      console.log("Upgrade available!");
      if (document.getElementById("upgrade-click") !== null) {
        document.getElementById("upgrade-click").style.animation =
          "pulse 1s infinite";
      }
    } else {
      if (document.getElementById("upgrade-click") !== null) {
        document.getElementById("upgrade-click").style.animation = "none";
      }
    }
  }

  UpgradeClickAnimation();

  useEffect(() => {
    localStorage.setItem("upgradeCostCoins", upgradeCostCoins);
  }, [upgradeCostCoins]);

  function UpgradeCoins() {
    if (andersonCoinNumber >= upgradeCostCoins) {
      const newAndersonCoinNumber = andersonCoinNumber - upgradeCostCoins;
      setAndersonCoinNumber(newAndersonCoinNumber);

      setCoinMultiplier(coinMultiplier * 2);
      setupgradeCostCoins(upgradeCostCoins * 2);

      localStorage.setItem("coinMultiplier", coinMultiplier + 1);
      localStorage.setItem("coins", newAndersonCoinNumber);
      console.log("Upgrade purchased!", newAndersonCoinNumber);
    }
  }

  function UpgradeCoinAnimation() {
    if (andersonCoinNumber >= upgradeCostCoins) {
      console.log("Upgrade available!");
      if (document.getElementById("upgrade-coins") !== null) {
        document.getElementById("upgrade-coins").style.animation =
          "pulse 1s infinite";
      }
    } else {
      if (document.getElementById("upgrade-coins") !== null) {
        document.getElementById("upgrade-coins").style.animation = "none";
      }
    }
  }

  UpgradeCoinAnimation();

  function startMusic() {
    if (isSongPlaying === false && isPaused === false) {
      playMusic();
    }
    console.log("music started");
  }

  function onClick() {
    startMusic();
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

    const newCounterForCoins = counterForCoins + 1;
    setCounterForCoins(counterForCoins + 1 * clickMultiplier);

    const newClicks = clicks + 1;
    setClicks(clicks + 1 * clickMultiplier);

    localStorage.setItem("coins", andersonCoinNumber);
    localStorage.setItem("clicks", newClicks);
    localStorage.setItem("counterForCoins", newCounterForCoins);
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
          <div className="VolumeButtons">
            <div id="skip">
              <button type="button" onClick={skip}>
                <img src={skipIcon} alt="" />
              </button>
              </div>
              <div id="playPause" onClick={playPause}>
              <button>
                <img src={playPauseIcon} alt="" />
              </button>
              </div>
          </div>
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
              <p id="upgrade-click-price">{upgradeCostClick}</p>
            </button>
          </div>
          <div id="upgrade-coins">
            <button
              type="button"
              id="upgrade-coins-button"
              onClick={UpgradeCoins}
            >
              <img id="coins-img" src={andersonCoin} />
              <p id="upgrade-coin-price">{upgradeCostCoins}</p>
            </button>
          </div>
        </div>
      </div>
      {/*<div id="leaderboard">leaderboard coming soon</div>*/}

      <div id="main-button">
        <p id="displayClick"></p>
        <button
          type="button"
          id="main-button-button"
          onClick={onClick}
          disabled={!isUpgraded && clicks === 100}
        >
          <img src={image} id="image" alt="Anders" />
        </button>
      </div>
    </div>
  );
}

export default App;
