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
    this.refreshPortfolio = this.refreshPortfolio.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  //TODO make button rotate every time. Currently rotates on odd click numbers.
  clickHandler = async(event) => {
    const classList = event.target.classList
    classList.toggle('rotate')
    await this.refreshPortfolio()
  }

  refreshPortfolio = () => {
    this.props.getPortfolio()
  }

  setCompanyToTrade = (ticker, id) => {
    this.props.setCompany(ticker, id)
  }

  async componentDidMount(){
    await this.props.getPortfolio()
  }

  render(){

    return (
    <div id = 'portfolio-container'>
      <div id= 'portfolio-top-row'>
        <h1>My Portfolio.</h1>
        <img src='./assets/icons/refresh.png' onClick={this.clickHandler} id='portfolio-refresh-button'/>
      </div>
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
