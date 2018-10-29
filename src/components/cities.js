import React, {Component, Fragment} from 'react';

import './css/cities.css';

class AddCity extends Component {
  state = {
    cities: [],
    name: '',
    error: false,
  }

  componentDidMount(){
    const cities = this.getCityList();
    this.setState({ cities: cities });
  }

  createCityOption = () => {
    const {
      name,
    } = this.state;
    const cityList = this.getCityList();
    let check = cityList.some( city => city == name );
    if (!check&&(name.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/gm) || name.match(/^[а-яА-Я]+(?:[\s-][а-яА-Я]+)*$/gm))) {
      this.setState({cities:[...cityList, name]})
      localStorage.setItem('cities', JSON.stringify([...cityList, name]))
      this.setState({error: false})
      this.setState({name: ''})
    }
    else {
      this.setState({error: true});
      this.cityWarning()
    }
    // this.setState({name: ''})
  }

  getCityList = () => {
    const cities = localStorage.getItem('cities');
    if (cities) {
      return JSON.parse(cities);
    }
    return [];
  }

  cityWarning = () => (
    <p className='message errorText' >
      Warning: city is already in the list or invalid name
    </p>
  )
  
  addAlert = () => (
    <p className='message warningText'>
      Add your city (if you want to)
    </p>
  )

  handleName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  removeCity = (city) => {
    let cities = this.getCityList();
    cities = cities.reduce(
      (acc, item) => {
        if (item !== city) {
          return [...acc, item]
        }
        return acc;
      },[]);
    this.setState({cities});
    let cityList = JSON.stringify(cities);
    localStorage.setItem('cities', cityList);  
  }

  renderCities = (cities) =>  
    cities.map((city) => (
        <li className='cityName'>
          {city} {'  '}
          <button
            className='cityDeleteButton'
            onClick={() => this.removeCity(city)}
          >
            Delete
          </button>
        </li>
    )
  )

  render() {
    const {error, cities, name} = this.state
    return(
      <div className='citiesForm'> 
        <div className='citiesContainer'>
          <div className='citiesListWrap'>
            <span className='citiesListHeader'>Список доступных городов:</span>
            <ul className='citiesList'>
              {this.renderCities(cities)}
            </ul>
          </div>
          <div>  
            <div>      
              <input 
                className='citiesInput'
                placeholder="Enter city name"  
                value={this.state.name}
                onChange={this.handleName}  
              />
            </div> 
            <div> 
              <button 
                className='addButton'
                onClick={() => { 
                  this.createCityOption();
                }
                }
              >
                Add
              </button>
            </div>  
              {error&&name ? this.cityWarning(): this.addAlert()}
          </div>      
        </div>
      </div>
    )
  }
}

export default AddCity;