// Filter to display a value as a percentage
matApp.filter('percent', function () {
    return function (input) {
        return (parseFloat(input) * 100).toFixed(1) + "%";
    };
});