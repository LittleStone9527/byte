let SafeItemsComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/safe-items/safe-${$stateParams.partial}.html`;
  },
  controller: function ($scope, $timeout, lwUser, ngDialog, lwDialog) {
    'ngInject';

    let $ctrl = this;

    $scope.ngDialogData = {};

    $ctrl.profile = lwUser.profile;

    // 绑定电话
    $ctrl.telBinding = ()=> {
      console.log();
      lwDialog.open({
        template: '<tel-bind></tel-bind>',
        plain: true,
        // controller: ($scope)=> {
        //   'ngInject';
        //   console.log($scope);
        // }
      });
      // lwDialog('telBinding');
    };

  }
};

export default SafeItemsComponent;