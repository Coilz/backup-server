var storageClient = require('../services/azure/storageAccountClient');

var list = function(req, res, next) {
};

var get = function(req, res, next) {
};

var create = function(req, res, next) {
	var zip = require('adm-zip');
	var moment = require('moment');
	
	var sourceFolder = '/Users/erwinkonink/test/'; // Retrieve the value from a parameter
	var blobName = moment().format('YYYYMMDD-HHmmss') + '.zip';
	var backupFolder = './temp';

	var backupFilePath = backupFolder + '/' + blobName;
	var zipper = new zip();
	zipper.addLocalFolder(sourceFolder, backupFilePath);
	zipper.writeZip(backupFilePath);

	var client = new storageClient('coilzminecraft', 'Ewdy9iuztH48l5KBDyY6EygWd4hXMRtqomQO6bwgl36H5AKZ1/FmGj3CYmYU5STxSQrohzVwa1U1nrrhHKIHaA==');
	client.addBlob('coilz-mc-ubuntu', blobName, backupFolder, function(error, result, response) {
		if (error){
			res.send(error);
		}
	});

	res.send(sourceFolder + ' saved to ' + blobName);
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