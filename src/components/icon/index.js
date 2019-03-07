import React from "react";
import { Icon as AntIcon } from "antd-mobile";
import "./style/index.less";

export default class Icon extends React.Component {
	render() {
		return <AntIcon {...this.props} />;
	}
}

