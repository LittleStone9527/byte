let UserListComponent = {
  template: require('./user-list.html'),
  bindings: {
    eqState: '@',     // 等于
    neState: '@',     // 不等于
    state: '@'        // 状态   active or unactive
  },
  controller: function ($scope, $state, $q, $stateParams, lwApi, lwDialog) {
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
        "%s": $stateParams.skip * 1 || 0,
        "%p": $stateParams.page * 1 || 0
      }
    ];

    $ctrl.params = $stateParams;


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

    /**
     * 改变用户的状态
     * @param username
     * @param state
     */
    $ctrl.changeState = (username, state)=> {
      lwDialog.confirm()
        .then(()=> {
          return lwApi.user.manage.state.update({username, state}).$promise;
        }, ()=> {
          return $q.reject();
        })
        .then(()=> {
          lwDialog.success();
        }, (error)=> {
          if (error) {
            lwDialog.error();
          }
        })
        .finally(()=>getUserList());
    };

    /**
     *
     */
    $ctrl.deleteUser = (username)=> {
      lwDialog.confirm()
        .finally(()=>lwDialog.error('can not delete the user:' + username));
    };

    /**
     * 翻页
     */
    $ctrl.pageTrigger = page=> $state.go('admin.items', angular.merge($stateParams, {page}));

    $ctrl.$onInit = ()=> {
      getUserList();
    };

  }
};

export {UserListComponent};