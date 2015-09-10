(function() {


    var MainController = function($scope, $http, $log, $interval, $location, $anchorScroll) {

        var onUser = function(response) {
            $scope.user = response.data;
            $http.get("https://api.github.com/users/" + $scope.username + "/repos").then(onRepos);
        };

        var onRepos = function(response) {
            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorScroll();
        };
        var onError = function(response) {
            $scope.error = response;
        };

        var decrementCount = function() {
            $scope.count--;
            if ($scope.count < 1) {
                $scope.searchUser($scope.username);
            }
        };


        var countdownInterval = null; //it will store the return promise of the $interval
        var countdown = function() {
            countdownInterval = $interval(decrementCount, 1000, $scope.count); //run until the promise is resolved. The promise is resolve when the countdown reaches 
        };

        $scope.searchUser = function(username) {
            $log.log(username);
            $http.get("https://api.github.com/users/" + username).then(onUser, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
            }

        };


        $scope.count = 5;
        $scope.username = "";
        countdown();
    };


    angular.module("githubViewer", [])
        .controller("MainController", ["$scope", "$http", "$log", "$interval","$location","$anchorScroll", MainController]);




})();
