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
        $scope.studentsByLangGrade = StudentController.GetStudentsByLangGrade($routeParams.id)
    };

    // Initialization

}]);


