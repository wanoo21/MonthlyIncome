/* global $ */
/* global angular */
var app = angular.module('MyApp', ['ngResource']);


Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}


app.controller('MyCtrl', function($scope, $resource){
	var self = this,
		// Resource for REST 
		incomes = $resource('/dashboard/incomes/:id', { id: '@_id' }),
		expeditures = $resource('/dashboard/expeditures/:id', { id: '@_id' });
		
	// Default variables
	self.incomes = incomes.query();
	self.expeditures = expeditures.query();
	self.income = [];
	self.expediture = [];
	
	// Get status
	self.getStatus = function(){
		self.rank = 100 - ( 100 * self.expeditures.sum('amount') / self.incomes.sum('amount') )
		if(self.rank >= 0 && self.rank < 25) {
			return "Very bad, your rank is very low, try to find work."
		} else if(self.rank < 50) {
			return "Bad, your rank is low."
		} else if(self.rank < 70) {
			return "Good, your rank is greather than 50."
		} else if(self.rank >= 90) {
			return "Super, you are a businessman."
		}
	}
	
	// Remove income or expeditures 
	self.remove = function(model, index) {
		self.selected.$remove(function(){
			self[model].splice(index, 1);
		})
	}
	
	// Add income or expediture
	self.add = function(model) {
		return new (model == 'income' ? incomes : expeditures)({
			description: self[model].addText,
			amount: self[model].addAmount
		}).$save(function(data){
			self[model == 'income' ? 'incomes' : 'expeditures'].push(data);
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