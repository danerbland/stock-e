import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_COMPANY = 'GET_COMPANY'
const REMOVE_COMPANY = 'REMOVE_COMPANY'

/**
 * INITIAL STATE
 */
const defaultCompany = {}

/**
 * ACTION CREATORS
 */

const getCompany = company => ({type: GET_COMPANY, company})
export const removeCompany = () => ({type: REMOVE_COMPANY})

/**
 * THUNK CREATORS
 */

export const getCompanyThunkCreator = (ticker) => async(dispatch)=> {
  try {

    const requestURL = process.env.IEX_API_ENDPOINT + ticker + '/quote?token=' + process.env.IEX_API_KEY
    const response = await axios.get(requestURL)
    const {data} = response
    console.timeLog('requestURL: ', requestURL)
    console.log('response: ', response)
    console.log('data: ', data)
    dispatch(getCompany(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */


export default function(company = defaultCompany, action) {
  switch (action.type) {
    case GET_COMPANY:
      return action.company
    case REMOVE_COMPANY:
      return defaultCompany
    default:
      return company
  }
}
