/**
 * Created by axetroy on 16-4-2.
 */

class ctrl {
  constructor($log, SETTINGS, lwUser, lwDialog) {
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {};

    $ctrl.way = 'email';

    $ctrl.emailReg = SETTINGS.reg.email;
    $ctrl.telReg = SETTINGS.reg.tel;

    $ctrl.register = (registerForm)=> {
      lwUser.register($ctrl.form)
        .then(function () {
          lwDialog.success();
        }, function () {
          // lwDialog.error('error','title');
          lwDialog.error();
        });
    };

  }
}

let RegisterFormComponent = {
  templateUrl: 'app/components/register-form/register-form.html',
  controller: ctrl
};


export {RegisterFormComponent};
