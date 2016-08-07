(function () {
    'use strict';

    angular.module('demoApp').controller('BasicExampleCtrl', ['$scope', function ($scope) {

        var AccountId = 0;

        $scope.remove = function (scope) {
            scope.remove();
        };

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.moveLastToTheBeginning = function () {
            var a = $scope.data.pop();
            $scope.data.splice(0, 0, a);
        };

        $scope.newSubItem = function (scope) {
            var nodeData = scope.$modelValue;
            nodeData.nodes.push({
                id: nodeData.id * 10 + nodeData.nodes.length,
                accountNumber: nodeData.accountNumber + '.' + (nodeData.nodes.length + 1),
                nodes: []
            });
        };

        $scope.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        $scope.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };

        $scope.otherMenuOptions = [
        ['Account Summary', function ($itemScope, $event, color) {
            $scope.toggleModal();
        }],
        ['Account Type', function ($itemScope, $event, color) {
            window.location = "index.html#/accountType";
        }],
        ['Delete', function ($itemScope, $event, color) {
            $itemScope.remove();

            var json = JSON.stringify($scope.data, function (key, value) {
                if (key === "$$hashKey") {
                    return undefined;
                }

                return value;
            });

            localStorage.setItem('data', json);
            // var item = $itemScope.$element[0].innerText;
            //// removeChildNodes($scope.data, item);
            // alert(JSON.stringify($scope.data));



            // $scope.data = ParentNodeAdd(parseInt(item), $scope.data);
            // alert(JSON.stringify($scope.data));
            // localStorage.setItem('data', $scope.data);
        }]
        ]

        $scope.data = JSON.parse(localStorage.getItem('data'));





        //$scope.data =     [{ id: 1, accountNumber: '123', 'accountDescription': 'abc', 'balance': '4500', 'nodes': [] },
        //{ id: 2, accountNumber: '456', 'accountDescription': 'def', 'balance': '4600', 'nodes': [] }]

        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.click = function () {
            window.location = "/index.html";
        }

        $scope.clickNext = function () {
            window.location = "/index.html#/?AccountId=" + AccountId;
        }

        $scope.GetValue = function (data) {
            AccountId = data;
        }

        $scope.AccountSummary = function () {
            $scope.toggleModal();
        }

        $scope.AccountType = function () {
            window.location = "/index.html";
        }

        $scope.toggleModal1 = function (data) {
            $scope.node = data;

            $scope.total = 0;
            $scope.total = SumChildNodes(data, data.balance);


            $scope.modalShown1 = !$scope.modalShown1;
        };
        $scope.getChild = function (data) {
            $scope.subnodeid = data.accountNumber;
            $scope.subnode = data.nodes;
        };


        var arrddl = [];
        if ($scope.data != null) {
            $scope.ddlDataElements = getddlelements($scope.data, arrddl);
        }

    }]);

    angular.module('demoApp').directive('modalDialog', function () {
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function (scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width)
                    scope.dialogStyle.width = attrs.width;
                if (attrs.height)
                    scope.dialogStyle.height = attrs.height;
                scope.hideModal = function () {
                    scope.show = false;
                };
            },
            template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
        };
    });
    angular.module('demoApp').directive('modalDialog1', function () {
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function (scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width)
                    scope.dialogStyle.width = attrs.width;
                if (attrs.height)
                    scope.dialogStyle.height = attrs.height;
                scope.hideModal = function () {
                    scope.show = false;
                };
            },
            template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
        };
    });

    function SumChildNodes(childNode, sum) {
        if (childNode.nodes != undefined) {
            for (var i = 0; i < childNode.nodes.length; i++) {
                sum += parseInt(childNode.nodes[i].balance);
                if (childNode.nodes[i].nodes != undefined) {
                    SumChildNodes(childNode.nodes[i].nodes, sum);
                }
            }
        }
        return sum;
    }

    function getddlelements(childNode, arr) {
       
        if (arr[0] == undefined)
        {
            var fake = childNode;
            fake.accountNumber = 'New Account Summary';
            fake.id = 0;
            arr.push(fake);
        }

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

}());











