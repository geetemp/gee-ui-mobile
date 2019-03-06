import React from "react";
import ReactDOMServer from "react-dom/server";
import _ from "lodash";
import * as path from "path";
// 把markdown转成react virtual dom
import marksy from "marksy/components";
import { storiesOf } from "@storybook/react";
// 用来在stories之间相互跳转
import LinkTo from "@storybook/addon-links/react";
// 在运行时中配置story的UI
import { setOptions } from "@storybook/addon-options";
// custom story UI
import { exampleStory } from "../.storybook/geeid-docs-addon";
import readmeText from "!!raw-loader!../README.md";
import introText from "!!raw-loader!./intro.md";
// markdown中jsx语法高亮
import SyntaxHighlighter, {
	registerLanguage
} from "react-syntax-highlighter/prism-light";
import jsx from "react-syntax-highlighter/languages/prism/jsx";
import okaidia from "react-syntax-highlighter/styles/prism/okaidia";
import "../src/index.less";

registerLanguage("jsx", jsx);

const loadAllKeys = (reqContext, rawContext) => {
	return _.map(_.get(reqContext, "keys", _.constant([]))(), key => ({
		key,
		module: reqContext(key),
		raw: rawContext(key)
	}));
};

const getDefaultExport = module => {
	if (module.__esModule) {
		return module.default;
	}
	return module;
};

// 判断组件是否私有
const isPrivate = component =>
	component._isPrivate || (component.peek && component.peek.isPrivate);

const getExamplesFromContext = (reqExamples, rawContext) =>
	_.map(loadAllKeys(reqExamples, rawContext), ({ key, module, raw }) => ({
		name: _.join(_.reject(_.words(key), w => /^(\d+)|jsx?$/.test(w)), " "),
		Example: getDefaultExport(module),
		source: raw
	}));

// ‘扎勾’svg图片
const checkIconSVG = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" style="fill: rgb(42, 187, 176)">
	<path d="M11.92 5.19c.285.284.285.748 0 1.032l-4.932 4.98c-.285.286-.748.286-1.033 0L3.47 8.85c-.286-.287-.286-.748 0-1.034l.287-.343c.285-.286.747-.286 1.033 0l1.747 1.614 4.13-4.127c.284-.285.748-.285 1.033 0l.22.23z"></path>
</svg>
`;

// 重写markdown中a,ul,li的样式
const styles = {
	link: {
		color: "#2abbb0",
		textDecoration: "underline",
		cursor: "pointer",
		outline: "none"
	},
	ul: {
		listStyleImage: `url('data:image/svg+xml;base64,${window.btoa(
			checkIconSVG
		)}')`
	},
	li: {
		margin: "8px 0"
	}
};

const compile = marksy({
	createElement: React.createElement,
	highlight: (language, code) =>
		ReactDOMServer.renderToStaticMarkup(
			<SyntaxHighlighter language={language || "jsx"} style={okaidia}>
				{code}
			</SyntaxHighlighter>
		),
	elements: {
		a: props => <a {...props} style={styles.link} />,
		ul: props => <ul {...props} style={styles.ul} />,
		li: props => <li {...props} style={styles.li} />
	},
	components: {
		LinkTo: props => <LinkTo {...props} style={styles.link} />
	}
});

class ArticlePage extends React.Component {
	constructor(...args) {
		super(...args);
	}

	componentDidMount() {
		if (typeof window !== "undefined") {
			window.document.documentElement.scrollTop = 0;
		}

		setOptions({
			showAddonPanel: false
		});
	}

	render() {
		const { children } = this.props;

		return (
			<article style={{ width: "100%", height: "100%" }}>
				<a href="https://github.com/geetemp">
					<img
						style={{ position: "absolute", top: 0, right: 0, border: 0 }}
						src="//camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
						srcSet="//aral.github.io/fork-me-on-github-retina-ribbons/right-graphite@2x.png 2x"
						alt="Fork me on GitHub"
						data-canonical-src="//s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
					/>
				</a>
				{children}
			</article>
		);
	}
}

storiesOf("gee UI Mobile", module)
	.add("Introduction", () => (
		<ArticlePage>{compile(introText).tree}</ArticlePage>
	))
	.add("Readme", () => <ArticlePage>{compile(readmeText).tree}</ArticlePage>);

const loadedComponents = require("./load-components");

//过滤掉私有组件
const filteredComponents = _.reject(loadedComponents, ({ component }) =>
	isPrivate(component)
);

// 一级组件分组
const groupedComponents = _.groupBy(filteredComponents, ({ component }) =>
	_.get(component, "peek.categories[0]", "misc")
);

_.reduce(groupedComponents, (storyKind, componentGroup, category) => {
	// 二级组件分组
	const subGroupedComponents = _.groupBy(componentGroup, ({ component }) =>
		_.get(component, "peek.categories[1]", "misc")
	);

	return storyKind.add(_.capitalize(category), () => (
		<ArticlePage>
			<h1>{_.capitalize(category)}</h1>
			<section
				style={{
					display: "flex",
					flexWrap: "wrap"
				}}
			>
				{_.map(subGroupedComponents, (componentSubGroup, subCategory) => (
					<section
						key={subCategory}
						style={{
							marginRight: 10,
							marginBottom: 10,
							backgroundColor: "rgb(247,247,247)",
							padding: 6,
							width: 200
						}}
					>
						{subCategory !== "misc" && (
							<h3
								style={{
									marginTop: 0,
									textAlign: "center"
								}}
							>
								{_.capitalize(subCategory)}
							</h3>
						)}
						<section
							style={{
								display: "flex",
								flexDirection: "column"
							}}
						>
							{_.map(componentSubGroup, ({ name }) => (
								<div
									key={name}
									style={{
										margin: 10
									}}
								>
									<LinkTo style={styles.link} kind={name}>
										{name}
									</LinkTo>
								</div>
							))}
						</section>
					</section>
				))}
			</section>
		</ArticlePage>
	));
});

const storiesOfAddSequence = [];

// 组件stories
_.forEach(
	filteredComponents,
	({ name: componentName, component, examplesContext, examplesContextRaw }) => {
		const examples = getExamplesFromContext(
			examplesContext,
			examplesContextRaw
		);
		_.forEach(examples, ({ name, Example, source }) => {
			storiesOfAddSequence.push([
				componentName,
				() => {
					storiesOf(componentName, module).add(
						name,
						exampleStory({
							component,
							code: source,
							example: Example,
							path: [componentName],
							options: { showAddonPanel: true }
						})
					);
				}
			]);
		});
	}
);

// const requireExampleDotStoriesJs = require.context(
// 	'./examples',
// 	true,
// 	/.stories.js$/
// );

// requireExampleDotStoriesJs.keys().forEach(filename => {
// 	const componentName = path.basename(filename, '.stories.js');
// 	storiesOfAddSequence.push([
// 		componentName,
// 		() => {
// 			requireExampleDotStoriesJs(filename);
// 		},
// 	]);
// });
_.forEach(_.sortBy(storiesOfAddSequence, _.property("0")), ([, addStory]) =>
	addStory()
);
