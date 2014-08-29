angular.module('expenseApp').service('expenseService', ['$http', 'expenseUrl', function ($http, expenseUrl) {
    this.getCategories = function () {
        return $http.get(expenseUrl + '/category');
    };

    this.getCategoryById = function (id) {
        return $http.get(expenseUrl + '/category/' + id);
    };

    this.addCategory = function (data) {
        return $http.post(expenseUrl + '/category', data);
    }

    this.updateCategory = function (id, data) {
        return $http.put(expenseUrl + '/category/' + id, data);
    }

    this.getExpenses = function () {
        return $http.get(expenseUrl + '/expense');
    };

    this.getExpenseById = function (id) {
        return $http.get(expenseUrl + '/expense/' + id);
    };

    this.addExpense = function (data) {
        return $http.post(expenseUrl + '/expense', data);
    };

    this.updateExpense = function (id, data) {
        return $http.put(expenseUrl + '/expense/' + id, data);
    };

    this.deleteExpense = function (id) {
        return $http.delete(expenseUrl + '/expense/' + id);
    };
}]);

angular.module('expenseApp').factory('Category', ['$resource', 'expenseUrl', function ($resource, expenseUrl) {
    return $resource(expenseUrl + '/category/:id',
        null,
        {
            'update': { method: 'PUT' }
        });
}]);
