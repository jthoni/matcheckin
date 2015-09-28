matApp = angular.module('matApp', ['ngRoute', 'mobile-angular-ui'], ['$routeProvider', function ($routeProvider) {
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    
    $routeProvider
     .when('/', { templateUrl: 'homeView.html' })
     .when('/home', { templateUrl: 'homeView.html' })
     .when('/bystudentname', { templateUrl: 'homeView.html' })
     .when('/byteacherAM', { templateUrl: 'homeView.html' })
     .when('/byteacherPM', { templateUrl: 'homeView.html' })
     .when('/studentDetails/:id', { templateUrl: 'homeView.html' })
     .when('/studentsbyAM/:id', { templateUrl: 'homeView.html' })
     .when('/studentsbyPM/:id', { templateUrl: 'homeView.html' })
     .when('/byGrade', { templateUrl: 'homeView.html' })
     .when('/byLanguage/:id', { templateUrl: 'homeView.html' })
     .when('/byLangGrade/:grade/:lang', { templateUrl: 'homeView.html' })
     .when('/shirts', { templateUrl: 'homeView.html' })
     .otherwise({ redirectTo: '/home' });
    //$routeProvider
    // .when('/', { templateUrl: 'homeView.html' })
    // .when('/home', { templateUrl: 'homeView.html' })
    // .when('/bystudentname', { templateUrl: 'bystudentname.html' })
    // .when('/byteacherAM', { templateUrl: 'byteacherAM.html' })
    // .when('/byteacherPM', { templateUrl: 'byteacherPM.html' })
    // .when('/studentDetails/:id', { templateUrl: 'studentDetails.html' })
    // .when('/studentsbyAM/:id', { templateUrl: 'studentsbyAM.html' })
    // .when('/studentsbyPM/:id', { templateUrl: 'studentsbyPM.html' })
    // .when('/byGrade', { templateUrl: 'byGrade.html' })
    // .when('/byLanguage/:id', { templateUrl: 'byLanguage.html' })
    // .when('/byLangGrade/:grade/:lang', { templateUrl: 'byLangGrade.html' })
    // .when('/shirts', { templateUrl: 'shirts.html' })
    // .otherwise({ redirectTo: '/home' });
}])
.constant('configs', {
    //WEB_API_URL: 'http://localhost:53634/'
    WEB_API_URL: 'https://jsismatci.azurewebsites.net/'
});

