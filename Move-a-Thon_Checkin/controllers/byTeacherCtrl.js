matApp.controller('byTeacherAMCtrl', ['$scope', '$window', '$routeParams', 'studentService', function ($scope, $window, $routeParams, studentService) {
    // Variables
    $scope.studentsByTeacherAM;

    // Functions 
    $scope.setStudentsByTeacherAM = function byTeacherAMCtrl$studentsByTeacherAM() {
        studentService.getByTeacherID($routeParams.id, true).then(
            function (results) {
                $scope.studentsByTeacherAM = results;
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Student!")
            }
        );
    };

    // Initialization
    $scope.setStudentsByTeacherAM();
}]);

matApp.controller('byTeacherPMCtrl', ['$scope', '$window', '$routeParams', 'studentService', function ($scope, $window, $routeParams, studentService) {
    // Variables
    $scope.studentsByTeacherPM;

    // Functions 
    $scope.setStudentsByTeacherPM = function byTeacherPMCtrl$studentsByTeacherPM() {
        studentService.getByTeacherID($routeParams.id, false).then(
            function (results) {
                $scope.studentsByTeacherPM = results;
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Student!")
            }
        );
    };

    // Initialization
    $scope.setStudentsByTeacherPM();
}]);
