Array.prototype.hasNullValues = function()	{
	var hasNullValues = false;
	this.forEach(function(element) {
		if(Array.isArray(element)) hasNullValues |= element.hasNullValues();
		else hasNullValues |= element == null; 
	}, this);
	return hasNullValues;
}

var app = angular.module('fuzzyahp', []);

app.controller('global', Controller);