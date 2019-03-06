import React, { Component } from "react";
import "../style";
import Button from "../index";

const sectionStyle = {
	display: "flex",
	flexDirection: "column"
};

const articleStyle = {
	display: "flex",
	margin: "5px 0px"
};

const buttonStyle = {
	marginRight: "5px"
};

export default class extends Component {
	render() {
		return (
			<section style={sectionStyle}>
				<article style={articleStyle}>
					<Button style={buttonStyle} type="danger">
						danger
					</Button>
					<Button type="danger" disabled={true}>
						danger disabled
					</Button>
				</article>
			</section>
		);
	}
}
