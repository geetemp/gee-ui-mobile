import React from "react";
import { InputItem as AntInputItem } from "antd-mobile";
import "./style/index.less";

export default class InputItem extends React.Component {
	render() {
		return <AntInputItem {...this.props} />;
	}
}

