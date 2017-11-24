const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');
const serveStatic = require('serve-static');
const helmet = require('helmet');

const app = require('express')();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`listening port ${port}...`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const setHeaders = (res, path) => {
	if (serveStatic.mime.lookup(path) === 'text/html') {
		// Custom Cache-Control for HTML files
		res.setHeader('Cache-Control', 'public, max-age=0')
	}
};

const publicPath = path.resolve(__dirname, '../../public');
app.use(serveStatic(publicPath, {
	maxAge: '1d',
	setHeaders
})).use(compression()).use(helmet());
app.disable('x-powered-by');

app.get('/api/health', (req, res) => {
	res.send({status: 'Ok'});
});

const apps = require('../../mocks/apps');
app.get('/api/apps', (req, res) => {
	res.send(apps);
});

app.get('/api/fragments/:appId', (req, res) => {
	res.send(require(`../../mocks/${req.params.appId}.js`));
});
