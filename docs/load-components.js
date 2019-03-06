const getDefaultExport = module => {
	if (module.__esModule) {
		return module.default;
	}
	return module;
};

module.exports = [
	{
		name: "Button",
		component: getDefaultExport(require("../src/components/button")),
		examplesContext: require.context(
			"../src/components/button/examples",
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			"!!raw-loader!../src/components/button/examples",
			true,
			/\.jsx?$/
		)
	}
];
