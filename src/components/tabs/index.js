import React from "react";
import { Tabs as AntTabs } from "antd-mobile";
import "./style/index.less";

export default class Tabs extends React.Component {
	render() {
		return <AntTabs {...this.props} />;
	}
}