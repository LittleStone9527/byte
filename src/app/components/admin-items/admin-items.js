import {sideBarData} from '../../admin/admin.controller';

import AdminOutboxComponent from './admin-outbox';
import AdminActiveComponent from './admin-active';
import AdminPublicComponent from './admin-public';
import AdminAdministratorComponent from './admin-administrator';
import AdminBoughtDetailComponent from './admin-bought-detail';
import AdminBuyingDetailComponent from './admin-buying-detail';
import AdminDashComponent from './admin-dash';
import AdminDatabaseComponent from './admin-datebase';
import AdminGuideComponent from './admin-guide';
import AdminInboxComponent from './admin-inbox';
import AdminItemizedComponent from './admin-itemized';
import AdminPermissionComponent from './admin-permission';
import AdminRechargeComponent from './admin-recharge';
import AdminRecordComponent from './admin-record';
import AdminSellingDetailComponent from './admin-selling-detail';
import AdminSettingComponent from './admin-setting';
import AdminSoldDetailComponent from './admin-sold-detail';
import AdminStatisticsComponent from './admin-statistics';
import AdminTermsComponent from './admin-terms';
import AdminTransferComponent from './admin-transfer';
import AdminUnactiveComponent from './admin-unactive';
import AdminWithdrawalsComponent from './admin-withdrawals';

let AdminItemsComponent = {
  template: ($stateParams)=> {
    'ngInject'
    let partial = $stateParams.partial;
    return `<admin-${partial}></admin-${partial}>`
  },
  // templateUrl: ($stateParams)=> {
  //   'ngInject';
  //   return `app/components/admin-items/admin-${$stateParams.partial}.html`;
  // },
  controller: function ($timeout, $stateParams) {
    'ngInject';

    let $ctrl = this;

    /**
     * 初始化侧边栏
     */
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

export {
  AdminItemsComponent,
  AdminOutboxComponent,
  AdminActiveComponent,
  AdminPublicComponent,
  AdminAdministratorComponent,
  AdminBoughtDetailComponent,
  AdminBuyingDetailComponent,
  AdminDashComponent,
  AdminDatabaseComponent,
  AdminGuideComponent,
  AdminInboxComponent,
  AdminItemizedComponent,
  AdminPermissionComponent,
  AdminRechargeComponent,
  AdminRecordComponent,
  AdminSellingDetailComponent,
  AdminSettingComponent,
  AdminSoldDetailComponent,
  AdminStatisticsComponent,
  AdminTermsComponent,
  AdminTransferComponent,
  AdminUnactiveComponent,
  AdminWithdrawalsComponent
};