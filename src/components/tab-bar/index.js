import React from "react";
import { TabBar as AntTabBar } from "antd-mobile";
import "./style/index.less";

export default class TabBar extends React.Component {
	render() {
		return <AntTabBar {...this.props} />;
	}
}

