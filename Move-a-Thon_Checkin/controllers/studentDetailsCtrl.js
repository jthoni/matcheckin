matApp.controller('detailsCtrl', ['$scope', '$window', '$routeParams', 'studentService', 'shirtsService', function ($scope, $window, $routeParams, studentService, shirtsService) {
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
        if (shirtSize == undefined) {
            $window.alert('Please specify the shirt size');
        }
        else {
            studentService.checkInStudent($scope.selectedStudent.StudentID, shirtSize, Notes).then(
                function (results) {
                    // Success
                    $scope.checkedIn = true;
                    switch (shirtSize) {
                        case 'YM':
                            $scope.recordStudentShirt(1, 0, 0, 0, 0);
                            console.log('Checking in with YM');
                            break;
                        case 'YL':
                            $scope.recordStudentShirt(0, 1, 0, 0, 0);
                            console.log('Checking in with YL');
                            break;
                        case 'M':
                            $scope.recordStudentShirt(0, 0, 1, 0, 0);
                            console.log('Checking in with M');
                            break;
                        case 'L':
                            $scope.recordStudentShirt(0, 0, 0, 1, 0);
                            console.log('Checking in with L');
                            break;
                        case 'XL':
                            $scope.recordStudentShirt(0, 0, 0, 0, 1);
                            console.log('Checking in with XL');
                            break;
                    };
                    $scope.setCheckedInDetails();
                    //$scope.student = results[0];
                },
                function (results) {
                    // TODO: Probably can't use the below in mobile environment
                    $window.alert("Error getting Student!")
                }
            )
        }
    };

    $scope.undoCheckin = function studentCtrl$undoCheckin() {
        studentService.undoCheckIn($scope.selectedStudent.StudentID).then(
            function (results) {
                // Success
                $scope.checkedIn = false;
                // TODO: Need to get shirt size from the check in
                switch ($scope.checkInDetails.ShirtSize) {
                    case 'YM':
                        $scope.recordStudentShirt(-1, 0, 0, 0, 0);
                        console.log('Checking in with YM');
                        break;
                    case 'YL':
                        $scope.recordStudentShirt(0, -1, 0, 0, 0);
                        console.log('Checking in with YL');
                        break;
                    case 'M':
                        $scope.recordStudentShirt(0, 0, -1, 0, 0);
                        console.log('Checking in with M');
                        break;
                    case 'L':
                        $scope.recordStudentShirt(0, 0, 0, -1, 0);
                        console.log('Checking in with L');
                        break;
                    case 'XL':
                        $scope.recordStudentShirt(0, 0, 0, 0, -1);
                        console.log('Checking in with XL');
                        break;
                }
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting Student!")
            }
        )
    };

    $scope.recordStudentShirt = function studentCtrl$recordStudentShirt(youthMedium, youthLarge, medium, large, xl) {
        // call shirts service
        shirtsService.shirtDistribution("Students", youthMedium, youthLarge, medium, large, xl).then(
            function (results) {
                // Success
                console.log('Shirts updated');
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error updating shirt totals info!")
            }
        );
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
