import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Letsgo from "./assets/music/letsgo.mp3";
import Nekozilla from "./assets/music/nekozilla.mp3";
import OnAndON from "./assets/music/onandon.mp3";
import WhyWeLose from "./assets/music/whywelose.mp3";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const song1 = new Audio(Letsgo);
const song2 = new Audio(Nekozilla);
const song3 = new Audio(OnAndON);
const song4 = new Audio(WhyWeLose);

function randomSong() {
  const randomNumberSong = Math.floor(Math.random() * 4);
  console.log(randomNumberSong);

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

randomSong();
