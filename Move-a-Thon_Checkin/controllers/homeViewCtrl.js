matApp.controller('homeViewCtrl', ['$scope', '$rootScope', '$window', 'studentService', function ($scope, $rootScope, $window, studentService) {
    // Variables
    $scope.checkInCount;

    // Functions  
    $scope.getCheckInCount = function detailsCtrl$getCheckInCount() {
        studentService.getCheckInCount().then(
            function (results) {
                $scope.checkInCount = results[0];
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Check in count!");
            }
        );
    }

    // Initialization
    $scope.getCheckInCount();

}]);
