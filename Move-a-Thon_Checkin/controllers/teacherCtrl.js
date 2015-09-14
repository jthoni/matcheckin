matApp.controller('teacherCtrl', ['$scope', '$window', 'teacherService', function ($scope, $window, teacherService) {
    // Variables
    $scope.teachersAM;
    $scope.teachersPM;

    // Functions 
    $scope.loadTeachersAM = function teacherCtrl$loadTeachersAM() {
        teacherService.getTeachersAM().then(
            function (results) {
                $scope.teachersAM = results;
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Students!")
            }
        );
    };

    $scope.loadTeachersPM = function teacherCtrl$loadTeachersPM() {
        teacherService.getTeachersPM().then(
            function (results) {
                $scope.teachersPM = results;
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Students!")
            }
        );
    };

    // Initialization
    $scope.loadTeachersAM();
    $scope.loadTeachersPM();
}]);
