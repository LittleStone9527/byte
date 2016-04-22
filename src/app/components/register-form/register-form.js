/**
 * Created by axetroy on 16-4-2.
 */

let RegisterFormComponent = {
  templateUrl: 'app/components/register-form/register-form.html',
  controller: function (SETTINGS, lwUser, lwDialog) {
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {};

    $ctrl.way = 'email';

    $ctrl.emailReg = SETTINGS.reg.email;
    $ctrl.telReg = SETTINGS.reg.tel;

    $ctrl.register = (registerForm)=> {
      lwUser.register($ctrl.form)
        .then(function (resp) {
          console.log(resp);
          lwDialog.success();
          registerForm.$setPristine();
        }, function () {
          lwDialog.error();
        });
    };

  }
};


export default RegisterFormComponent;
