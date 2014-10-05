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

    $scope.cancel = function() {
        $location.path('/expenses');
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

    $scope.cancel = function () {
        $location.path('/expenses');
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

    $scope.cancel = function() {
        $location.path('/categories');
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

    $scope.cancel = function () {
        $location.path('/categories');
    };
}]);

angular.module('expenseApp').controller('DashboardController', ['$scope', 'Category', 'Expense', function ($scope, Category, Expense) {
    function getRandomColor() {
        var color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        return color;
    }

    function drawChart() {
        var canvas = document.getElementById("dashboard");
        canvas.width = window.innerWidth - (canvas.offsetLeft * 2);
        canvas.height = window.innerHeight - (canvas.offsetTop * 2);
        var chart = new Chart(canvas.getContext("2d")).Pie($scope.pieData, { animation: false });
    }

    var categoryLookup = {};
    Category.query(function(data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            categoryLookup[data[i].ID] = data[i].Name;
        }
    });

    Expense.getbycategory(function (data) {
        $scope.pieData = getPieData(data, categoryLookup);

        drawChart();
    });

    function getPieData(expenseByCategory, categoryLookup) {
        var pieData = new Array();
        for (var i = 0; i < expenseByCategory.length; i++) {
            var color = getRandomColor();

            pieData.push({
                value: expenseByCategory[i].Amount,
                color: color,
                highlight: color,
                label: categoryLookup[expenseByCategory[i].CategoryID]
            });
        }

        return pieData;
    }

    function onResize() {
        drawChart();
    }

    function onBeforeDeactivate() {
        angular.element(window).off("resize", onResize);
        angular.element(document).off("beforedeactivate", onBeforeDeactivate);
    }

    angular.element(window).on("resize", onResize);
    angular.element(document).on("beforedeactivate", onBeforeDeactivate);
}]);
