import React from "react";
const AntNavBar = require("antd-mobile/lib/nav-bar");

export default class NavBar extends React.Component {
	render() {
		return <AntNavBar {...this.props} />;
	}
}

