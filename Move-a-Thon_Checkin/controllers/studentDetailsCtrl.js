matApp.controller('detailsCtrl', ['$scope', '$window', '$routeParams', 'studentService', function ($scope, $window, $routeParams, studentService) {
    // Variables
    $scope.selectedStudent;

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

    // Initialization
    $scope.setSelectedStudent();
}]);
