var storageClient = require('../services/azure/storageAccountClient');

var config = require('app-config');
var storageConfig = config.azure.storageAccount;
var sourceConfig = config.dataSource;

var list = function(req, res, next) {
};

var get = function(req, res, next) {
};

var create = function(req, res, next) {
	var zip = require('adm-zip');
	var moment = require('moment');
	
	var blobName = moment().format('YYYYMMDD-HHmmss') + '.zip';
	var tmpFolder = './temp';

	var backupFilePath = tmpFolder + '/' + blobName;
	var zipper = new zip();
	zipper.addLocalFolder(sourceConfig.folder, backupFilePath);
	zipper.writeZip(backupFilePath);

	var client = new storageClient(storageConfig.name, storageConfig.key);
	client.addBlob(storageConfig.container, blobName, tmpFolder, function(error, result, response) {
		if (error){
			res.send(error);
		} else {
			res.send(sourceConfig.folder + ' saved to ' + blobName);
		}
	});
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