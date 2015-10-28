import webpackVisualizationGenerator from '../index';
import fs from 'fs';

webpackVisualizationGenerator({
		env: 'production',
		config: {
			logo: 'http://media.streamrail.com/website/website_logo_dark.png',
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
		}
	})
	.then(function(html){
		fs.writeFile('build/test.html', html);
		console.log('build');
	}, function(err){
		console.error(err);
	})