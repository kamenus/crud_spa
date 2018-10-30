import React, {Component} from 'react';


import "./css/create.css";

class CreateCard extends Component {
  state = {
    title: '',
    description: '',
    phone_number: '',
    city: '',
    errors: {
      title: true,
      description: false,
      phone_number: true,
    },
    cities: [],
  }

  componentDidMount() {
    const cities = this.getCityList();
    this.setState({cities : cities})
  }

  getCityList = () => {
    const cities = localStorage.getItem('cities');
    if (cities) {
      return JSON.parse(cities);
    }
    return [];
  }

  messageTitle = () => {
    this.titleCheck(this.state.title);
    if (this.state.errors.title) {
      return this.titleError();
    }
  }

  titleError = () => (
    <span className='titleError'>
      Enter any title or make it shorter!
    </span>
  )
  messageNumber = () => {
    this.numCheck(this.state.phone_number);
    if (this.state.errors.phone_number) {
      return this.numberError();
    }
  }
  numberError = () => (
    <span className='titleError'>
      Enter valid phone number! (RU format)
    </span>
  )

  cityError = () => (
    <span className='titleError'>
      Choose the city!<br/>
      If there are no options, add your city <a href='../cities'>here</a>
    </span>  
  )

  renderCities = (cities) => 
    cities.map((city) => (
      <option value={city}>
        {city}
      </option>
    ))

  numCheck = (number) => {
    const {errors} = this.state;
    errors.phone_number = !number.match(/^((\+7|7|8)+([0-9]){10})$/gm); 
    if (this.state.errors !== errors) {
      this.setState({errors});
    }
  }
  handleTitle = (e) => {
    this.setState({
      title: e.target.value    
    })
  }

  handleDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handlePhoneNum = (e) => {
    this.setState({
      phone_number: e.target.value
    })
  }

  handleSelect = (e) => {
    this.setState({
      city : e.target.value,
    })
  }

  isFormValid = (errors, city) => {
    this.errCheck(errors);
    return (
      errors.title || errors.description || errors.phone_number || city == "" || city == "Choose a city"  
    );  
  }

  titleCheck = () => {
    const {errors} = this.state;
    if (this.state.title.length > 100 || this.state.title.length == 0) {
      errors.title = true
    } else {
      errors.title = false
    };
  }

  errCheck = () => {
    const {errors} = this.state;
    this.titleCheck();
    if (this.state.description.length > 300) {
      errors.description = true
    } else {
      errors.description = false
    };
    let num = this.state.phone_number;
    this.numCheck(num);
  }

  
  getCardsList = () => {
    const cards = localStorage.getItem('cards');
    if (cards) {
      return JSON.parse(cards);
    }
    return [];
  }

  saveCard = () => {
    const {
      title,
      description,
      phone_number,
      city,
    } = this.state;

    const cardsList = this.getCardsList();

    let lastCardId = -1;
    if (cardsList.length !== 0) {
      lastCardId = cardsList[cardsList.length - 1].id;
    }
    localStorage.setItem('cards', JSON.stringify(
      [{title, description, phone_number, city, id: lastCardId + 1}, ...cardsList]
    ));
    this.setState({
      title: '',
      description: '',
      phone_number: '',
      city: '',
      errors: {
        title: true,
        description: false,
        phone_number: true,
      }
    });
  }

  render() {
    const {
      errors,
      cities,
      city,
    } = this.state;
    return(
      <div className="create-form">
        <div className="title form-part">
          <label className="title-label create-label">Enter the title:</label>  
          <div className="input-area">
            <input
              value={this.state.title}
              onChange={this.handleTitle}
              className="title-input create-form-input" 
            />
          </div>  
          {
           this.messageTitle()
          }
        </div>  
        <div className="description form-part">
          <label className="description-label create-label">Enter the description:</label>  
          <div className="input-area">
            <textarea 
              value={this.state.description}
              onChange={this.handleDescription}
              className="description-input create-form-input" 
            />
          </div>  
        </div>  
        <div className="phone_number form-part">
          <label className="phone_number-label create-label">Enter the phone number:</label>  
          <div className="input-area">
            <input
              type="tel" 
              value={this.state.phone_number}
              onChange={this.handlePhoneNum}
              className="phone_number-input create-form-input" 
            />
          </div>  
        {this.messageNumber()}  
        </div>
        <div className="additional_options">
          <div className="city_selector">
            <select onChange={this.handleSelect}>
              <option>Choose a city</option>
              {this.renderCities(cities)}       
            </select>
          </div>
          {this.cityError()}  
        </div>
        <div className="create-button">
          <button 
            disabled={this.isFormValid(errors, city)}
            onClick={this.saveCard}
          > 
            Create
          </button>
        </div>
      </div>
    )
  }
}

export default CreateCard;