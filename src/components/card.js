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
    cards = cards.reduce((acc, card) =>{
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
    <div className="app__card">  
      <h3 className="app__card__title">{card.title}</h3>
      <p className="app__card__description">{card.description}</p>
      <p className="app__card__number">{card.phone_number}</p>
      <p className="app__card__city">{card.city}</p>
      <button 
        className="app__card__delete"
        onClick={ this.deleteCard(card.id)}
      >
        Delete
      </button>
    </div>
  ))

  renderNoCardsWarning = () => (
    <div className="" style={{color: "White"}}>
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
