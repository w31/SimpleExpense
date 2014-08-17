var app = angular.module('expenseApp', []);

app.controller('AppController', function () {
    this.expenses = [];
    this.categories = [];
});

app.controller('NavController', function () {
    this.tab = 1;

    this.setTab = function (tab) {
        this.tab = tab;
    }

    this.isSet = function (tab) {
        return this.tab === tab;
    };
});
