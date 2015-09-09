(function() {


    var MainController = function($scope, $http) {
        var onUser = function(response) {
            $scope.user = response.data;
            console.log(response);
        };

        var onError = function(error){
            $scope.error = error;
            console.log($scope.error);
        };
        $http.get("https://api.github.com/users/wheredidjupark").then(onUser, onError);
    };


    angular.module("githubViewer", [])
        .controller("MainController", ["$scope", "$http", MainController]);




})();
