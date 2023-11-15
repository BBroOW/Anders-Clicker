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
import autoclicker from "./assets/images/autoclicker.png";

const AndersonCoin = andersonCoin;

let playPauseIcon = pauseIcon;
let image = anders1;
let randomSong;
let song;
let isSongPlaying = false;
let audioVolume = 0.2;

let lastPlayedSong = ""; // Initialize the variable to store the last played song

function randomNumberMusic() {
  const songs = [
    Letsgo,
    Nekozilla,
    OnAndON,
    WhyWeLose,
    Arrow,
    Blank,
    Cetus,
    Circles,
    DifferentHeaven,
    ElectroLights,
    FallOfLight,
    Hellcat,
    Invincible,
    Panda,
    Shine,
    ShootingStars,
    TropicLove,
    Symbolism,
  ];

  // Remove the last played song from the array if it exists
  const filteredSongs = songs.filter((song) => song !== lastPlayedSong);

  if (filteredSongs.length === 0) {
    // If all songs have been played, reset and include all songs again
    lastPlayedSong = "";
  }

  // Generate a random number based on the filtered array
  const randomNumberSong = Math.floor(Math.random() * filteredSongs.length);
  console.log(randomNumberSong);

  // Update the last played song and the current random song
  lastPlayedSong = filteredSongs[randomNumberSong];
  randomSong = lastPlayedSong;
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
    return (
      parseInt(localStorage.getItem("upgradeCostClick")) ||
      initialupgradeCostClick
    );
  });

  const [upgradeCostCoins, setupgradeCostCoins] = useState(() => {
    return (
      parseInt(localStorage.getItem("upgradeCostCoins")) ||
      initialupgradeCostCoins
    );
  });

  const [andersonCoinNumber, setAndersonCoinNumber] = useState(() => {
    return parseInt(localStorage.getItem("coins")) || clicks / 10;
  });

  const [initialAutoClickerCost, setInitialAutoClickerCost] = useState(100);
  const [autoClickerCost, setAutoClickerCost] = useState(() => {
    return (
      parseInt(localStorage.getItem("autoClickerCost")) ||
      initialAutoClickerCost
    );
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
      document.getElementById(
        "playPause"
      ).innerHTML = `<button><img src=${playIcon} alt="" /></button>`;
    } else {
      setIsPaused(false);
      song.play();
      isSongPlaying = true;
      document.getElementById(
        "playPause"
      ).innerHTML = `<button><img src=${pauseIcon} alt="" /></button>`;
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
      if (clickMultiplier >= 10) {
        setClickMultiplier(clickMultiplier * 2);
      } else {
        setClickMultiplier(clickMultiplier + 1);
      }
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

  function upgradeAutoClicker() {
    if (andersonCoinNumber >= autoClickerCost) {
      const newAndersonCoinNumber = andersonCoinNumber - autoClickerCost;
      setAndersonCoinNumber(newAndersonCoinNumber);

      setAutoClickerCost(autoClickerCost * 2);

      localStorage.setItem("coins", newAndersonCoinNumber);
      localStorage.setItem("autoClickerCost", autoClickerCost);

      // Set up an interval to generate 1 click every second
      autoClickerInterval = setInterval(() => {
        setClicks((prevClicks) => prevClicks + 1 * clickMultiplier);
      }, 1000);
    }
  }
  function autoClickUpgradeAnimation() {
    if (andersonCoinNumber >= autoClickerCost) {
      console.log("Upgrade available!");
      if (document.getElementById("upgrade-auto-clicker") !== null) {
        document.getElementById("upgrade-auto-clicker").style.animation =
          "pulse 1s infinite";
      }
    } else {
      if (document.getElementById("upgrade-auto-clicker") !== null) {
        document.getElementById("upgrade-auto-clicker").style.animation =
          "none";
      }
    }
  }

  autoClickUpgradeAnimation();

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

  // Assuming anders2 to anders10 are variables representing images
  const thresholdImages = [
    { threshold: 1000, image: anders2 },
    { threshold: 20000, image: anders3 },
    { threshold: 300000, image: anders4 },
    { threshold: 4000000, image: anders5 },
    { threshold: 50000000, image: anders6 },
    { threshold: 600000000, image: anders7 },
    { threshold: 7000000000, image: anders8 },
    { threshold: 80000000000, image: anders9 },
    { threshold: 900000000000, image: anders10 },
  ];

  // Find the first item in the array where the clicks threshold is greater than or equal to the current clicks
  const thresholdImage = thresholdImages.find(
    (item) => clicks >= item.threshold
  );

  // If a match is found, update the image variable
  if (thresholdImage) {
    image = thresholdImage.image;
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
          <div id="upgrade-auto-clicker">
            <button
              type="button"
              id="upgrade-auto-clicker-button"
              onClick={upgradeAutoClicker}
            >
              <img id="auto-clicker-img" src={autoclicker} />
              <p id="upgrade-auto-clicker-price">{autoClickerCost}</p>
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
