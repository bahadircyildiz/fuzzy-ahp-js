function Controller($scope, $filter){
	$scope.stepCount = 0;

	$scope.settings={
		criteriaCount: 0
	}

	$scope.createPairwiseMatrix = function(){
		$scope.pairwiseMatrix = createPairwiseMatrix($scope.settings.criteriaCount);
	}

	$scope.createStandardizedMatrix = function(){
		$scope.standardizedMatrix = createStandardizedMatrix($scope.pairwiseMatrix);
	}
	
	function createPairwiseMatrix(criteriaCount){
		var matrix = {
			labels: Array(criteriaCount).fill(null), values: Array(criteriaCount).fill([])
		}
		for (var index = 0; index < criteriaCount; index++) {
			matrix.values[index] = Array(criteriaCount).fill(null);
			matrix.values[index][index] = 1;
		}

		return matrix;
	}

	$scope.adjustValues = function(x_index, y_index){
		console.log("Val changed in ("+x_index+", "+y_index+")");
		var newNumber = 1 / $scope.pairwiseMatrix.values[x_index][y_index];
		$scope.pairwiseMatrix.values[y_index][x_index] = roundVal(newNumber);
		console.log($scope.pairwiseMatrix);
	}

	function createStandardizedMatrix(pw_matrix){
		pw_matrix = angular.copy(pw_matrix);
		if(pw_matrix.values.hasNullValues()){
			console.log("Has null Values");
		} else{
			var sums = $scope.sums = calculateSums(pw_matrix), criteriaCount = $scope.settings.criteriaCount;
			console.log(sums);
			for (var y_index = 0; y_index < criteriaCount; y_index++) {
				for (var x_index = 0; x_index < criteriaCount; x_index++) {
					pw_matrix.values[y_index][x_index] = roundVal(pw_matrix.values[y_index][x_index] / sums[x_index]); 
				}
			}
			$scope.weight = calculateWeight(pw_matrix);
			return pw_matrix;
		}
	}

	function calculateSums(pw_matrix){
		var sums = [], criteriaCount = $scope.settings.criteriaCount;
		for (var y_index = 0; y_index < criteriaCount; y_index++) {
			var sum = 0;
			for (var x_index = 0; x_index < criteriaCount; x_index++) {
				sum += pw_matrix.values[x_index][y_index]; 
			}
			sums.push(sum);
		}
		return sums;
	}

	function calculateWeight(s_matrix){
		var weight = [];
		s_matrix.values.forEach(function(row, index){
			var rowsum = 0;
			row.forEach(function(element){
				rowsum += element;
			});
			weight.push(roundVal(rowsum/row.length));
		})
		return weight;
	}

	function roundVal(val){
		return parseFloat($filter('number')(val, 6));
	}

}