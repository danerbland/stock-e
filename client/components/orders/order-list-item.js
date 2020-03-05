import React from 'react'

const OrderListItem = (props) => {

  console.log(props.order)

  const {type, price, quantity, createdAt} = props.order
  const {ticker, name} = props.order.company

  const date = new Date(createdAt)
  // const[year, month, day, time] = [date.getYear(), date.getMonth() + 1, date.getDate(), ]

  return(
    <div className ='order-list-item'>
      <div className='oli-header'>
      <p>{date.toUTCString()}</p>
        <h3>{ticker}</h3>
        <h4>{name}</h4>
      </div>
      <div className='pli-info'>
        <p className='pli-attribute'>{type}: <br/>{quantity} shares</p>
        <p className='pli-attribute'>price: <br/>${price/100}</p>



      </div>
    </div>
  )
}

export default OrderListItem
