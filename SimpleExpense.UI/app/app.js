﻿angular.module('expenseApp', ['ngRoute']);

angular.module('expenseApp').constant('expenseUrl', 'http://localhost:11171/api');

angular.module('expenseApp').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/expenses', {
            controller: 'ExpenseController',
            templateUrl: 'app/views/ExpenseList.html'
        })
        .when('/expenses/new', {
            controller: 'CreateExpenseController',
            templateUrl: 'app/views/ExpenseDetail.html'
        })
        .when('/categories', {
            controller: 'CategoryController',
            templateUrl: 'app/views/CategoryList.html'
        })
        .when('/categories/new', {
            controller: 'CreateCategoryController',
            templateUrl: 'app/views/CategoryDetail.html'
        })
        .otherwise({
            redirectTo: '/expenses'
        })
}]);