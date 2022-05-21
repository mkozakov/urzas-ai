<template>
  <div class="card">
    <div class="card-container">
      <div
        class="card-background"
        :style="{ backgroundImage: `url(${backgroundUrl})` }"
      >
        <div class="card-frame">
          <div class="frame-header" :class="`${this.cardColor}`">
            <h1 class="name">{{ cardData.name + " &nbsp;" }}</h1>
            <span
              class="mana-cost"
              v-html="textToHtml(cardData.manaCost + ' &nbsp;', true)"
            />
          </div>
          <div class="frame-art-wrapper">
            <img
              v-if="cardData.url"
              class="frame-art"
              :class="`${this.cardColor}`"
              :src="cardData.url"
              alt="art"
            />
            <img v-else class="frame-art loop" :class="`${this.cardColor}`" />
          </div>
          <div class="frame-type-line" :class="`${this.cardColor}`">
            <h1 class="type">{{ typesAndSubtypes }}</h1>
            <img :src="`${symbol}`" id="set-icon" alt="set-icon" />
          </div>

          <div
            v-if="!cardData.basic_land"
            class="frame-text-box"
            :class="`${this.cardColor}`"
          >
            <p
              class="description"
              v-html="
                textToHtml(cardData.text).replace(/(?:\r\n|\r|\n)/g, '<br>')
              "
            />

            <p
              class="flavour-text"
              v-html="
                textToHtml(cardData.flavorText).replace(
                  /(?:\r\n|\r|\n)/g,
                  '<br>'
                )
              "
            />
          </div>

          <div class="frame-bottom-info inner-margin">
            <div class="fbi-left">
              <p>Urzas.ai &#x2022; Text by Cohere.ai &#x2022; Art by WOMBO</p>
            </div>

            <div class="fbi-right">
              <div
                v-if="isCreature"
                class="power-toughness-container frame-type-line"
              >
                <h1 class="power-toughness-text">
                  {{ cardData.power }} / {{ cardData.toughness }}
                </h1>
              </div>
              <div v-else-if="isPlaneswalker" class="power-toughness-container">
                {{ cardData.loyalty }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import redBackground from "../assets/gen-bg-R.jpg";
import whiteBackground from "../assets/gen-bg-W.jpg";
import artifactBackground from "../assets/gen-bg-A.jpg";
import blueBackground from "../assets/gen-bg-U.jpg";
import greenBackground from "../assets/gen-bg-G.jpg";
import goldBackground from "../assets/gen-bg-M.jpg";
import blackBackground from "../assets/gen-bg-B.jpg";
import commonSetSymbol from "../assets/gen-tgc-icon-diagram-common.png";
import uncommonSetSymbol from "../assets/gen-tgc-icon-diagram-uncommon.png";
import rareSetSymbol from "../assets/gen-tgc-icon-diagram-rare.png";
import mythicSetSymbol from "../assets/gen-tgc-icon-diagram-mythic.png";

const iconRegex = /{(.*?)}/gi;
const manaRegex = /{([A-Z]*?)}/gi;

const getIconHtml = (symbol, isLarge) => {
  // return `<img width="15px" src="${icon}" />`
  return `<abbr class="card-symbol ${
    isLarge ? "lg" : ""
  } card-symbol-${symbol}" title="tap this permanent">{T}</abbr>`;
};

export default {
  name: "CardFront",

  props: ["cardData"],

  computed: {
    cardColor() {
      if (this.cardData.basic_land) {
        const basic_lands = {
          swamp: "B",
          forest: "G",
          plains: "W",
          island: "U",
          mountain: "R",
        };
        return basic_lands[this.cardData.name.toLowerCase()];
      }
      const matches = this.cardData.manaCost.match(manaRegex);
      if (!matches) {
        return "A";
      } else if ([...new Set(matches)].length === 1) {
        return matches[0].slice(1, matches[0].length - 1);
      } else {
        return "M";
      }
    },
    backgroundUrl() {
      if (this.cardColor === "R") {
        return redBackground;
      } else if (this.cardColor === "W") {
        return whiteBackground;
      } else if (this.cardColor === "A") {
        return artifactBackground;
      } else if (this.cardColor === "U") {
        return blueBackground;
      } else if (this.cardColor === "G") {
        return greenBackground;
      } else if (this.cardColor === "M") {
        return goldBackground;
      } else if (this.cardColor === "B") {
        return blackBackground;
      }

      return "A";
    },

    symbol() {
      if (this.cardData.rarity === "common") {
        return commonSetSymbol;
      } else if (this.cardData.rarity === "uncommon") {
        return uncommonSetSymbol;
      } else if (this.cardData.rarity === "rare") {
        return rareSetSymbol;
      } else if (this.cardData.rarity === "mythic") {
        return mythicSetSymbol;
      } else {
        return commonSetSymbol;
      }
    },

    typesAndSubtypes() {
      if (this.cardData.subtypes) {
        return `${this.cardData.types} - ${this.cardData.subtypes} `;
      }
      return this.cardData.types + " ";
    },

    descriptionWithImages() {
      return this.cardData.text.replaceAll(iconRegex, (_, symbol) => {
        return getIconHtml(symbol);
      });
    },

    isCreature() {
      return this.cardData.types && this.cardData.types.includes("Creature");
    },

    isPlaneswalker() {
      return (
        this.cardData.types && this.cardData.types.includes("Planeswalker")
      );
    },
  },

  methods: {
    textToHtml(text, isLarge) {
      return text.replaceAll(iconRegex, (_, symbol) => {
        return getIconHtml(symbol, isLarge);
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/colors.css";

.card-container {
  display: flex;
  box-sizing: border-box;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  /* aspect-ratio: 5 / 7; */
  margin: 0 auto;
  border-radius: 25px;
  box-sizing: border-box;
  /* box-shadow: -8px 9px 16px -3px gray; */
  background: #171314;
  padding: 25px;
  justify-content: center;
}

.card-background {
  justify-content: center;
  height: 100%;
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 8%;
  border-bottom-right-radius: 8%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  background-color: #bbb;
  z-index: 0;
}

.card {
  height: 100%;
}

/*
    -------------------------
    -------------------------
            BORDERS
    -------------------------
    -------------------------
*/
.frame-header,
.frame-type-line {
  border-bottom: 4px solid #a9a9a9;
  border-left: 2px solid #a9a9a9;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  white-space: nowrap;
}

.frame-header,
.frame-type-line {
  opacity: 0.91;
}

.frame-header,
.frame-art,
.frame-type-line {
  margin-bottom: 7px;
}

.frame-art-wrapper {
  padding: 0 10px;
  min-height: 200px;
}

.R {
  box-shadow: inset 0 0 4px #171314, 0 0 2px 4px #da1e1e;
}

.G {
  box-shadow: inset 0 0 4px #171314, 0 0 2px 4px #26714a;
}

.A,
.W {
  box-shadow: inset 0 0 4px #171314, 0 0 2px 4px #cccca3;
}

.B {
  box-shadow: inset 0 0 4px #171314, 0 0 2px 4px #171314;
}

.M {
  box-shadow: inset 0 0 4px #171314, 0 0 2px 4px #f0d955;
}

.U {
  box-shadow: inset 0 0 4px #171314, 0 0 2px 4px #1f89e0;
}

.C {
  box-shadow: inset 0 0 4px #171314, 0 0 2px 4px #9ea6ad;
}

/*
    ----------------------
    ----------------------
            OVERFLOW
    ----------------------
    ----------------------
*/
.frame-header,
.frame-type-line,
.frame-text-box {
  overflow: hidden;
}

/*
  ----------------------------------------
  ----------------------------------------
            CARD FRAME
  ----------------------------------------
  ----------------------------------------
*/
.card-frame {
  box-sizing: border-box;
  z-index: 1;
  position: relative;
  height: 100%;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.frame-header,
.frame-type-line {
  background: linear-gradient(
      0deg,
      rgba(201, 216, 201, 0.3),
      rgba(201, 216, 209, 0.3)
    ),
    url("../assets/text_background.jpg");
  display: flex;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 4px 0px 10px 0px;
  justify-content: space-between;
  border-radius: 18px/40px;
  height: 16px;
}

.name,
.type {
  font-size: 1.1em;
  margin-left: 10px;
  align-self: baseline;
  font-weight: 600;
  white-space: nowrap;
  margin: 0px 10px;
}

#mana-icon {
  font-size: 1em;
  background: #add3ac;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: -0.05em 0.12em 0px 0 black;
  margin-right: 5px;
  height: 20px;
  align-self: center;
}
.frame-art {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#set-icon {
  overflow: hidden;
  margin-right: 0.3em;
  align-self: center;
  padding-top: 0.6em;
  height: 1.3em;
}

.frame-type-line {
  margin-top: 0;
}

.frame-text-box {
  margin: 0 10px;
  background: #d3ded6;
  background-image: url("../assets/text_background.jpg");
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 50px 6px;
  font-size: 1em;
  height: 260px;
  box-sizing: border-box;
  /* opacity: 0.91; */
}

.flavour-text {
  font-style: italic;
  padding: 10px 0;
}

@media screen and (max-width: 800px), screen and (max-height: 1500px) {
  .flavour-text {
    font-size: 0.8em;
    font-style: italic;
    padding: 10px 0;
  }

  .description {
    font-size: 0.8em;
  }

  .name,
  .type {
    font-size: 1em;
  }

  .mana-cost {
    align-self: center;
    height: 1em;
  }

  .frame-text-box {
    height: 40%;
  }

  .card-container {
    padding: 20px;
  }
}

p {
  margin-bottom: 5px;
}

.ftb-inner-margin {
  margin: 5px 1px;
}

.frame-bottom-info {
  color: white;
  display: flex;
  justify-content: space-between;
  margin: 0px 15px 0 15px;
}

.fbi-left {
  flex: 1;
  white-space: nowrap;
}
.fbi-left p:first-of-type {
  margin-bottom: -8px;
}
.fbi-left,
.fbi-right {
  font-size: 10px;
  position: relative;
  top: 6px;
}

.inner-margins {
  margin: 0 10px;
}

.power-toughness-container {
  position: absolute;
  bottom: -12px;
  right: -19px;
  width: 60px;
  color: black;
}

.power-toughness-text {
  font-weight: 550;
  margin: 0px auto;
  padding: 0;
  font-size: 2em;
}
</style>
