import React from 'react'

const PortfolioListItem = (props) => {

  const {quantity, averagePrice, companyId} = props.company.portfolioCompany
  const {ticker, companyName, currentPrice, change, changePercent} = props.company

  const diffPerShare = currentPrice - averagePrice
  const todayChangeDisplay = Math.abs((change * quantity)).toFixed(2)
  const totalChangeDisplay = Math.abs((quantity * diffPerShare /100)).toFixed(2)
  const currentValue = (currentPrice * quantity / 100).toFixed(2)

  const pricePrefix = val => {
    return val > 0 ? '+' : '-'
  }

  const redOrGreen = val => {
    return val > 0 ? 'green' : 'red'
  }

  return(
    <div className ='portfolio-list-item'>
      <div className='pli-header'>
        <h2>{ticker}</h2>
        <h3>{companyName}</h3>
      </div>
      <div className='pli-info'>
        <p className={`pli-attribute ${redOrGreen(change)}`}>Today's gain/loss: <br/>{pricePrefix(change)}${todayChangeDisplay}</p>
        <p className={`pli-attribute ${redOrGreen(diffPerShare)}`}>Total gain/loss: <br/>{pricePrefix(diffPerShare)} ${totalChangeDisplay}</p>
        <p className='pli-attribute'>Current Value: <br/>${currentValue}</p>
        <p className='pli-attribute'>Shares: <br/>{quantity}</p>
        <p className='pli-attribute'>Current price: <br/>${(currentPrice /100).toFixed(2)}</p>
        <p className='pli-attribute'>Cost Basis: <br/>${(averagePrice / 100).toFixed(2)}/share</p>


      </div>
      <button onClick={() => props.tradeCompany(ticker, companyId)}>Trade</button>
    </div>
  )
}

export default PortfolioListItem
