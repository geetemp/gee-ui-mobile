import React from "react";
import { Button as AntButton } from "antd-mobile";
import "./style/index.less";

export default class Button extends React.Component {
	render() {
		const { className } = this.props;
		return <AntButton {...this.props} className={`gee-m-button ${className}`} />;
	}
}
