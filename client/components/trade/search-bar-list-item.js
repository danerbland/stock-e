import React from 'react'

const SearchBarListItem = (props) => {

  const{ticker, name} = props.company

  return(
    <div className = 'sbli-container' onClick={() => {
      props.setCompany(ticker)
      props.clickHandler(ticker)
    }}>
        <h2>{ticker}</h2>
        <h3>  -  {name}</h3>
    </div>
  )
}

export default SearchBarListItem
