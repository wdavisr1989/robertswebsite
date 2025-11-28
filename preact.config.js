const netlifyPlugin = require('preact-cli-plugin-netlify');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (config, env) => {
	netlifyPlugin(config);
	
	// Copy static files to build directory
	config.plugins.push(
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/static', to: '.' }
			]
		})
	);
	
	env.production && !env.ssr && config.plugins.push(new ImageminPlugin({
		from: './build/assets/**',
		pngquant: {
			quality: '60'
		},
		plugins: [
			imageminMozjpeg({
				quality: 50,
				progressive: true
			})
		]
	}));
	return config;
};
