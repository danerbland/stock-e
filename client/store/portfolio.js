import axios from 'axios'
import history from '../history'
import store from './'

/**
 * ACTION TYPES
 */
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const REMOVE_PORTFOLIO = 'REMOVE_PORTFOLIO'

/**
 * INITIAL STATE
 */
const defaultPortfolio = []

/**
 * ACTION CREATORS
 */
const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
const removePortfolio = () => ({type: REMOVE_PORTFOLIO})

/**
 * THUNK CREATORS
 */

export const getPortfolioThunkCreator = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolios/')
    dispatch(getPortfolio(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.user
    case REMOVE_PORTFOLIO:
      return defaultPortfolio
    default:
      return state
  }
}
