/**
 * Created by axetroy on 16-4-2.
 */


let LoginFormComponent = {
  templateUrl: 'app/components/login-form/login-form.html',
  controller: function ($scope, lwUser, $log) {
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {};

    $ctrl.login = (loginForm)=> {
      lwUser.register($ctrl.form)
        .then(function (resp) {
          $log.log(resp);
        }, function (error) {
          $log.error(error);
        });
    };

    $scope.title = 'hello alert';

  }
};

export default LoginFormComponent;
