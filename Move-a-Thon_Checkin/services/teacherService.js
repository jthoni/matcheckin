matApp.service('teacherService', ['$http', '$q', '$window', 'configs', function ($http, $q, $window, configs) {

    this.getTeachers = function teacherService$getTeachers() {

        var deferredTeachers = $q.defer();

        // pull the list of teachers from the view
        $http.get(configs.WEB_API_URL + '/api/Student/GetTeachers')
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredTeachers.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredTeachers.reject(data);
            });

        return deferredTeachers.promise;
    };

    this.getTeachersAM = function teacherService$getTeachersAM() {

        var deferredTeachersAM = $q.defer();

        // pull the list of teachers from the view
        $http.get(configs.WEB_API_URL + '/api/Student/GetTeachersAM')
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredTeachersAM.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredTeachersAM.reject(data);
            });

        return deferredTeachersAM.promise;
    };

    this.getTeachersPM = function teacherService$getTeachersPM() {

        var deferredTeachersPM = $q.defer();

        // pull the list of teachers from the view
        $http.get(configs.WEB_API_URL + '/api/Student/GetTeachersPM')
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredTeachersPM.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredTeachersPM.reject(data);
            });

        return deferredTeachersPM.promise;
    };
}]);