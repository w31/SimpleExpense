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

    $scope.save = function () {
        expenseService.addExpense($scope.expenseItem)
            .success(function () {
                $location.path('/expenses');
            });
    };
}]);

angular.module('expenseApp').controller('EditExpenseController', ['$scope', '$location', '$routeParams', 'expenseService', function ($scope, $location, $routeParams, expenseService) {
    //TODO: cache categories
    expenseService.getCategories().success(function (data) {
        $scope.categories = data;
    });

    expenseService.getExpenseById($routeParams.id).success(function (data) {
        $scope.expenseItem = data;
    });

    $scope.save = function () {
        expenseService.updateExpense($scope.expenseItem.ID, $scope.expenseItem)
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
    $scope.save = function () {
        expenseService.addCategory($scope.category)
            .success(function () {
                $location.path('/categories');
            });
    };
}]);

angular.module('expenseApp').controller('EditCategoryController', ['$scope', '$location', '$routeParams', 'expenseService', function ($scope, $location, $routeParams, expenseService) {
    expenseService.getCategoryById($routeParams.id).success(function (data) {
        $scope.category = data;
    });

    $scope.save = function () {
        expenseService.updateCategory($scope.category.ID, $scope.category)
            .success(function () {
                $location.path('/categories');
            });
    };
}]);

angular.module('expenseApp').controller('DashboardController', ['expenseService', function (expenseService) {
    function getRandomColor() {
        var color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        return color;
    }

    expenseService.getExpenses().success(function (data) {
        var expenseByCategory = {};
        var len = data.length;
        for (var i = 0; i < len; i++) {
            if (expenseByCategory[data[i].CategoryID] === undefined) {
                expenseByCategory[data[i].CategoryID] = 0;
            }

            expenseByCategory[data[i].CategoryID] += data[i].Amount;
        }

        var pieData = new Array();
        for (var key in expenseByCategory) {
            var color = getRandomColor();

            pieData.push({
                value: expenseByCategory[key],
                color: color,
                highlight: color,
                label: key
            });
        }

        var ctx = document.getElementById("dashboard").getContext("2d");
        var chart = new Chart(ctx).Pie(pieData);
    });
}]);
