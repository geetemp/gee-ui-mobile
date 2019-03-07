import React from "react";
import { Picker as AntPicker } from "antd-mobile";
import "./style/index.less";

export default class Picker extends React.Component {
	render() {
		return <AntPicker {...this.props} />;
	}
}

