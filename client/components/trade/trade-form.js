import React from 'react'
import {connect} from 'react-redux'

import {postOrderThunkCreator} from '../../store/orders'

class DisconnectedTradeForm extends React.Component{

  constructor(props){
    super()
    this.state = {
      type: 'buy',
      quantity: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }


  //We'll get the single-company from state and create a simple form.
  //The data we send will need to look like:
  /*
  {
    type: type
    quatity: quantity
    companyId: companyId
  }
  */

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    console.log(event)
    const data = {
      type: this.state.type,
      quantity: this.state.quantity,
      companyId: this.props.company.companyId
    }
    try {
      console.log('sending data')
      this.props.postOrder(data)
    } catch (error) {
      console.error(error)
    }
  }

  render(){
    const {symbol, companyName, primaryExchange, latestPrice, change, changePercent, volume} = this.props.company

    return(
      <div id='trade-form-container'>
        <h1>{symbol}</h1>
        <h2>{companyName}</h2>
        <div className='pli-info'>
        <p className='pli-attribute'>Exchange: <br/>{primaryExchange}</p>
        <p className='pli-attribute'>Price: <br/>${latestPrice}</p>
        <p className='pli-attribute'>Day Change: <br/>${change} <br/> {changePercent}%</p>
        <p className='pli-attribute'>Volume: <br/>{volume}</p>
        </div>
        <br/>
        <div className = 'divider'></div>
        <form id='trade-form' onSubmit={this.submitHandler}>
          <label htmlFor="Buy-Sell">Buy or Sell: </label>
            <select id='tf-select' name ="type" onChange={this.handleChange} value={this.state.type}>
              <option value="buy"  selected>
                Buy
              </option>
              <option value="sell">
                Sell
              </option>
            </select>
          <label htmlFor='quantity'>Shares</label>
          <input id='tf-shares' name='quantity' type='number' min='1' onChange={this.handleChange} value={this.state.quantity}></input>
          <button id = 'tf-order-button' type='submit'>Order</button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  company: state.singleCompany,
  portfolio: state.portfolio
})

const mapDispatchToProps = dispatch => ({
  postOrder: (data) => dispatch(postOrderThunkCreator(data))
})

const TradeForm = connect(mapStateToProps, mapDispatchToProps)(DisconnectedTradeForm)

export default TradeForm
