import React from "react";
const AntPicker = require("antd-mobile/lib/picker");

export default class Picker extends React.Component {
	render() {
		return <AntPicker {...this.props} />;
	}
}

