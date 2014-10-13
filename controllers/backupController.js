var storageClient = require('../services/azure/storageAccountClient');
var folderZip = require('../services/folderZip');
var fs = require('fs');
var path = require('path');

var config = require('app-config');
var storageConfig = config.azure.storageAccount;
var sourceConfig = config.dataSource;

var removeFile = function(filePath) {
	fs.unlink(filePath, function(error) {
		if (error) {
			console.log('Unlink error: ' + error);
		}
	});
};

var list = function(req, res, next) {
};

var get = function(req, res, next) {
};

var create = function(req, res, next) {
	var moment = require('moment');
	var blobName = moment().format('YYYYMMDD-HHmmss');

	function addBlobCallbackHandler(error, addBlobResult, response) {
		if (error){
			throw error;
		}

		removeFile(addBlobResult.filePath);
		res.send(addBlobResult);
	};

	function zipFolderCallbackHandler(error, zipResult) {
		if (error) {
			throw error;
		}

		var client = new storageClient(storageConfig.name, storageConfig.key);
		client.addBlobFromLocalFile(storageConfig.container, blobName + '.zip', zipResult.backupFilePath, addBlobCallbackHandler);
	};

	folderZip.zipToFile(sourceConfig.folder, './temp', blobName, zipFolderCallbackHandler);
};

var get = function(req, res, next) {
};

var remove = function(req, res, next) {
};

module.exports = {
	list : create,
	get : get,
	create : create,
	delete : remove
};