import React from "react";
import { NavBar as AntNavBar } from "antd-mobile";
import "./style/index.less";

export default class NavBar extends React.Component {
	render() {
		return <AntNavBar {...this.props} />;
	}
}

