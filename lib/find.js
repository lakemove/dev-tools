var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;


function Finder(opt) {
	this.options = opt || {};
}
util.inherits(Finder, EventEmitter);

Finder.prototype.find = function(dir) {
	var that = this;
	fs.readdir(dir, function(err, files) {
		if (err) {
			if(that.options.ignoreError != true) throw err;
			return;//ignore this file
		} 
		files.forEach(function(file) {
			var fpath = path.resolve(dir, file);
			fs.stat(fpath, function(err, stats) {
				if (err) {
					if(that.options.ignoreError != true) throw err;
					return;//ignore this file
				} 
				if (stats.isFile()) {
					that.emit('file', fpath, stats);
				} else if (stats.isDirectory()) {
					that.emit('directory', fpath, stats);
					that.find(fpath);//recursive find
				} 
			});
		});
	});
}

exports = module.exports = Finder;
exports.Finder = Finder;