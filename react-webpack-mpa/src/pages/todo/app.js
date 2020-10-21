
import React from "react";
import { connect } from "react-redux";
import logo from './images/about.jpg'
import Nav from "component/nav";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {

		return (
			<div>
				<Nav />
				<div>{this.props.test}</div>
				<img src={logo} alt="" />
			</div>
		);
	}
}

export default connect(state => state, {})(App);

