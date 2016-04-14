/**
 * Created by axetroy on 16-4-2.
 */


let LoginFormComponent = {
  templateUrl: function ($element, $attrs) {
    'ngInject';
    return 'app/components/login-form/login-form.html';
  },
  controller: ctrl
};

class ctrl {
  constructor($q, $state, $timeout) {
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {};

    console.log('login init');

  }
}

export {LoginFormComponent};
