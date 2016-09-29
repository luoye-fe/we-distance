var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

function cssExtractLoaders(options) {
	options = options || {};

	function generateLoaders(loaders) {
		let sourceLoader = loaders.map((loader) => {
			let extraParamChar;
			if (/\?/.test(loader)) {
				loader = loader.replace(/\?/, '-loader?');
				extraParamChar = '&';
			} else {
				loader = loader + '-loader';
				extraParamChar = '?';
			}
			return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
		}).join('!');

		if (options.extract) {
			return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
		} else {
			return ['vue-style-loader', sourceLoader].join('!');
		}
	}

	return {
		css: generateLoaders(['css']),
		postcss: generateLoaders(['css']),
		less: generateLoaders(['css', 'less']),
		sass: generateLoaders(['css', 'sass?indentedSyntax']),
		scss: generateLoaders(['css', 'sass']),
		stylus: generateLoaders(['css', 'stylus']),
		styl: generateLoaders(['css', 'stylus'])
	};
};

module.exports = {
	entry: {
		app: path.join(__dirname, './src/js/app.js')
	},
	devtool: '#eval-source-map',
	output: {
		path: path.join(__dirname, './dist/js/'),
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		},{
			test: /\.js$/,
			loader: 'babel',
			exclude: path.join(__dirname, '../', 'node_modules/')
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf|woff)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	resolve: {
		extensions: ['', '.js', '.vue', '.scss'],
		alias: {
			utils: path.join(__dirname, './src/js/utils'),
			store: path.join(__dirname, './src/js/vuex'),
			actions: path.join(__dirname, './src/js/vuex/actions')
		}
	},
	vue: {
		loaders: cssExtractLoaders()
	}
};