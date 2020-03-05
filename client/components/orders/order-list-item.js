import React from 'react'

const OrderListItem = (props) => {

  const {type, price, quantity, createdAt} = props.order
  const {ticker, name} = props.order.company

  const date = new Date(createdAt)
  // const[year, month, day, time] = [date.getYear(), date.getMonth() + 1, date.getDate(), ]

  return(
    <div className ='order-list-item'>
      <p>{date.toUTCString()}</p>
      <div className = 'oli-info-row'>
        <h3>{ticker}</h3>
        <h4>{name}</h4>
      </div>
      <div className = 'oli-info-row'>
      <p className='oli-attribute'>{type}: {quantity} shares</p>
        <p className='oli-attribute'>price: ${price/100}</p>
      </div>
      <div className = 'order-divider'></div>
    </div>
  )
}

export default OrderListItem
