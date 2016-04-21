/**
 * Created by axetroy on 16-4-2.
 */


let LoginFormComponent = {
  templateUrl: 'app/components/login-form/login-form.html',
  controller: function (lwUser, lwDialog, $state) {
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {};

    $ctrl.login = (loginForm)=> {
      lwUser.login($ctrl.form)
        .then(function (resp) {
          lwDialog.success();
          return $state.go('home');
        }, function (error) {
          lwDialog.error();
        });
    };

  }
};

export default LoginFormComponent;
