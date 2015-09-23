//gradeLangCtrl
matApp.controller('gradeLangCtrl', ['$scope', '$window', '$routeParams', 'studentService', function ($scope, $window, $routeParams, studentService) {
    // Variables

    $scope.studentsByLangGrade;

    $scope.languages = ['Japanese', 'Spanish'];

    //$scope.grades = ['Kindergarden', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
    $scope.grades = [];
    $scope.grades.push({
        long: 'Kindergarden',
        short: 'K'
    });
    $scope.grades.push({
        long: 'First',
        short: '1'
    });
    $scope.grades.push({
        long: 'Second',
        short: '2'
    });
    $scope.grades.push({
        long: 'Third',
        short: '3'
    });
    $scope.grades.push({
        long: 'Fourth',
        short: '4'
    });
    $scope.grades.push({
        long: 'Fifth',
        short: '5'
    });

    $scope.setStudentsByLangGrade = function gradeLangCtrl$setStudentsByLangGrade() {
        studentService.getStudentByLangGrade($routeParams.lang, $routeParams.grade).then(
            function (results) {
                $scope.studentsByLangGrade = results;
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Students by Lang/Grade!")
            }
        );
    };

    if ($routeParams.grade != undefined && $routeParams.lang != undefined) {
        $scope.setStudentsByLangGrade();
        console.log('do it');
    };

    // Initialization

}]);


