var zip = require('adm-zip');
var path = require('path');

module.exports = {
	zipToFile : function(sourceFolder, destinationFolder, blobName, callback) {
		var backupFilePath = path.join(destinationFolder, blobName + '.zip');

		try {
			var zipper = new zip();
			zipper.addLocalFolder(sourceFolder, blobName);
			zipper.writeZip(backupFilePath);
		} catch (ex) {
			callback(ex);
			return;
		}

		var result = {
			backupFilePath: backupFilePath
		};

		callback(null, result);
	},
	
	zipToBuffer : function(sourceFolder, blobName, callback) {
		var buffer;

		try {
			var zipper = new zip();
			zipper.addLocalFolder(sourceFolder, blobName);
			buffer = zipper.toBuffer();
		} catch (ex) {
			callback(ex);
			return;
		}

		var result = {
			buffer: buffer
		};

		callback(null, result);
	},

	unzip : undefined
}