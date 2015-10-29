var createHTMLString = require('./src/index.html.js');
var fs = require('fs');

module.exports = function webpackVisualizationGenerator(options) {
	options = options || {};
	var js = fs.readFileSync('./bundle/bundle.js', 'utf8');
	var json = JSON.stringify(options.json || {});

	return createHTMLString({
		js: js,
		config: options,
		json: json
	});
};