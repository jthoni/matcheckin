matApp.controller('shirtsCtrl', ['$scope', '$window', '$routeParams', 'shirtsService', function ($scope, $window, $routeParams, shirtsService) {
    // Variables
    $scope.shirtGivenTeacher = false;
    $scope.shirtGivenTeacherSize;

    $scope.shirtGivenDonation = false;
    $scope.shirtGivenDonationSize;

    $scope.shirtGivenVolunteer= false;
    $scope.shirtGivenVolunteerSize;
    
    $scope.shirtInfo = {};
    $scope.shirtsOrdered = {
        ShirtPurpose: 'Ordered',
        YouthMedium: 230,
        YouthLarge: 135,
        Medium: 75,
        Large: 65,
        XL: 15
    };

    $scope.shirtsRemaining = {
        ShirtPurpose: 'Remaining',
        YouthMedium: 0,
        YouthLarge: 0,
        Medium: 0,
        Large: 0,
        XL: 0
    };

    // Functions 
    $scope.getShirtsInfo = function shirtsCtrl$getShirtsInfo() {
        shirtsService.getShirts().then(
            function (results) {
                $scope.shirtInfo = results;
                $scope.calcRemainingShirts();
            },
            function (results) {
                // TODO: Probably can't use the below in mobile environment
                $window.alert("Error getting shirt info!")
            }
        );
    };

    $scope.calcRemainingShirts = function shirtsCtrl$calcRemainingShirts() {

        $scope.shirtsRemaining.YouthMedium = $scope.shirtsOrdered.YouthMedium;
        $scope.shirtsRemaining.YouthLarge = $scope.shirtsOrdered.YouthLarge;
        $scope.shirtsRemaining.Medium = $scope.shirtsOrdered.Medium;
        $scope.shirtsRemaining.Large = $scope.shirtsOrdered.Large;
        $scope.shirtsRemaining.XL = $scope.shirtsOrdered.XL;

        for (var i = 0; i < $scope.shirtInfo.length; i++) {
            $scope.shirtsRemaining.YouthMedium = $scope.shirtsRemaining.YouthMedium - $scope.shirtInfo[i].YouthMedium;
            $scope.shirtsRemaining.YouthLarge = $scope.shirtsRemaining.YouthLarge - $scope.shirtInfo[i].YouthLarge;
            $scope.shirtsRemaining.Medium = $scope.shirtsRemaining.Medium - $scope.shirtInfo[i].Medium;
            $scope.shirtsRemaining.Large = $scope.shirtsRemaining.Large - $scope.shirtInfo[i].Large;
            $scope.shirtsRemaining.XL = $scope.shirtsRemaining.XL - $scope.shirtInfo[i].XL;            
        }
    };

    $scope.distributeShirts = function shirtsCtrl$distributeShirts(purpose, youthMedium, youthLarge, medium, large, xl) {
        shirtsService.shirtDistribution(purpose, youthMedium, youthLarge, medium, large, xl).then(
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

    $scope.distribShirtStudent = function shirtsCtrl$distribShirtStudent(youthMedium, youthLarge, medium, large, xl) {
        $scope.distributeShirts("Students", youthMedium, youthLarge, medium, large, xl);
    };

    $scope.distribTeachers = function shirtsCtrl$distribTeachers(youthMedium, youthLarge, medium, large, xl) {
        $scope.distributeShirts("Teachers", youthMedium, youthLarge, medium, large, xl);
        $scope.shirtGivenTeacher = true;
        if (youthMedium != 0) {
            $scope.shirtGivenTeacherSize = "Youth Medium";
        }
        else if (youthLarge != 0) {
            $scope.shirtGivenTeacherSize = "Youth Large";
        }
        else if (medium != 0) {
            $scope.shirtGivenTeacherSize = "Adult Medium";
        }
        else if (large != 0) {
            $scope.shirtGivenTeacherSize = "Adult Large";
        }
        else if (xl != 0) {
            $scope.shirtGivenTeacherSize = "XL";
        }
        else {
            $window.alert('Invalid size in tshirt distribution!');
        }
    };

    $scope.distribVolunteers = function shirtsCtrl$distribVolunteers(youthMedium, youthLarge, medium, large, xl) {
        $scope.distributeShirts("Volunteers", youthMedium, youthLarge, medium, large, xl);
        $scope.shirtGivenVolunteer = true;
        if (youthMedium != 0) {
            $scope.shirtGivenVolunteerSize = "Youth Medium";
        }
        else if (youthLarge != 0) {
            $scope.shirtGivenVolunteerSize = "Youth Large";
        }
        else if (medium != 0) {
            $scope.shirtGivenVolunteerSize = "Adult Medium";
        }
        else if (large != 0) {
            $scope.shirtGivenVolunteerSize = "Adult Large";
        }
        else if (xl != 0) {
            $scope.shirtGivenVolunteerSize = "XL";
        }
        else {
            $window.alert('Invalid size in tshirt distribution!');
        }
    };

    $scope.distribDonations = function shirtsCtrl$distribDonations(youthMedium, youthLarge, medium, large, xl) {
        $scope.distributeShirts("Donations", youthMedium, youthLarge, medium, large, xl);
        $scope.shirtGivenDonation = true;
        if (youthMedium != 0) {
            $scope.shirtGivenDonationSize = "Youth Medium";
        }
        else if (youthLarge != 0) {
            $scope.shirtGivenDonationSize = "Youth Large";
        }
        else if (medium != 0) {
            $scope.shirtGivenDonationSize = "Adult Medium";
        }
        else if (large != 0) {
            $scope.shirtGivenDonationSize = "Adult Large";
        }
        else if (xl != 0) {
            $scope.shirtGivenDonationSize = "XL";
        }
        else {
            $window.alert('Invalid size in tshirt distribution!');
        }
    };

    // tabs


    $scope.tabs = [{
        title: 'One',
        url: 'one.tpl.html'
    }, {
        title: 'Two',
        url: 'two.tpl.html'
    }, {
        title: 'Three',
        url: 'three.tpl.html'
    }, {
        title: 'Four',
        url: 'four.tpl.html'
    }
    ];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    $scope.getShirtsInfo();
    //$scope.distributeShirts('Teachers', 1, 1, 1, 1, 1);
}]);

