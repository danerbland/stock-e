import React from 'react'

import {NavBar} from './components'
import Routes from './routes'

const App = () => {

  console.log("rendering App")

  return (
    <div id='top-container'>
      <div id="background-image" className="background-image fadein" />
      <NavBar />
      <Routes />
    </div>
  )
}

export default App;
