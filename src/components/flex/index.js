import React from "react";
const AntFlex = require("antd-mobile/lib/flex");

export default class Flex extends React.Component {
	render() {
		return <AntFlex {...this.props} />;
	}
}

Flex.Item = AntFlex.Item;