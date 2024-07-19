var app = angular.module('personApp', []);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);


app.controller('PersonController', ['$scope', '$http', function ($scope, $http) {
    $scope.persons = [];
    $scope.person = {};

    // Fetch all persons
    $scope.getAllPersons = function () {
        $http.get('http://scm-api-schoolproject.silvaconsulting.io/subscontactmanagerAPI/getallpersons')
            .then(function (response) {
                $scope.persons = response.data;
            }, function (error) {
                console.error('Error fetching persons:', error);
            });
    };

    // Save person (create or update)
    $scope.savePerson = function () {
        if ($scope.person.id) {
            // Update person
            $http.post('http://scm-api-schoolproject.silvaconsulting.io/subscontactmanagerAPI/editperson?id=' + $scope.person.id + '&firstname=' + $scope.person.firstName + '&lastname=' + $scope.person.lastName + '&email=' + $scope.person.email + '&phone=' + $scope.person.phone)
                .then(function (response) {
                    $scope.getAllPersons();
                    $scope.resetForm();
                }, function (error) {
                    console.error('Error updating person:', error);
                });
        } else {
            // Create person
            $http.post('http://scm-api-schoolproject.silvaconsulting.io/subscontactmanagerAPI/saveperson?firstname=' + $scope.person.firstName + '&lastname=' + $scope.person.lastName + '&email=' + $scope.person.email + '&phone=' + $scope.person.phone)
                .then(function (response) {
                    $scope.getAllPersons();
                    $scope.resetForm();
                }, function (error) {
                    console.error('Error creating person:', error);
                });
        }
    };

    // Edit person
    $scope.updatePerson = function (person) {
        $scope.person = angular.copy(person);
    };

    // Delete person
    $scope.deletePerson = function (id) {
        $http.post('http://scm-api-schoolproject.silvaconsulting.io/subscontactmanagerAPI/deleteperson?id=' + id)
            .then(function (response) {
                $scope.getAllPersons();
            }, function (error) {
                console.error('Error deleting person:', error);
            });
    };

    // Reset form
    $scope.resetForm = function () {
       // $scope.resetForm();
        $scope.person = {};
    };

    // Initialize by fetching all persons
    $scope.getAllPersons();
}]);
