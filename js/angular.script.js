
(function(){
	var app = angular.module('ProjectFinder', []);

	    app.controller('firstController', ["$scope", 'get', '$log', function($scope, get, $log){
	      $scope.isOpen=false;
	      $scope.limitSet = 11;
	      $scope.languages = [];
	      $scope.lists = [];
	      $scope.searchTag = '';
	      $scope.alldata = true;
	      $scope.resultIsAvailable=false;
	      $scope.searchfilter = '';
	      $scope.autCompleteUrl =
	     "https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json";
	      get.getrepoDetails()
	      .then(function(data) {
	      	 $scope.resultIsAvailable = true;

	      	 $scope.lists.push(data);
            })
            .catch(showError);

            function showError(data){
               console.log(data);
            }

	      $scope.navFilter = function(){
            if($scope.isOpen)
            	$scope.isOpen = false;
            else
            	$scope.isOpen = true;
	      }

	      $scope.submit = function(){
	      	 get.getrepoDetails($scope.searchTag)
			     .then(function(data) {
			     	$scope.lists  = new Array();
			     	 $scope.resultIsAvailable = true;
			     	 $scope.searchfilter = $scope.searchTag;
			      	 $scope.lists.push(data);
			      	
		            })
		        .catch(showError);
	      }
         $scope.autoComplte = function(input){
       
         	get.autocompleteList($scope.autCompleteUrl)
			     .then(function(data) {	
			        var results;		     				     			     	
			      	 results = data;

			      	 $scope.languages.push(results.filter(function(data){
                       if (data.substr(0, data.length) === input) {
                       	
			                return true;
			            }
			      	 }));      	 
			      	})
		        .catch(showError);
	      }

	      $scope.ShowMore = function(){
            if($scope.limitSet <=$scope.lists[0].items.length){
            	$scope.limitSet +=5;

            }else{
            	$scope.alldata = false;
            }
	      }
 
	    }]);

	app.factory('get', ['$http', '$q', function($http, $q){
      
      return {
           getrepoDetails : getrepoDetails,
           autocompleteList : autocompleteList
      }
      function getrepoDetails(options){

      	  	var apiUrl = "https://api.github.com/search/repositories?q=stars:%3E=500";
      	  	    
	      	  	 if(options){
	                apiUrl = apiUrl + "+language:" + options;                
	             }  	  	 
               
      	  	 	return $http.get(apiUrl)
      	  	 	.then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving classrooms: ' + response.statusText);
                    return $q.reject('Error retrieving classrooms.');
                })

      	     };
      	function autocompleteList(url){
      		return $http.get(url)
      	  	 	.then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    $log.error('Error retrieving classrooms: ' + response.statusText);
                    return $q.reject('Error retrieving classrooms.');
                })
      	}  

	}]);    


}())

