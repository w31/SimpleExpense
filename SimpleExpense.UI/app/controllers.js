angular.module('expenseApp').controller('NavController', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (loc) {
        return $location.path().indexOf(loc) === 0;
    };
}]);

angular.module('expenseApp').controller('ExpenseController', ['$scope', 'Expense', function ($scope, Expense) {
    Expense.query(function (data) {
        $scope.expenses = data;
    });
}]);

angular.module('expenseApp').controller('CreateExpenseController', ['$scope', '$location', 'Expense', 'Category', function ($scope, $location, Expense, Category) {
    Category.query(function (data) {
        $scope.categories = data;
    });

    $scope.save = function () {
        var expense = new Expense($scope.expenseItem);
        expense.$save(function () {
            $location.path('/expenses');
        });
    };
}]);

angular.module('expenseApp').controller('EditExpenseController', ['$scope', '$location', '$routeParams', 'Expense', 'Category', function ($scope, $location, $routeParams, Expense, Category) {
    Category.query(function (data) {
        $scope.categories = data;
    });

    Expense.get({ ID: $routeParams.id })
        .$promise
        .then(function (expense) {
            $scope.expenseItem = expense;
        });

    $scope.save = function () {
        Expense.update({ ID: $routeParams.id }, $scope.expenseItem)
            .$promise
            .then(function () {
                $location.path('/expenses');
            });
    };

    $scope.delete = function () {
        Expense.delete({ ID: $routeParams.id })
            .$promise
            .then(function () {
                $location.path('/expenses');
            });
    };
}]);

angular.module('expenseApp').controller('CategoryController', ['$scope', 'Category', function ($scope, Category) {
    Category.query(function (data) {
        $scope.categories = data;
    });
}]);

angular.module('expenseApp').controller('CreateCategoryController', ['$scope', '$location', 'Category', function ($scope, $location, Category) {
    $scope.save = function () {
        var newCategory = new Category();
        newCategory.Name = $scope.category.Name;
        newCategory.$save(function () {
            $location.path('/categories');
        });
    };
}]);

angular.module('expenseApp').controller('EditCategoryController', ['$scope', '$location', '$routeParams', 'Category', function ($scope, $location, $routeParams, Category) {
    Category.get({ ID: $routeParams.id })
        .$promise
        .then(function (c) {
            $scope.category = c;
        });

    $scope.save = function () {
        Category.update({ ID: $routeParams.id }, $scope.category)
            .$promise
            .then(function () {
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
