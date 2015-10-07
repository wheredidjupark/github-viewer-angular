(function() {


    var UserController = function($scope, $interval, $location, $anchorScroll, github) {

        var onUser = function(data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos);
        };

        var onRepos = function(data) {
            $scope.repos = data;
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
            github.getUser(username).then(onUser, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
            }

        };


        $scope.count = 5;
        $scope.username = "";
        countdown();
    };


    angular.module("githubViewer")
        .controller("UserController", ["$scope", "$interval", "$location", "$anchorScroll", "github", UserController]);




})();
