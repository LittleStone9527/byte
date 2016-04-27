let UserListComponent = {
  templateUrl: 'app/components/user-list/user-list.html',
  bindings: {
    eqState: '@',
    neState: '@',
    state: '@'
  },
  controller: function ($scope, $q, $stateParams, lwApi) {
    'ngInject';


    let $ctrl = this;

    $ctrl.userList = [];
    $ctrl.userListMeta = {};

    let Query = [
      {
        "%and": {
          "%eq": {
            "state": $ctrl.eqState
          },
          "%ne": {
            "state": $ctrl.neState
          }
        }
      },
      {
        "%o": [
          "+created"
        ]
      },
      {
        "%l": $stateParams.limit * 1 || 10,
        "%s": $stateParams.skip || 0,
        "%p": $stateParams.page || 0
      }
    ];

    let getUserList = ()=> {
      let deferred = $q.defer();
      lwApi.user.manage.list.get({}, {
        headers: {
          'Meta-Query': angular.toJson(Query)
        }
      }).$promise
        .then((resp)=> {
          // why ? 为什么要手动触发
          $scope.$apply(function () {
            $ctrl.userList = resp.data;
            $ctrl.userListMeta = resp.meta;
          });
          deferred.resolve(resp);
        }).catch((err)=>deferred.reject(err));
      return deferred.promise;
    };


    $ctrl.$onInit = ()=> {
      getUserList();
    };

  }
};

export default UserListComponent;