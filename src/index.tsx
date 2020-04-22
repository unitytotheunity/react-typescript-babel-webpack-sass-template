import * as React from "react";
import * as ReactDOM from "react-dom";

import './scss/global.scss'; // Global styling information
import { Hello } from "./components/App";

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById("example")
);

