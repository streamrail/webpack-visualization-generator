var webpackVisualizationGenerator  = require('../index');
var fs = require('fs');
var path = require('path');
fs.writeFileSync(path.join(__dirname, './basic.html'), webpackVisualizationGenerator({
    title: 'Streamrail',
    links: [{
    	name: 'playa-platform',
    	href: 'https://github.com/streamrail/playa-platform/'
    }, {
    	name: 'commit',
    	href: 'https://github.com/streamrail/playa-platform/commit/2641703a9f70c35fc624fd05ca1598d19588a611'
    }],
    headerBackgroundColor: '#01579b',
    headerTextColor: 'white',
    json: 'stats.json'
}));