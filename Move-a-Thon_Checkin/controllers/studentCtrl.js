matApp.controller('studentCtrl', ['$scope', '$rootScope', '$window', 'studentService', function ($scope, $rootScope, $window, studentService) {
    // Variables
    $scope.students;
    $scope.student;
    $scope.scopeTest = "This is the message from scopeTest";
    $rootScope.rootTest = "This is on the root";
    $scope.operationRunning = true;

    // Needed for the loading screen
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });

    // Functions   
    $scope.loadStudents = function studentCtrl$loadStudents() {
        // Get the flat list of Students
        studentService.getStudentList().then(
            function (results) {
                $scope.students = results;
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Students!")
            }
        );
    };

    $scope.setStudent = function studentCtrl$setStudent(studentID) {
        studentService.getStudentByID(studentID).then(
            function (results) {
                $scope.student = results[0];
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Student!")
            }
        )
    };

    $scope.setTestValue = function (value) {
        $scope.scopeTest = value;
        $rootScope.rootTest = value;
    };

    $scope.getTestValue = function () {
        return $scope.scopeTest;
    };

    // Initialization
    $scope.loadStudents();
}]);
