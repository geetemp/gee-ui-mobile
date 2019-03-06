import React from "react";
const AntTabBar = require("antd-mobile/lib/tab-bar");

export default class TabBar extends React.Component {
	render() {
		return <AntTabBar {...this.props} />;
	}
}

