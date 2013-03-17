var Finder = require('../lib/find.js');
describe('test find', function() {
	
	it('should success', function() {
		var finder = new Finder;
		finder.on('file', function(fpath) {
			console.log(fpath);
		});
		finder.find('/tmp');
	});
	
});