var app = angular.module('expenseApp', []);

app.value('expenseUrl', 'http://localhost:11171/api');

app.controller('AppController', ['expenseService', function (expenseService) {
    var thisApp = this;

    thisApp.categories = [];
    thisApp.expenses = [];

    expenseService.getCategories().success(function (data) {
        thisApp.categories = data;
    });

    expenseService.getExpenses().success(function (data) {
        thisApp.expenses = data;
    });
}]);

app.controller('NavController', function () {
    this.tab = 1;

    this.setTab = function (tab) {
        this.tab = tab;
    }

    this.isSet = function (tab) {
        return this.tab === tab;
    };
});

app.controller('CategoryController', ['expenseService', function (expenseService) {
    this.category = {};

    this.addCategory = function () {
        expenseService.addCategory(this.category);
        this.category = {};
    };
}]);

app.controller('ExpenseItemController', ['expenseService', function (expenseService) {
    this.expenseItem = {};

    this.addExpense = function () {
        expenseService.addExpense(this.expenseItem);
        this.expenseItem = {};
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
