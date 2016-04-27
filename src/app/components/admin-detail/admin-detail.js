// import {sideBarData} from '../../admin/admin.controller';

let AdminDetailComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/admin-detail/admin-${$stateParams.partial}-${$stateParams.sub}.html`;
  },
  controller: function ($scope, $stateParams, lwApi) {
    'ngInject';

    let $ctrl = this;

    $ctrl.userProfile = {};

    let getUserInfo = (username)=> {
      lwApi.user.manage.one.get({username}).$promise
        .then((resp)=> {
          $scope.$apply(()=>$ctrl.userProfile = resp.data);
        });
    };

    console.log($stateParams);

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