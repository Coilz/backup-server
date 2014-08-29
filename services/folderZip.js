var archiver = require('archiver');
var path = require('path');

module.exports = {
	zipToFile : function(sourceFolder, destinationFolder, blobName, callback) {
		var file_system = require('fs');

		var backupFilePath = path.join(destinationFolder, blobName + '.zip');
		var writable = file_system.createWriteStream(backupFilePath);
		var archive = archiver('zip');

		writable.on('close', function () {
		    console.log(archive.pointer() + ' total bytes');
		    console.log('archiver has been finalized and the writable file descriptor has closed.');
		});

		archive.on('error', function(err){
			throw err;
		});

		try {
			archive.pipe(writable);
			archive.bulk([
			    { expand: true, cwd: sourceFolder, src: ['**'], dest: blobName}
			]);
			archive.finalize();
		} catch (ex) {
			callback(ex);
			return;
		}

		var result = {
			backupFilePath: backupFilePath
		};

		callback(null, result);
	}
}