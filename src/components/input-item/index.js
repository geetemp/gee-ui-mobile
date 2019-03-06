import React from "react";
const AntInputItem = require("antd-mobile/lib/input-item");

export default class InputItem extends React.Component {
	render() {
		return <AntInputItem {...this.props} />;
	}
}

