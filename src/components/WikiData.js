import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import PropTypes from 'prop-types'

class WikiData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // string with data fetched from wiki API
      wikiData: '',
      // loading boolean
      isLoading: false
    }
  }

  // fetching data from wiki API each time Component is mounted
  componentDidMount() {
    this.setState({isLoading: true})
    // getting html extract from wiki query and allowing redirects
    fetch('https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&redirects=1&titles=' + this.props.wikiItem)
      .then(response => response.json())
      .then(response => {
        const pagesNum = Object.keys(response.query.pages)
        this.setState({
          // updating wikiData with string including html extract
          wikiData: response.query.pages[pagesNum[0]].extract,
          isLoading: false
        })
      })
  }

  render() {
    // converting html string into valid jsx element and rendering div with wiki data
    return(
      <div>
        <ClipLoader loading={this.state.isLoading} />
        <p dangerouslySetInnerHTML={{__html: this.state.wikiData}}></p>
      </div>
    )
  }
}

WikiData.propTypes = {
  wikiItem: PropTypes.string
}


export default WikiData
