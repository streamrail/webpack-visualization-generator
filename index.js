var createHTMLString = require('./src/index.html.js');
var fs = require('fs');
var path = require('path');

module.exports = function webpackVisualizationGenerator(options) {
	options = options || {};
	var js = fs.readFileSync(path.join(__dirname, './bundle/bundle.js'), 'utf8');
	var json = JSON.stringify(options.json || {});

	return createHTMLString({
		js: js,
		config: options,
		json: json
	});
};