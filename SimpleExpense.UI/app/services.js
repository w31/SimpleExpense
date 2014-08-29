angular.module('expenseApp').factory('Category', ['$resource', 'expenseUrl', function ($resource, expenseUrl) {
    return $resource(expenseUrl + '/category/:id',
        null,
        {
            'update': { method: 'PUT' }
        });
}]);

angular.module('expenseApp').factory('Expense', ['$resource', 'expenseUrl', function ($resource, expenseUrl) {
    return $resource(expenseUrl + '/expense/:id',
        null,
        {
            'update': { method: 'PUT' }
        });
}]);
