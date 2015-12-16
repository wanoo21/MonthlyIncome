var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Schema = new Schema({
    userID: String,
	description: String,
	amount: Number
});

exports.Incomes = mongoose.model('Income', Schema);
exports.Expediture = mongoose.model('Expediture', Schema);