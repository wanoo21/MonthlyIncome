/* global $ */
/* global angular */
var app = angular.module('MyApp', ['ngResource']);

app.controller('MyCtrl', function($scope, $resource){
	var self = this,
		incomes = $resource('/dashboard/incomes/:id', { id: '@_id' }),
		expeditures = $resource('/dashboard/expeditures/:id', { id: '@_id' });
		
	self.incomes = incomes.query();
	self.expeditures = expeditures.query();
	self.income = [];
	self.expediture = [];
	
	self.remove = function(model, index) {
		self.selected.$remove(function(){
			self[model].splice(index, 1);
		})
	}
	
	self.add = function(model) {
		console.dir(self[model])
		return new (model == 'income' ? incomes : expeditures)({
			description: self[model].addText,
			amount: self[model].addAmount
		}).$save(function(data){
			self[model == 'income' ? 'incomes' : 'expeditures'].push(data)
			delete self[model].addAmount;
			delete self[model].addText;
			delete self[model].showAmount;
		})
	}
})

app.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);