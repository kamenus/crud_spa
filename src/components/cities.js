import React, {Component, Fragment} from 'react';

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
    <p style={{color: "red"}} >
      Warning: city is already in the list or invalid name
    </p>
  )
  
  addAlert = () => (
    <p style={{color: "green"}}>
      Add your city (if you want to)
    </p>
  )

  handleName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  renderCities = (cities) =>  
    cities.map((city) => (
      <option>
        {city}
      </option>
    )
  )

  render() {
    const {error, cities, name} = this.state
    return(
      <div>
        <div>
          <select>
            <option selected>Введите название города</option>
            {this.renderCities(cities)}
          </select>
          {'   '}
          <input 
            placeholder="Enter city name"  
            value={this.state.name}
            onChange={this.handleName}  
          />
          {'  '}
          <button 
            onClick={() => { 
              this.createCityOption();
            }
            }
          >
            Add
          </button>
          {error&&name ? this.cityWarning(): this.addAlert()}
        </div>
      </div>
    )
  }
}

export default AddCity;