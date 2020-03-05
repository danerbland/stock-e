import React from 'react'
import {connect} from 'react-redux'

import {getOrdersThunkCreator, clearOrders } from '../../store/orders'

import OrderListItem from './order-list-item'

import './orders.css'

class DisconnectedOrders extends React.Component{

  constructor(){
    super()
  }

  async componentDidMount(){
    await this.props.getOrders()
  }

  render(){

    console.log('rendering orders')

    return (
    <div id = 'order-container'>
      <h1>My Order History.</h1>
      <div className = 'divider'></div>
      <div className = 'order-list-container'>
      {this.props.orders.map (order => {
        return (<OrderListItem order={order} key={order.id}/>)}
      )}
      </div>

    </div>
  )}
}


const mapStateToProps = state => ({
  orders: state.orders,
})
const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(getOrdersThunkCreator()),
  clearOrders: () => dispatch(clearOrders()),
})

export const Orders = connect(mapStateToProps, mapDispatchToProps)(DisconnectedOrders)
