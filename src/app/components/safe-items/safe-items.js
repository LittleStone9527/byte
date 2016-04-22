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
      lwDialog('telBinding');
    };

    // 绑定谷歌验证码
    $ctrl.googleCaptchaBinding = ()=> {
      lwDialog('googleCaptchaBind');
    };

  }
};

export default SafeItemsComponent;