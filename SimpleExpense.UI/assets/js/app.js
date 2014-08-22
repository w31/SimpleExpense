var app = angular.module('expenseApp', ['ngRoute']);

app.value('expenseUrl', 'http://localhost:11171/api');

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/expenses', {
            controller: 'ExpenseController',
            templateUrl: 'ExpenseList.html'
        })
        .when('/expenses/new', {
            controller: 'CreateExpenseController',
            templateUrl: 'ExpenseDetail.html'
        })
        .when('/categories', {
            controller: 'CategoryController',
            templateUrl: 'CategoryList.html'
        })
        .when('/categories/new', {
            controller: 'CreateCategoryController',
            templateUrl: 'CategoryDetail.html'
        })
        .otherwise({
            redirectTo: '/expenses'
        })
}]);

app.controller('NavController', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (loc) {
        return $location.path().indexOf(loc) === 0;
    };
}]);

app.controller('ExpenseController', ['$scope', 'expenseService', function ($scope, expenseService) {
    expenseService.getExpenses().success(function (data) {
        $scope.expenses = data;
    });
}]);

app.controller('CreateExpenseController', ['$scope', '$location', 'expenseService', function ($scope, $location, expenseService) {
    //TODO: cache categories
    expenseService.getCategories().success(function (data) {
        $scope.categories = data;
    });

    $scope.add = function () {
        expenseService.addExpense($scope.expenseItem)
            .success(function () {
                $location.path('/expenses');
            });
    };
}]);

app.controller('CategoryController', ['$scope', 'expenseService', function ($scope, expenseService) {
    expenseService.getCategories().success(function (data) {
        $scope.categories = data;
    });
}]);

app.controller('CreateCategoryController', ['$scope', '$location', 'expenseService', function ($scope, $location, expenseService) {
    $scope.add = function () {
        expenseService.addCategory($scope.category)
            .success(function () {
                $location.path('/categories');
            });
    };
}]);

app.service('expenseService', ['$http', 'expenseUrl', function ($http, expenseUrl) {
    this.getCategories = function () {
        return $http.get(expenseUrl + '/category');
    };

    this.addCategory = function (data) {
        return $http.post(expenseUrl + '/category', data);
    }

    this.getExpenses = function () {
        return $http.get(expenseUrl + '/expense');
    };

    this.addExpense = function (data) {
        return $http.post(expenseUrl + '/expense', data);
    };
}]);
