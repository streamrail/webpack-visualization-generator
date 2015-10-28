
export default function(templateData) {
	var links = (function(links = []){
		return links.map((link)=> {
			`<a target="_blank" href="${link.href}">${link.name}</a>`;
		}).join('\n');
	})(templateData.config.links);
	var title = templateData.config.title || 'Webpack Visualizer';
    return (
`<!doctype html>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="description" content="Visualize and analyze your Webpack bundle to see which modules are taking up space and which might be duplicates." />
    <meta name="viewport" content="width=750, initial-scale=1"/>
    <link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>
</head>
<body class="HolyGrail">
  <header><h1>${title}</h1></header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">
    	<div id="App">${templateData.appHTML}</div>
    </main>
    <nav class="HolyGrail-nav">
    	${links}
    	<div>Build No. 333</div>
    	<a href="#">Commit 3442j32</a>
    </nav>
  </div>
</body>
<body>
    <script>${templateData.js}</script>
</body>`
    );
}
