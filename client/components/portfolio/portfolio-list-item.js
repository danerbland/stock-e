import React from 'react'

const PortfolioListItem = (props) => {

  const {quantity, averagePrice} = props.company.portfolioCompany
  const {ticker, companyName, currentPrice} = props.company
  const diffPerShare = (averagePrice - currentPrice) /100
  const totalChange = (quantity * diffPerShare /100)

  const pricePrefix = totalChange >= 0 ? '+' : '-'

  return(
    <div className ='portfolio-list-item'>
      <div className='pli-header'>
        <h2>{ticker}</h2>
        <h3>{companyName}</h3>
      </div>
      <div className='pli-info'>
      <p>shares: {quantity}</p>
      <p>current price: {currentPrice}</p>
      <p>share price </p>
      <p>since purchase: {pricePrefix} {totalChange}</p>

      </div>
      <button onClick={() => props.tradeCompany(ticker)}>Trade</button>
    </div>
  )
}

export default PortfolioListItem
