/**
 * Created by axetroy on 16-4-2.
 */

class ctrl {
  constructor($log, SETTINGS, lwUser) {
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {};

    $ctrl.way = 'email';
    
    $ctrl.emailReg = SETTINGS.reg.email;
    $ctrl.telReg = SETTINGS.reg.tel;

    $ctrl.register = (registerForm)=> {
      console.log($ctrl.form);
      console.log(registerForm);
      // lwUser.register()
      //   .then(function (resp) {
      //     $log.log(resp);
      //     $log.log(registerForm);
      //   }, function (error) {
      //     $log.error(error);
      //   });
    };

  }
}

let RegisterFormComponent = {
  templateUrl: function ($element, $attrs) {
    'ngInject';
    return 'app/components/register-form/register-form.html';
  },
  controller: ctrl
};


export {RegisterFormComponent};
