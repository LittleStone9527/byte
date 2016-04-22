/**
 * Created by axetroy on 16-4-2.
 */


let AuthForgetComponent = {
  templateUrl: 'app/components/auth-forget/auth-forget.html',
  controller: function () {
    'ngInject';
    console.log('auth forget loading');

    let $ctrl = this;

    $ctrl.form = {};

    $ctrl.way = 2;

  }
};

export default AuthForgetComponent;
