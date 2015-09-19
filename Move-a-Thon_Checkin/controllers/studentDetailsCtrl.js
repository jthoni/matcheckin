matApp.controller('detailsCtrl', ['$scope', '$window', '$routeParams', 'studentService', function ($scope, $window, $routeParams, studentService) {
    // Variables
    $scope.selectedStudent;
    $scope.checkedIn = false;
    $scope.checkInDetails;

    // Functions 
    $scope.setSelectedStudent = function detailsCtrl$setSelectedStudent() {
        studentService.getStudentByID($routeParams.id).then(
            function (results) {
                $scope.selectedStudent = results[0];
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Student!")
            }
        );
    };

    $scope.setCheckedInDetails = function detailsCtrl$setCheckedInDetails() {
        $scope.checkInDetails = studentService.getStudentCIStatus($routeParams.id).then(
            function (results) {
                if (typeof results[0] != "undefined") {
                    $scope.checkInDetails = results[0];
                    $scope.checkedIn = true;
                }
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Student!");
            }
        );
    }

    // Initialization
    $scope.setSelectedStudent();
    $scope.setCheckedInDetails();
}]);
