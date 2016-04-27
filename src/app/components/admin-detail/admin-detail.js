// import {sideBarData} from '../../admin/admin.controller';

let AdminDetailComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/admin-detail/admin-${$stateParams.partial}-${$stateParams.sub}.html`;
  },
  controller: function ($stateParams) {
    'ngInject';

    let $ctrl = this;

  }
};

export default AdminDetailComponent;