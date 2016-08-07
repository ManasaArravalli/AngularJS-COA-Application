var AccountId = 0;

angular.module('example', ['ui', 'ngRoute'])

    .controller('AccountStructureController', ['$scope', '$location', 'DataService', function ($scope, $location, DataService) {
        $scope.accountStructurList = [];

        AccountId = $location.search().AccountId;


        $scope.accountStructurList = DataService.getAccountStructureData();
        $scope.user = {};
        $scope.total = 0;
        $scope.parentAccountStructure = [{ id: 1, accountNumber: "123", accountDescription: "abc", balance: "4500", nodes: "[]" }]
        $scope.accountTypes = DataService.getAccountTypeData();

        $scope.addAccountStructure = function (user) {
            // $scope.user.accountChildDescription=user.accountDescription;

            $scope.total = $scope.total + parseInt(user.balance);
            // $scope.accountStructurList.push(user);
            DataService.setAccountStructureData(user);
            $scope.accountStructurList = DataService.getAccountStructureData();
            $scope.data = JSON.parse(localStorage.getItem('data'));
            var arrddl = [];

            if ($scope.data != null) {
                $scope.ddlDataElements = getddlelements($scope.data, arrddl);
            }
            $scope.reset();
        };

        $scope.reset = function () {
            $scope.user = '';
        };

        $scope.deleteAccountStructure = function (acc) {
            $scope.accountStructurList.splice($scope.accountStructurList.indexOf(acc), 1);
        };

        $scope.data = JSON.parse(localStorage.getItem('data'));

        if ($scope.data != null) {
            $scope.total = getTotal($scope.data);
        }

        var arrddl = [];

        if ($scope.data != null) {
            $scope.ddlDataElements = getddlelements($scope.data, arrddl);
        }

    }]);

angular.module('example').controller('AccountTypeController', ['$scope', '$window', 'DataService', function ($scope, $window, DataService) {

    $scope.accountTypeList = [];

    $scope.parentAccountStructure = DataService.getAccountStructureData();
    var accountTypeList = [];

    if (localStorage.getItem('AccountType') != null) {
        accountTypeList = JSON.parse(localStorage.getItem('AccountType'));
        $scope.accountTypeList = accountTypeList;
    }

    $scope.addAccountType = function (account) {
        // $scope.user.accountChildDescription=user.accountDescription;


        //if (localStorage.getItem('AccountType') != null)
        //{
        //    accountTypeList.push(localStorage.getItem('AccountType'));

        //}

        accountTypeList.push(account);

        $scope.accountTypeList = accountTypeList;

        // DataService.setAccountTypeData(account);

        $scope.reset();

        localStorage.setItem('AccountType', JSON.stringify(accountTypeList));
        //$scope.accountTypeList = JSON.parse(localStorage.getItem('AccountType'));

    };

    $scope.reset = function () {
        $scope.account = '';
    };

    $scope.deleteAccountStructure = function (acc) {
        $scope.accountTypeList.splice($scope.accountTypeList.indexOf(acc), 1);
    };


    var arrddl = [];

    $scope.data = JSON.parse(localStorage.getItem('data'));
    if ($scope.data != null) {
        $scope.ddlDataElements = getddlelements($scope.data, arrddl);
    }




    $scope.getTotal = function () {
        var total = 0;
        
        for (var i = 0; i < $scope.accountTypeList.length; i++) {
            var product = $scope.accountTypeList[i];
            total += product.balance;
        }
        return total;
    }


    if ($scope.data != null) {
        $scope.ddlDataElements = getddlelements($scope.data, arrddl);
    }

    // $scope.accountTypeList = JSON.stringify(localStorage.getItem('AccountType'));
}]);

angular.module('example').factory('DataService', function () {

    var object = {};
    var accountTypeList = [];
    var accountStructurList = [];
    object.setAccountStructureData = function (obj) {

        if (localStorage.getItem("Id") == undefined) {
            localStorage.setItem("Id", 1);
        }
        else {
            localStorage.setItem("Id", parseInt(localStorage.getItem("Id")) + 1);
        }
        obj.id = localStorage.getItem("Id");

        obj.nodes = [];
        //accountStructurList.push(obj
        if (JSON.stringify(localStorage.getItem('data')).length > 4) {
            accountStructurList = JSON.parse(localStorage.getItem('data'));
            if (AccountId > 0) {
                //for (var i = 0; i < accountStructurList.length; i++) {

                //    if (accountStructurList[i].nodes == undefined) {
                //        accountStructurList[i].nodes = [];
                //    }

                //    if (accountStructurList[i].accountNumber == AccountId) {
                //        if (accountStructurList[i].nodes == undefined) {
                //            accountStructurList[i].nodes = [];
                //        }
                //        accountStructurList[i].nodes.push(obj);
                //    }
                //}


                pushelement(accountStructurList, obj);
            }
            else {
                accountStructurList.push(obj);
            }
        }
        else {
            accountStructurList.push(obj);
        }

        var json = JSON.stringify(accountStructurList, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }

            return value;
        });

        localStorage.setItem('data', json);
        //   localStorage.setItem('data', JSON.stringify(accountStructurList));

    }

    object.getAccountStructureData = function () {
        return accountStructurList;
    }
    object.setAccountTypeData = function (obj) {
        accountTypeList.push(obj);
        localStorage.setItem('AccountType', accountTypeList);
    }

    object.getAccountTypeData = function () {
        return accountTypeList = JSON.parse(localStorage.getItem('AccountType'));
    }
    return object;
});

angular.module('example').config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'accountStructure.html',
            controller: 'AccountStructureController'
        })

        // route for the add account type page
        .when('/accountType', {
            templateUrl: 'accountType.html',
            controller: 'AccountTypeController'
        });
});

function pushelement(accountStructurList, obj) {

    //for (var i = 0; i < accountStructurList.length; i++) {

    //    if (accountStructurList[i].nodes == undefined) {
    //        accountStructurList[i].nodes = [];
    //    }

    //    if (accountStructurList[i].accountNumber == AccountId) {
    //        if (accountStructurList[i].nodes == undefined) {
    //            accountStructurList[i].nodes = [];
    //        }
    //        accountStructurList[i].nodes.push(obj);
    //    }
    //}


    for (var i = 0; i < accountStructurList.length; i++) {

        if (accountStructurList[i].id == AccountId) {
            if (accountStructurList[i].nodes == undefined) {
                accountStructurList[i].nodes = [];
            }
            accountStructurList[i].nodes.push(obj);
        }

        if (accountStructurList[i].nodes != undefined) {
            for (var j = 0; j < accountStructurList[i].nodes.length; j++) {

                if (accountStructurList[i].nodes[j].id == AccountId) {
                    if (accountStructurList[i].nodes[j].nodes == undefined) {
                        accountStructurList[i].nodes[j].nodes = [];
                    }
                    accountStructurList[i].nodes[j].nodes.push(obj);
                }

                pushelement(accountStructurList[i].nodes[j].nodes, obj);

            }
        }
    }

    return accountStructurList;
}

function getddlelements(childNode, arr) {

    for (var i = 0; i < childNode.length; i++) {
        arr.push(childNode[i]);
        if (childNode[i].nodes != undefined) {
            for (var j = 0; j < childNode[i].nodes.length; j++) {
                arr.push(childNode[i].nodes[j]);
                if (childNode[i].nodes[j].nodes != undefined) {
                    getddlelements(childNode[i].nodes[j].nodes, arr);
                }
            }
        }
    }

    return arr;
}

function getTotal(data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total = total + parseInt(data[i].balance);
    }

    return total;

}
