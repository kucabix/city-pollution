import React from 'react'
import Header from './components/Header'
import Form from './components/Form'
import CityAccordion from './components/CityAccordion'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // input field value
      currentCountry: localStorage.getItem('countryStorage'),
      // submitted country value
      selectedCountry: '',
      // 10 most polluted cities from openAQ api
      citiesAQ: [],
      // loading boolean
      isLoading: false
    }
  }
  // getting localStorage(if any) value when component is mounted
  componentDidMount() {
    localStorage.getItem('countryStorage') && this.setState({
      currentCountry: JSON.parse(localStorage.getItem('countryStorage'))
    })
  }

  // using comoponentDidUpdate to fetch data each time selectedCountry is changed in the input field
  componentDidUpdate(prevProps, prevState) {
    const {selectedCountry} = this.state
    if (selectedCountry !== prevState.selectedCountry) {
      this.setState({isLoading: true})
      // using open api to get the most polluted cities by pm2.5 parameter, the response gives 300 cities by last measurements
      fetch('https://api.openaq.org/v1/latest?order_by=measurements[0].value&sort=desc&limit=300&parameter=pm25&country=' + selectedCountry.value)
        .then(response => response.json())
        .then(response => {
            const cities = this.handleCity(response)
            this.setState({citiesAQ: cities, isLoading: false})
        })
    }
  }

  // data validation: deleting old results and repeated items
  handleCity = city => {
    const now = new Date()
    const cities = []
    for (let i = 0; i < city.results.length; i++) {
      (parseInt(city.results[i].measurements[0].lastUpdated.substring(0,4)) === now.getFullYear()) &&
      (!cities.includes(city.results[i].city, 0)) &&
      cities.push(city.results[i].city)
    }
    // returns 10 most polluted cities
    return cities.slice(0,10)
  }

  // using onChange functionality from react-select
  handleChange = currentCountry => {
    localStorage.setItem('countryStorage', JSON.stringify(currentCountry))
    this.setState({currentCountry})
  }

  // preventing default submitting and updating selectedCountry
  handleSubmit = event => {
    event.preventDefault()
    this.setState({selectedCountry: this.state.currentCountry})
  }

  // rendering Header, Form with react-select input, and CityAccordion with WikiData components
  render(){
    const {citiesAQ, currentCountry, isLoading} = this.state
    const accordionClass = isLoading ? 'accordion-loading' : 'accordion'
    return (
      <div className='main-container'>
        <Header />
        <Form
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          value={currentCountry}
        />
        <CityAccordion
          className={accordionClass}
          citiesArray={citiesAQ}
          loading={isLoading}
        />
      </div>
    );
  }
}

export default App;
