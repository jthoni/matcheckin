matApp.service('shirtsService', ['$http', '$q', '$window', 'configs', function ($http, $q, $window, configs) {

    this.getShirts = function shirtsService$getShirts() {
        var deferredShirts = $q.defer();

        // pull the list of teachers from the view
        $http.get(configs.WEB_API_URL + '/api/Student/GetShirtsInfo')
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredShirts.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredShirts.reject(data);
            });

        return deferredShirts.promise;
    };

    this.shirtDistribution = function shirtsService$shirtDistribution(purpose, youthMedium, youthLarge, medium, large, xl ) {
        var deferredDistribution = $q.defer();

        // pull the list of teachers from the view
        $http.post(configs.WEB_API_URL + '/api/Student/ShirtDistribution/' + purpose + '/' + '/' + youthMedium + '/' + youthLarge + '/' + medium + '/' + large + '/' + xl)
            .success(function (data) {
                // With the data succesfully returned, we can resolve promise and we can access it in controller
                deferredDistribution.resolve(data);
            })
            .error(function (data) {
                //let the function caller know the error
                deferredDistribution.reject(data);
            });

        return deferredDistribution.promise;
    };

}]);