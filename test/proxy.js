
var request = require('request');

describe('test proxy', function() {
	var Proxy = require('../lib/proxy.js');
	var proxy = new Proxy({host: 'www.google.com', port : '80'});
	
});