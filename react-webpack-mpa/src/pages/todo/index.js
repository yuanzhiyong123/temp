
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {store} from "store/index.js";
import App from "./app.js";
import "./index.scss";

ReactDOM.render(
	<Provider store={store}>   
		<App />
	</Provider>, 
	document.getElementById("root"));
