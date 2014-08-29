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
			var createBlobCallbackHandler = function (error, result, response) {
				result.filePath = filePath;
				callback(error, result, response);
			};

			var createContainerIfNotExistsCallbackHandler = function (error, result, response) {
				if (response.isSuccessful) {
					blobService.createBlockBlobFromLocalFile(containerName, blobName, filePath, createBlobCallbackHandler);
					return;
				}

				callback(error, result, response);
			};

			blobService.createContainerIfNotExists(containerName, createContainerIfNotExistsCallbackHandler);
		},

		addBlobFromStream: function(containerName, blobName, stream, callback) {
			var createBlobCallbackHandler = function (error, result, response) {
				callback(error, result, response);
			};

			var createContainerIfNotExistsCallbackHandler = function (error, result, response) {
				if (response.isSuccessful) {
					blobService.createBlockBlobFromStream(containerName, blobName, stream, stream.size(), createBlobCallbackHandler);
					return;
				}

				callback(error, result, response);
			};

			blobService.createContainerIfNotExists(containerName, createContainerIfNotExistsCallbackHandler);
		},

		deleteBlob: function() {
		}
	};
}