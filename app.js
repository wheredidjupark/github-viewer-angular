(function() {


    var MainController = function($scope, $http, $log) {
        var onUser = function(response) {
            $scope.user = response.data;
            //console.log(response);
        };

        var onError = function(response){
            $scope.error = response;
            //console.log($scope.error.data.message);
        };

        $scope.searchUser = function(username){
            $log.log(username);
            $http.get("https://api.github.com/users/"+username).then(onUser, onError);
        };
    };


    angular.module("githubViewer", [])
        .controller("MainController", ["$scope", "$http", "$log", MainController]);




})();
