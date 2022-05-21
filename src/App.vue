<template>
  <div id="app">
    <div id="bg" />
    <TiltWrapper>
      <div id="container">
        <div ref="card" id="card-container" class="glow">
          <div
            ref="card"
            class="card-side"
            :style="{
              width: '100%',
              height: '100%',
            }"
          >
            <CardFront :cardData="cardData" />
          </div>
        </div>
      </div>
    </TiltWrapper>
  </div>
</template>
<script>
import CardFront from "./components/CardFront.vue";
import TiltWrapper from "./components/TiltWrapper.vue";
import Vue2TouchEvents from "vue2-touch-events";
import Vue from "vue";
import artwork_url from "./assets/temp-image.jpg";

Vue.use(Vue2TouchEvents);

const cardProperties = [
  "name",
  "manaCost",
  "types",
  "subtypes",
  "text",
  "power",
  "toughness",
  "flavorText",
  "rarity",
  "loyalty",
  "url",
  "basic_land",
];
const generateBlankCard = () =>
  cardProperties.reduce((acc, curr) => ((acc[curr] = ""), acc), {});
export default {
  name: "App",

  components: {
    CardFront,
    TiltWrapper,
  },

  data() {
    return {
      cardProperties,
      cardData: {
        basic_land: "",
        flavorText:
          "Its appearance on Pouncing Ceratok Shellac is only of a living thing, never human.",
        loyalty: "",
        manaCost: "{2}{R}",
        name: "Pouncing Ceratok Shellac",
        power: "",
        rarity: "uncommon",
        subtypes: "",
        text: "{2}, {T}: Put a page counter on Pouncing Ceratok Shellac.\n{T}, Remove X can't be 0 or less than X, then sacrifice it.",
        toughness: "",
        types: "Artifact",
        url: artwork_url,
      },
      cardPresets: generateBlankCard(),
    };
  },
};
</script>

<style scoped>
p {
  padding: 2px 40px;
  margin: 5px 0;
}

.input-name {
  background: linear-gradient(
      0deg,
      rgba(201, 216, 201, 0.3),
      rgba(201, 216, 209, 0.3)
    ),
    url("assets/text_background.jpg");
  display: flex;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  justify-content: space-between;
  border-radius: 18px/40px;

  border-bottom: 4px solid #a9a9a9;
  border-left: 2px solid #a9a9a9;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;

  margin-bottom: 7px;
  opacity: 0.91;

  overflow: hidden;
  font-size: 1em;
  margin-left: 10px;
  font-weight: bold;
  font: inherit;
}

button.input-name {
  cursor: pointer;
}

#card-container {
  display: flex;
  width: 100%;
  height: 100%;
  align-content: flex-end;
  align-items: flex-end;
  cursor: pointer;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  padding: 0;
  overflow: scroll;
}

#bg {
  position: fixed;
  width: 100%;
  height: 10000px;
  top: -400px;
  left: 0;
  background-image: url("./assets/mordor.png");
  background-size: 100vw 200vh;
  filter: blur(4px);
  transform: scaleX(1.1);
}

.btn {
  margin-top: 20px;
}

#container {
  /* filter: drop-shadow(0px 0px 20px rgb(202, 192, 192)); */
  position: relative;
  height: 720px;
  width: 480px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 10px;
}

@media screen and (max-width: 800px), screen and (max-height: 1500px) {
  #container {
    height: 500px;
    width: 330px;
  }
}

.card-side {
  transition: all 1.7s ease;
  backface-visibility: hidden;
  position: absolute;
}

.pulse-glow {
  animation: glow 1s ease-in-out infinite alternate;
}

.glow {
  filter: drop-shadow(0 0 20px rgb(202, 192, 192));
}

.glow:hover {
  filter: drop-shadow(0 0 50px rgb(221, 172, 24));
  transition: 0.2s;
}

.description-box {
  text-align: justify;
  margin: 10px 10px;
  width: 330px;
  font-size: 14px;
  background: linear-gradient(
      0deg,
      rgba(201, 216, 201, 0.3),
      rgba(201, 216, 209, 0.3)
    ),
    url(/img/text_background.1a125833.jpg);
  opacity: 0.5;
  padding: 17px;
  border-radius: 3px;
  color: #222222;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 25px;
  margin-bottom: 7px;
  opacity: 0.91;
  filter: hue-rotate(238deg) drop-shadow(0 0 1px rgb(202, 192, 192));
  color: #1a1a1a;
  font-family: auto;
  opacity: 0.9;
}

.description-box p {
  padding: 0px;
}

@import url("https://fonts.googleapis.com/css2?family=Stoke:wght@300&display=swap");

#action-button {
  z-index: 1;
  width: 200px;
  height: 44px;
  background: linear-gradient(0deg, rgb(83 20 20) 0%, rgb(216 65 65) 100%);
  border-width: 2px;
  border-color: #441010;
  border-style: solid;
  color: #e0dbdb;
  font-size: 19px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Stoke", serif;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  margin-bottom: 10px;
}

#action-button:hover {
  background: linear-gradient(0deg, rgb(83 20 20) 0%, rgb(192, 57, 57) 100%);
}

#name-input {
  z-index: 1;
  font-family: "Stoke", serif;
  color: #f8f6f6;
  margin-top: 10px;
}
#name-input-label {
  margin-right: 10px;
}

@keyframes glow {
  from {
    filter: drop-shadow(0px 0px 60px rgb(245, 193, 52));
  }

  to {
    filter: drop-shadow(0px 0px 10px rgb(245, 193, 52));
  }
}
</style>
