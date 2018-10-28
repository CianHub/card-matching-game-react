import React, { Component } from "react";
import "./App.css";
import colors from "./components/colors";

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

const assignColors = colorBox => {
  //Assign a random color and remove that color from the colors array
  let randomIndex = Math.floor(Math.random() * colorBox.length);
  let color = colorBox[randomIndex];
  colorBox.splice(randomIndex, 1);
  return color;
};
let colorBox = colors;
let cards = [
  {
    id: 0,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 1,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 2,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 3,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 4,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 5,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 6,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 7,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 8,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 9,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colorBox)
  },
  {
    id: 10,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colors)
  },
  {
    id: 11,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colors)
  },
  {
    id: 12,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colors)
  },
  {
    id: 13,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colors)
  },
  {
    id: 14,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colors)
  },
  {
    id: 15,
    cardState: CardState.HIDING,
    backgroundColor: assignColors(colors)
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: cards,
      lastCard: ""
    };
  }

  unHide = card => {
    card.classList.remove("hidden");
    card.classList.add("showing");
  };

  hide = card => {
    card.classList.add("hidden");
    card.classList.remove("showing");
  };

  updateFirstClick = (cards, updatedCard) => {
    //Upon First Click of a pairing

    updatedCard.cardState = CardState.SHOWING;

    cards.splice(updatedCard.id, 1, updatedCard);

    this.setState({ cards: cards });
    this.setState({ lastCard: updatedCard });
  };

  updateState = (cards, updatedCard, lastCard, status) => {
    //If clicked card matches last card clicked

    updatedCard.cardState = status === "HIDDEN" ? 0 : 2;
    lastCard.cardState = status === "HIDDEN" ? 0 : 2;

    cards.splice(updatedCard.id, 1, updatedCard);
    cards.splice(lastCard.id, 1, lastCard);

    this.setState({ cards: cards });
    this.setState({ lastCard: "" });
  };

  clicked = e => {
    //When a card is clicked

    let cardList = this.state.cards.slice();
    let lastCard = Object.assign({}, this.state.lastCard);
    let clickedCard = e.target;

    if (clickedCard.classList[1] === "hidden") {
      // If card is hidden
      this.unHide(clickedCard);

      for (let card of cardList) {
        if (card.id === parseInt(clickedCard.id)) {
          // Find clicked card in state

          if (this.state.lastCard === "") {
            //If click was first click of a pair check

            //Set clicked card to be lastCard and update state
            this.updateFirstClick(cardList, card);
          }
          if (this.state.lastCard !== "") {
            //If click was second click of a pair check

            if (card.backgroundColor === this.state.lastCard.backgroundColor) {
              // If clicked card matches last card clicked

              //Reset last card and update state with matched last card and updated cardlist
              this.updateState(cardList, card, lastCard, "MATCHING");
            }
            if (card.backgroundColor !== this.state.lastCard.backgroundColor) {
              // If cards don't match

              //Reset pair matching
              this.updateState(cardList, card, lastCard, "HIDDEN");

              //Rehide clicked card
              this.hide(clickedCard);
            }
          }
        }
      }
    }
  };

  render() {
    let deck = this.state.cards.slice().map(item => {
      // Render cards

      if (item.cardState === 1) {
        return (
          <div
            key={item.id}
            id={item.id}
            onClick={this.clicked}
            className="card showing"
            style={{ backgroundColor: item.backgroundColor }}
          />
        );
      } else if (item.cardState === 2) {
        return (
          <div
            key={parseInt(item.id)}
            id={item.id}
            onClick={this.clicked}
            className="card matching"
            style={{ backgroundColor: item.backgroundColor }}
          />
        );
      }
      return (
        <div
          key={item.id}
          id={item.id}
          onClick={this.clicked}
          className="card hidden"
        >
          <h2>?</h2>
        </div>
      );
    });
    return (
      <div className="App">
        <header>
          <h2>Match The Cards </h2>
        </header>

        <div className="deck">{deck}</div>
      </div>
    );
  }
}

export default App;
