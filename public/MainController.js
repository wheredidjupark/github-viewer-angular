(function() {
    var app = angular.module("githubViewer");

    var MainController = function($scope, $interval, $location, $anchorScroll, github) {

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
            //github.getUser(username).then(onUser, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
            }

        };


        $scope.count = 5;
        $scope.username = "";
        $scope.repoSortOrder="-stargazers_count";
        countdown();
    };



    app.controller("MainController", ["$scope", "$interval", "$location", "$anchorScroll", "github", MainController]);




})();
