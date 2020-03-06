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

export const getCompanyThunkCreator = (ticker, companyId) => async(dispatch)=> {
  try {
    const {data} = await axios.get(`/api/companies/singleCompany/${ticker}`)
    dispatch(getCompany({...data, companyId}))
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
