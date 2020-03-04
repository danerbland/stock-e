import React from 'react'

const PortfolioListItem = (props) => {

  const {quantity, averagePrice} = props.company.portfolioCompany
  const {ticker, companyName, currentPrice, change, changePercent} = props.company
  const diffPerShare = (currentPrice - averagePrice)
  const totalChange = (quantity * diffPerShare /100)

  const pricePrefix = totalChange >= 0 ? '+' : ''

  return(
    <div className ='portfolio-list-item'>
      <div className='pli-header'>
        <h2>{ticker}</h2>
        <h3>{companyName}</h3>
      </div>
      <div className='pli-info'>
        <p className='pli-attribute'>Today's gain/loss: <br/>${change * quantity}</p>
        <p className='pli-attribute'>Total gain/loss: <br/>{pricePrefix} ${totalChange}</p>
        <p className='pli-attribute'>Current Value: <br/>${currentPrice * quantity / 100}</p>
        <p className='pli-attribute'>Shares: <br/>{quantity}</p>
        <p className='pli-attribute'>Current price: <br/>${currentPrice /100}</p>
        <p className='pli-attribute'>Cost Basis: <br/>${averagePrice / 100}/share</p>


      </div>
      <button onClick={() => props.tradeCompany(ticker)}>Trade</button>
    </div>
  )
}

export default PortfolioListItem
