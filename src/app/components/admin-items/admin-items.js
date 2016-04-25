import {sideBarData} from '../../admin/admin.controller';

let AdminItemsComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/admin-items/admin-${$stateParams.partial}.html`;
  },
  controller: function ($stateParams) {
    'ngInject';

    let $ctrl = this;

    $ctrl.$onInit = ()=> {
      angular.forEach(sideBarData, function (v) {
        angular.forEach(v.data, (v1)=> {
          if ($stateParams.partial === v1.partial) {
            v.$$open = true;
            v1.$$active = true;
          } else {
            v1.$$active = false;
          }
        });
      });
    };

  }
};

export default AdminItemsComponent;