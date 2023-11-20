import React, { useState, useEffect } from "react";

import Letsgo from "../assets/music/letsgo.mp3";
import Nekozilla from "../assets/music/nekozilla.mp3";
import OnAndON from "../assets/music/onandon.mp3";
import WhyWeLose from "../assets/music/whywelose.mp3";
import Arrow from "../assets/music/Arrow.mp3";
import Blank from "../assets/music/Blank.mp3";
import Cetus from "../assets/music/Cetus.mp3";
import Circles from "../assets/music/Circles.mp3";
import DifferentHeaven from "../assets/music/DifferentHeaven.mp3";
import ElectroLights from "../assets/music/ElectroLight.mp3";
import FallOfLight from "../assets/music/FallOfLight.mp3";
import Hellcat from "../assets/music/Hellcat.mp3";
import Invincible from "../assets/music/Invincible.mp3";
import Panda from "../assets/music/Panda.mp3";
import Shine from "../assets/music/Shine.mp3";
import ShootingStars from "../assets/music/ShootinStars.mp3";
import TropicLove from "../assets/music/TropicLove.mp3";
import Symbolism from "../assets/music/Symbolism.mp3";

import playIcon from "../assets/images/play.png";
import pauseIcon from "../assets/images/pause.png";
import skipIcon from "../assets/images/skip.png";

function AudioComponents() {
  let playPauseIcon = pauseIcon;

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

  function playMusic() {
    if (isSongPlaying) {
      return;
    }

    randomNumberMusic();
    song = new Audio(randomSong);

    function volumeSlider() {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      output.innerHTML = slider.value;
    }

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

  const [isPaused, setIsPaused] = useState(false);

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

  function startMusic() {
    if (isSongPlaying === false && isPaused === false) {
      playMusic();
    }
    console.log("music started");
  }
  return (
    <div id="audio-container">
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
    </div>
  );
}

export default AudioComponents;
