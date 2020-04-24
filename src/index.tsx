import 'react-hot-loader' // Have to import this first
import * as React from "react"
import * as ReactDOM from "react-dom"
import App from './components/App'

import './scss/global.scss' // Global styling information

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
