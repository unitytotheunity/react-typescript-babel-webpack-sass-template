import * as React from "react";
import { setConfig } from "react-hot-loader"
setConfig({ logLevel: "debug" })
import { hot } from "react-hot-loader/root"

import HomePage from "./HomePage/HomePage"

// Global styling information
import "../scss/global.scss"

export interface HomePageProps {}

const App = (props: HomePageProps) => (
  <>
    <HomePage />
  </>
)
export default hot(App)
