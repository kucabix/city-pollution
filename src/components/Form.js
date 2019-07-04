import React from 'react'
import Select from 'react-select'
import { FaSearch } from 'react-icons/fa'

// declaring possible options for react-select
const countryName = [
  {value: 'PL', label:'Poland'},
  {value: 'DE' , label:'Germany'},
  {value: 'FR' , label:'France'},
  {value: 'ES', label:'Spain'},
  {value: 'CZ', label:'Czech Republic'},
  {value: 'GB', label:'Great Britain'},
  {value: 'NO', label:'Norway'},
]

// returning one-field-form with an autocomplete input field
const Form = props => {
  return(
    <form className='input-form' onSubmit={props.onSubmit}>
      <Select
        className='input-field'
        onChange={props.onChange}
        value={props.value}
        options={countryName}
      />
      <button className='submit-btn'><FaSearch /></button>
    </form>
  )
}

export default Form
