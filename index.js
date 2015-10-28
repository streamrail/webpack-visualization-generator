require('es6-promise').polyfill();

import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './src/app';
import createHTMLString from './src/index.html.js';
import webpack from 'webpack';
import webpackDevConfig from './webpack.dev';
import webpackProdConfig from './webpack.prod';
import MemoryFS from 'memory-fs';
import path from 'path';

export default function buildHTML(options = {}) {
	return new Promise((resolve, reject) => {
		var fs = new MemoryFS();
		var isProd = options.env === 'production' || process.env.NODE_ENV === 'production';
		var isDev = !isProd;
		var webpackConfig = isProd ? webpackProdConfig : webpackDevConfig;
		var {config={}} = options;
		var appHTML = ReactDOM.renderToString(<App config={config}/>);

		webpackConfig.plugins.push(new webpack.DefinePlugin({
            'process.env': {		
                VISUALIZER_CONFIG: JSON.stringify(config)
            }
        }));

		var compiler = webpack(webpackConfig);

		compiler.outputFileSystem = fs;
		compiler.run(function(err, stats) {
			if (err) {
				reject(err);
				return;
			}
		  	var js = fs.readFileSync(path.join(webpackConfig.output.path, webpackConfig.output.filename));
		  	resolve(createHTMLString({
	    		appHTML,
	    		js,
	    		config: config
			}));

		});
	});
}