import React from 'react'
import {connect} from 'react-redux'

import { getCompanyThunkCreator} from '../../store/single-company'
import SearchBar from './search-bar'
import TradeForm from './trade-form'

import './trade.css'

//TODO-convert to stateless?

class DisconnectedTrade extends React.Component{
  constructor(props){
    super()
  }

  render(){
    return(
    <div id='trade-container'>
      <h1>Trade</h1>
      <SearchBar setCompany={this.props.setCompany}/>
      {this.props.company.symbol? <TradeForm /> : <br/>}
    </div>)
  }
}

const mapStateToProps = state => ({
  company: state.singleCompany
})

const mapDispatchToProps = dispatch => ({
  setCompany: (ticker, id) => dispatch(getCompanyThunkCreator(ticker, id))
})

export const Trade = connect(mapStateToProps, mapDispatchToProps)(DisconnectedTrade)
