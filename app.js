(function() {

    var MainController = function($scope, $http){
        $http.get("https://api.github.com/users/wheredidjupark").then(function(response){
            $scope.user = response.data;
            console.log(response);
        });
    };


    angular.module("githubViewer", [])
    .controller("MainController", ["$scope","$http",MainController]);




})();
