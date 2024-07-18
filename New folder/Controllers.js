app.controller('HelloWorldController', function($scope, $http) {
    $scope.persons = [];

    $scope.fetchPersons = function() {
        var url = 'http://localhost:5065/helloworld/getallpersons';
        $http.get(url).then(function(response) {
            $scope.persons = response.data;
        }, function(error) {
            console.error(error);
        });
    };
});