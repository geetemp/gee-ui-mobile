import React from "react";
const AntTabs = require("antd-mobile/lib/tabs");

export default class Tabs extends React.Component {
	render() {
		return <AntTabs {...this.props} />;
	}
}