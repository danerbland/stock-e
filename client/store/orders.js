import axios from 'axios'
import history from '../history'
import store from './'

import {getPortfolioThunkCreator} from './portfolio'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const CLEAR_ORDERS = 'REMOVE_PORTFOLIO'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})
export const clearOrders = () => ({type: CLEAR_ORDERS})

/**
 * THUNK CREATORS
 */

export const getOrdersThunkCreator = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/')
    dispatch(getOrders(data))
  } catch (error) {
    console.error(error)
  }
}

//make a new order, update the order and the portfolio on state
export const postOrderThunkCreator = (reqBody) => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders/', reqBody)
    dispatch(getOrdersThunkCreator())
    dispatch(getPortfolioThunkCreator())
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case CLEAR_ORDERS:
      return defaultOrders
    default:
      return state
  }
}
