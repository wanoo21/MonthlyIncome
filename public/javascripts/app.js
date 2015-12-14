/* global angular */
var app = angular.module('MyApp', ['ngResource']);

app.controller('MyCtrl', function($scope, $resource){
	var self = this;
	
	self.incomeAmount = null;
	
})

app.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);