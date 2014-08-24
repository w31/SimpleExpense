angular.module('expenseApp').service('expenseService', ['$http', 'expenseUrl', function ($http, expenseUrl) {
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
