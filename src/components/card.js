import React, {Component, Fragment} from 'react';
import "./css/card.css";


export default class CardList extends Component {
  state = {
    cards: [],
  }
  
  componentDidMount(){
    const cards = this.getCardsList();
    this.setState({ cards });
  }

  getCardsList = () => {
    const cards = localStorage.getItem('cards');
    if (cards) {
      return JSON.parse(cards);
    }
    return [];
  }

  deleteCard = id => () => {
    let cards = this.getCardsList();
    cards = cards.reduce(
      (acc, card) =>{
        if (card.id !== id) {
          return [...acc, card];
        }
        return acc;
    }, []);
    this.setState({cards});
    let cardlist = JSON.stringify(cards);
    localStorage.setItem('cards',cardlist);
  }

  renderCards = (cards) => 
  cards.map((card) => (
    <div className="appCard">  
      <h3 className="appCardTitle">{card.title}</h3>
      <p className="appCardDescription">{card.description}</p>
      <p className="appCardNumber">Phone number:{' '}{card.phone_number}</p>
      <p className="appCardCity">City:{' '}{card.city}</p>
      <button 
        className="appCardDelete"
        onClick={ this.deleteCard(card.id)}
      >
        Delete
      </button>
    </div>
  ))

  renderNoCardsWarning = () => (
    <div style={{color: "White"}}>
      <p>
        No cards.
      </p>
    </div>
  )

  render(){
    const { cards } = this.state;

    return(
      <Fragment>
        {cards.length === 0
         ? this.renderNoCardsWarning()
         : this.renderCards(cards)}
      </Fragment>
    );
  }
};
