
var http = require('http')
	, util = require('util')
	, crypto = require('crypto')
	, fs = require('fs')
	, request = require('request');


function md5sum(str) {
	var md5hash = crypto.createHash('md5');
	md5hash.update(str);
	var md5 = md5hash.digest('hex');
	return md5;
}

function createProxy(settings) {
	var port = settings.port || 8181;
	var host = settings.host || "localhost";
	var cato = settings.cacheTo || process.pwd;
	console.log('host=%s, port=%s, cacheTo=%s', host, port, cato);

	var app = http.createServer(function(req, resp) {

		var options = {hostname : host, port : port, path : req.url, method : req.method};

		var md5 = md5sum(options.path);
		http.request(options, function(res) {
			res.pipe(fs.createWriteStream(cato + '/' + md5));
			res.on('end', function() {
				fs.createReadStream(cato + '/' + md5).pipe(resp, {close: true});
			});
		});
	});

}

exports.createProxy = createProxy