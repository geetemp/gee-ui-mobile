import React from "react";
import { Flex as AntFlex } from "antd-mobile";
import "./style/index.less";

export default class Flex extends React.Component {
	render() {
		return <AntFlex {...this.props} />;
	}
}

Flex.Item = AntFlex.Item;