import React from "react";
const AntButton = require("antd-mobile/lib/button");

export default class Button extends React.Component {
	render() {
		const { className } = this.props;
		return <AntButton {...this.props} className={`gee-m-button ${className}`} />;
	}
}
