// middlewares.js
function rawBodyMiddleware(req, res, next) {
	req.rawBody = '';
	req.on('data', (chunk) => {
		req.rawBody += chunk;
	});
	req.on('end', () => {
		next();
	});
}

module.exports = {
	rawBodyMiddleware
};