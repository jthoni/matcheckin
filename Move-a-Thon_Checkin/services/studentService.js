﻿matApp.service('studentService', ['$http', '$q', '$window', 'configs', function ($http, $q, $window, configs) {

    this.getStudentList = function studentService$getStudentList() {

        var deferredStudents = $q.defer();

        // pull the list of students from the view
        $http.get(configs.WEB_API_URL + '/api/Student/GetAllStudents')
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredStudents.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredStudents.reject(data);
            });

        return deferredStudents.promise;
    };

    this.getByTeacherID = function studentService$getByTeacherID(teacherID, AM) {
        var deferredByTeacherID = $q.defer();

        // pull the list of students from the view
        $http.get(configs.WEB_API_URL + '/api/Student/GetByTeacherID/' + teacherID + '/' + AM)
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredByTeacherID.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredByTeacherID.reject(data);
            });

        return deferredByTeacherID.promise;

    };

    this.getStudentByID = function studentService$getStudentByID(studentID) {

        var deferredStudent = $q.defer();

        // pull the list of students from the view
        $http.get(configs.WEB_API_URL + 'api/Student/GetStudentByID/' + studentID)
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredStudent.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredStudent.reject(data);
            });

        return deferredStudent.promise;
    };

    this.getStudentByLangGrade = function studentService$getStudentByLangGrade(lang, grade) {

        var deferredLangGrade = $q.defer();

        // pull the list of students from the view
        $http.get(configs.WEB_API_URL + 'api/Student/GetStudentsByLangGrade/' + lang + '/' + grade)
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredLangGrade.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredLangGrade.reject(data);
            });

        return deferredLangGrade.promise;
    };

    this.getStudentCIStatus = function studentService$getStudentCIStatus(studentID) {
        var deferredCI = $q.defer();

        // pull the list of students from the view
        $http.get(configs.WEB_API_URL + 'api/Student/GetStudentCheckInInfo/' + studentID)
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredCI.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredCI.reject(data);
            });

        return deferredCI.promise;
    };
}]);