angular.module('expenseApp').controller('NavController', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (loc) {
        return $location.path().indexOf(loc) === 0;
    };
}]);

angular.module('expenseApp').controller('ExpenseController', ['$scope', 'expenseService', function ($scope, expenseService) {
    expenseService.getExpenses().success(function (data) {
        $scope.expenses = data;
    });
}]);

angular.module('expenseApp').controller('CreateExpenseController', ['$scope', '$location', 'expenseService', function ($scope, $location, expenseService) {
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

angular.module('expenseApp').controller('CategoryController', ['$scope', 'expenseService', function ($scope, expenseService) {
    expenseService.getCategories().success(function (data) {
        $scope.categories = data;
    });
}]);

angular.module('expenseApp').controller('CreateCategoryController', ['$scope', '$location', 'expenseService', function ($scope, $location, expenseService) {
    $scope.add = function () {
        expenseService.addCategory($scope.category)
            .success(function () {
                $location.path('/categories');
            });
    };
}]);
