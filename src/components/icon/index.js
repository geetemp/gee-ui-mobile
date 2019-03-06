import React from "react";
const AntIcon = require("antd-mobile/lib/icon");

export default class Icon extends React.Component {
	render() {
		return <AntIcon {...this.props} />;
	}
}

