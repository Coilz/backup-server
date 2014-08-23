var storageClient = require('../services/azure/storageAccountClient');

var config = require('app-config');
var storageConfig = config.azure.storageAccount;
var sourceConfig = config.dataSource;

function zipFolder(sourceFolder, destinationFolder, callback) {
	var zip = require('adm-zip');
	var moment = require('moment');
	
	var blobName = moment().format('YYYYMMDD-HHmmss') + '.zip';
	var backupFilePath = destinationFolder + '/' + blobName;

	try {
		var zipper = new zip();
		zipper.addLocalFolder(sourceFolder, destinationFolder);
		zipper.writeZip(backupFilePath);
	} catch (ex) {
		callback(ex);
		return;
	}

	var result = {
		blobName: blobName,
		backupFilePath: backupFilePath,
		destinationFolder: destinationFolder
	};

	callback(null, result);
};

var list = function(req, res, next) {
};

var get = function(req, res, next) {
};

var create = function(req, res, next) {
	var moment = require('moment');

	var addBlobCallbackHandler = function(error, addBlobResult, response) {
		if (error){
			res.send(error);
			return;
		}

		res.send(addBlobResult);
	};

	var zipFolderCallbackHandler = function(error, zipResult) {
		if (error) {
			res.send(error);
			return;
		}

		var client = new storageClient(storageConfig.name, storageConfig.key);

		client.addBlob(storageConfig.container, zipResult.blobName, zipResult.destinationFolder, addBlobCallbackHandler);
	};

	zipFolder(sourceConfig.folder, './temp', zipFolderCallbackHandler);
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