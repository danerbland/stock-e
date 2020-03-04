import React from 'react'
import axios from 'axios'

import SearchBarListItem from './search-bar-list-item'

//we won't use redux for this. Instead, we'll keep the companies to list on local state.  We don't need to know anything about them beyond this component.
export default class SearchBar extends React.Component{
  constructor(){
    super()

    //state for lookahead list
    this.state = {
      companies: [],
      ticker: '',
      error: 'No Company Found'
    }

    this.handleChange = this.handleChange.bind(this)
    this.clickHanlder = this.clickHanlder.bind(this)

  }

  //change listener to look up all companies whose ticker starts with input.
  handleChange= async (event) =>{
    const ticker = event.target.value
    if(ticker.length){
      try {
        const {data} = await axios.get(`/api/companies/ticker/${ticker}`)
        if(data.length){
          this.setState({
            ticker,
            companies: data,
            error: ''
          })
        } else {
          this.setState({
            ticker,
            companies:[],
            error: 'No Company Found'
          })
        }
      } catch (error) {
        this.setState({
          error: error.message
        })
      }
    }
  }

  //A utility for clearing the list after a selection is made
  clickHanlder = (ticker) =>{
    this.setState({
      companies: [],
      ticker,
      error: ''
    })
  }

  render(){
    console.log('state: ', this.state)
    return(
      <div id = 'search-bar'>
        <form autoComplete="off" className="search-bar-form">
            <input
              type="text"
              name="ticker"
              className="search-bar-input"
              placeholder="Company Ticker"
              onChange={this.handleChange}
            />
          </form>
        {this.state.error.length? <p>{this.state.error}</p> : <br/>}
        <div id = 'search-bar-list'>
          {this.state.companies.map((company) => <SearchBarListItem company={company} setCompany={this.props.setCompany} clickHandler={this.clickHanlder}/>)}
        </div>
      </div>
    )
  }


}
