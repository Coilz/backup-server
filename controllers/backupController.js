var storageClient = require('../services/azure/storageAccountClient');
var folderZip = require('../services/folderZip');

var config = require('app-config');
var storageConfig = config.azure.storageAccount;
var sourceConfig = config.dataSource;

var list = function(req, res, next) {
};

var get = function(req, res, next) {
};

var create = function(req, res, next) {
	var moment = require('moment');
	var blobName = moment().format('YYYYMMDD-HHmmss');

	var addBlobCallbackHandler = function(error, addBlobResult, response) {
		if (error){
			res.send(error);
			return;
		}

		// TODO: remove the zip-file or create backup in memory
		res.send(addBlobResult);
	};

	var zipFolderCallbackHandler = function(error, zipResult) {
		if (error) {
			res.send(error);
			return;
		}

		var client = new storageClient(storageConfig.name, storageConfig.key);
		client.addBlob(storageConfig.container, blobName, zipResult.backupFilePath, addBlobCallbackHandler);
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