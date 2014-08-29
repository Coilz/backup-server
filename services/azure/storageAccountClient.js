var azureStorage = require('azure-storage');

module.exports = function(accountName, accountKey) {

	var blobService = azureStorage.createBlobService(accountName, accountKey);

	return {

		listBlobs: function(containerName, callback) {
			blobService.listBlobsSegmented(containerName, null, function (error, result, response) {
				callback(error, result);
			});
		},

		getBlobToFile: function(containerName, blobName, destinationFolder, callback) {
			blobService.getBlobToLocalFile(containerName, blobName, destinationFolder + '/' + blobName, function (error, result, response) {
				callback(error, result, response);
			});
		},

		getBlobToStream: function(containerName, blobName, callback) {
			return blobService.createReadStream(containerName, blobName, function (error, result, response) {
				callback(error, result, response);
			});
		},

		addBlobFromLocalFile: function(containerName, blobName, filePath, callback) {
			function createBlobCallbackHandler(error, result, response) {
				result.filePath = filePath;
				callback(error, result, response);
			};

			function createContainerIfNotExistsCallbackHandler(error, result, response) {
				if (error) {
					callback(error);
					return;
				}

				blobService.createBlockBlobFromLocalFile(containerName, blobName, filePath, createBlobCallbackHandler);
			};

			blobService.createContainerIfNotExists(containerName, createContainerIfNotExistsCallbackHandler);
		},

		deleteBlob: function() {
		}
	};
}