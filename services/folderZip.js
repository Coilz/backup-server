var archiver = require('archiver');
var fs = require('fs');
var path = require('path');

module.exports = {
	zipToFile : function(sourceFolder, destinationFolder, blobName, callback) {

		if (!fs.existsSync(destinationFolder)) {
			fs.mkdirSync(destinationFolder);
		}

		var backupFilePath = path.join(destinationFolder, blobName + '.zip');
		var writable = fs.createWriteStream(backupFilePath);
		var archive = archiver('zip');

		writable.on('close', function () {
		    console.log(archive.pointer() + ' total bytes');
		    console.log('archiver has been finalized and the writable file descriptor has closed.');
		});

		archive.on('error', function(err){
			throw err;
		});

		archive.pipe(writable);
		archive.bulk([
		    { expand: true, cwd: sourceFolder, src: ['**'], dest: blobName }
		]);
		archive.finalize();

		var result = {
			backupFilePath: backupFilePath
		};

		callback(null, result);
	}
}