exports.styles = function*(task) {
	yield task.source("src/components/**/*.less").target("lib");
};

exports.scripts = function*(task) {
	yield task
		.source([
			"src/components/**/*.js",
			"!src/components/*/examples/*.js",
			"!src/components/**/*.spec.js"
		])
		.babel({
			presets: [["es2015", { loose: true, modules: false }]],
			plugins: [
				"transform-class-properties",
				[
					"import",
					{
						libraryName: "antd-mobile",
						style: true
					}
				]
			]
		})
		.target("lib");
};

exports.build = function*(task) {
	yield task.parallel(["styles", "scripts"]);
};

exports.default = function*(task) {
	yield task.start("build");
	yield task.watch("src/components/**/*.less", "styles");
	yield task.watch(
		[
			"src/components/**/*.js",
			"!src/components/*/examples/*.js",
			"!src/components/**/*.spec.js"
		],
		"scripts"
	);
};

exports.release = function*(task) {
	yield task.clear("lib").start("build");
};
