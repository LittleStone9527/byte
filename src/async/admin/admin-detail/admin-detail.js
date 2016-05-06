let AdminDetailComponent = {
  template: require('./admin-active-profile.html'),
  controller($stateParams, lwUser){
    'ngInject';

    let $ctrl = this;

    $ctrl.userProfile = {};

    let getUserInfo = (username)=> {
      lwUser.getDetail(username)
        .then((resp)=> {
          $ctrl.userProfile = resp.data;
        }, function (error) {
          console.error(error);
        });
    };

    $ctrl.$onInit = ()=> {
      switch ($stateParams.sub) {
        case 'profile':
          getUserInfo($stateParams.username);
          break;
        default:
      }
    };
  }
};

export default AdminDetailComponent;