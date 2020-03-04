import React from 'react'
import {connect} from 'react-redux'


import { getPortfolioThunkCreator, removePortfolio } from '../../store/portfolio'

class DisconnectedPortfolio extends React.Component{

  constructor(props){
    super()
  }

  async componentDidMount(){
    console.log("in componenetDidMount")
    this.props.getPortfolio()
    // await this.props.getPortfolio()
  }

  render(){

    console.log(this.props.portfolio)

    return (
    <div>
      Portfolio here
    </div>
  )}
}


const mapStateToProps = state => ({
  portfolio: state.portfolio
})
const mapDispatchToProps = dispatch => ({
  getPortfolio: () => dispatch(getPortfolioThunkCreator()),
  removePortfolio: () => dispatch(removePortfolio())
})

export const Portfolio = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedPortfolio
)
