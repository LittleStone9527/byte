/**
 * Created by axetroy on 16-4-2.
 */


let ChangePwdComponent = {
  templateUrl: 'app/components/auth-change-pwd/change-pwd.html',
  controller: function (lwApi, lwDialog) {
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {};

    // 提交表单
    $ctrl.submit = function (form) {
      lwApi.user.security.password.update({
        oldPassword: $ctrl.form.oldPwd,
        newPassword: $ctrl.form.newPwd
      }).$promise
        .then(function () {
          lwDialog.success();
          $ctrl.form = {};
          form.$setPristine();
        }, function (error) {
          lwDialog.error(error.data.error);
        });
    };

  }
};

export default ChangePwdComponent;
