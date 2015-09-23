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



    $scope.checkInStudent = function studentCtrl$checkInStudent(shirtSize, Notes) {
        studentService.checkInStudent($scope.selectedStudent.StudentID, shirtSize, Notes).then(
            function (results) {
                // Success
                $scope.checkedIn = true;
                //$scope.student = results[0];
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Student!")
            }
        )
    };

    $scope.undoCheckin = function studentCtrl$undoCheckin() {
        studentService.undoCheckIn($scope.selectedStudent.StudentID).then(
            function (results) {
                // Success
                $scope.checkedIn = false;
                //$scope.student = results[0];
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Student!")
            }
        )
    };

    $scope.checkInForm = {};
    $scope.checkInForm.studentShirtSize;
    $scope.checkInForm.notes;


     $scope.shirtSizes = [
    { sizeShort: 'YM', sizeLong: 'Youth Medium' },
    { sizeShort: 'YL', sizeLong: 'Youth Large' },
    { sizeShort: 'M', sizeLong: 'Adult Medium' },
    { sizeShort: 'L', sizeLong: 'Adult Large' },
    { sizeShort: 'XL', sizeLong: 'Adult XL' }];


    // Initialization
    $scope.setSelectedStudent();
    $scope.setCheckedInDetails();
}]);
