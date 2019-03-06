import { configure } from '@storybook/react';

function loadStories() {
	console.log('process.env.NODE_ENV', process.env.NODE_ENV);
	// if (process.env.NODE_ENV === 'documentation') {
	require('../docs/index.stories.js');
	// } else {
	// 	requireDotStoriesJs
	// 		.keys()
	// 		.forEach(filename => requireDotStoriesJs(filename));
	// }
}

configure(loadStories, module);
