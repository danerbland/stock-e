import React from 'react'
import {connect} from 'react-redux'


import { getPortfolioThunkCreator, removePortfolio } from '../../store/portfolio'
import { getCompanyThunkCreator} from '../../store/single-company'


import PortfolioListItem from './portfolio-list-item'

import './portfolio.css'

class DisconnectedPortfolio extends React.Component{

  constructor(props){
    super()
    this.setCompanyToTrade = this.setCompanyToTrade.bind(this)
  }

  setCompanyToTrade = (ticker, id) => {
    this.props.setCompany(ticker, id)
  }

  async componentDidMount(){
    this.props.getPortfolio()
    await this.props.getPortfolio()
  }

  render(){

    return (
    <div id = 'portfolio-container'>
      <h1>My Portfolio.</h1>
      <h2>Cash: ${this.props.user.cash/100}</h2>
      <div className = 'divider'></div>
      <div className = 'portfolio-list-container'>
        {this.props.portfolio.map (element => {
        return (<PortfolioListItem company={element} tradeCompany={this.setCompanyToTrade} key={element.ticker}/>)}
          )}
      </div>

    </div>
  )}
}


const mapStateToProps = state => ({
  portfolio: state.portfolio,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  getPortfolio: () => dispatch(getPortfolioThunkCreator()),
  removePortfolio: () => dispatch(removePortfolio()),
  setCompany: (ticker, id) => dispatch(getCompanyThunkCreator(ticker, id))
})

export const Portfolio = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedPortfolio
)
