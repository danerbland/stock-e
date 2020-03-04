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

  setCompanyToTrade = (ticker) => {
    this.props.setCompany(ticker)
  }

  async componentDidMount(){
    console.log('portfolio mounted')
    this.props.getPortfolio()
    await this.props.getPortfolio()
  }

  render(){

    console.log('rendering... portfolio: ', this.props.portfolio)

    return (
    <div id = 'portfolio-container'>
      <h1>My Portfolio</h1>
      <div className = 'divider'></div>
      <div className = 'portfolio-list-container'>
        {this.props.portfolio.map (element => {

        console.log("mapping over: ", element)
        return (<PortfolioListItem company={element} tradeCompany={this.setCompanyToTrade} key={element.ticker}/>)}
          )}
      </div>

    </div>
  )}
}


const mapStateToProps = state => ({
  portfolio: state.portfolio
})
const mapDispatchToProps = dispatch => ({
  getPortfolio: () => dispatch(getPortfolioThunkCreator()),
  removePortfolio: () => dispatch(removePortfolio()),
  setCompany: (ticker) => dispatch(getCompanyThunkCreator(ticker))
})

export const Portfolio = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedPortfolio
)
