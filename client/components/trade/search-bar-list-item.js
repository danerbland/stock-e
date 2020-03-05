import React from 'react'

const SearchBarListItem = (props) => {

  const{id, ticker, name} = props.company

  return(
    <div className = 'sbli-container' onClick={() => {
      props.setCompany(ticker, id)
      props.clickHandler(ticker)
    }}>
        <h2>{ticker}</h2>
        <h3>  -  {name}</h3>
    </div>
  )
}

export default SearchBarListItem
