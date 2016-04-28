import 'babel-polyfill';
import 'resource/dist/$resource.js';
// import 'resource';
import 'at-base64';

import {SETTINGS} from './settings';
import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';

// controller
import {MainController} from './main/main.controller';
import {TradeController} from './trade/trade.controller';
import {FinancesController} from './finances/finances.controller';
import {SafeController} from './safe/safe.controller';
import {AuthController} from './auth/auth.controller';
import {AdminController} from './admin/admin.controller';
import NewsController from './news/news.controller';
import GuideController from './guide/guide.controller';


// components
import {HeaderComponent} from './components/header/header.component'
import {FooterComponent} from './components/footer/footer.component';
import TradeItemsComponent from './components/trade-items/trade-items';
import LoginFormComponent from './components/login-form/login-form';
import RegisterFormComponent from './components/register-form/register-form';
import {FinancesItemsComponent} from './components/finances-items/finances-items';
import {
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
} from './components/admin-items/admin-items';
import SafeItemsComponent from './components/safe-items/safe-items';
import {LineChartComponent} from './components/line-chart/chart.component';
import ProfileComponent from './components/profile/profile';
import AuthForgetComponent from './components/auth-forget/auth-forget';
import telBindingDialogComponent from './components/tel-binding-dialog/tel-binding-dialog';
import googleCaptchaBindingDialogComponent from './components/google-captcha-binding-dialog/google-captcha-binding-dialog';
import DatePickComponent from './components/date-pick/date-pick.component';
import ChangePwdComponent from './components/auth-change-pwd/change-pwd';
import UserListComponent from './components/user-list/user-list.component';
import Pagination from './components/pagination/pagination';
import AdminDetailComponent from './components/admin-detail/admin-detail';

// directive
import {DragPickDirective} from './components/drag-pick/drag-pick.directive';
import {ToggleDirective} from './components/animate-toggle/toggle.directive';

// service
import {LwUserService} from './components/lw-user/lw-user.service';
import {LwApiService} from './components/lw-api/lw-api.service';
import LwUtilService from './components/lw-util/lw-util.service';
import {LwDialogService} from './components/lw-dialog/lw-dialog.service';
import LwPermissionService from './components/lw-permission/lw-permission.service';
import QueryService from './components/query/query.service';


angular.module('lwTrade', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ui.router',
    'ngDialog',
    'toastr',
    'ngStore',
    '$resource',
    'atCompare',
    'base64',
    'datePicker',
    'ngMask'
  ])
  .constant('SETTINGS', SETTINGS)
  .value('$moment', window.moment)
  .config(config)
  .config(routerConfig)
  .provider('lwApi', LwApiService)
  .provider('lwUser', LwUserService)
  .provider('lwUtil', LwUtilService)
  .provider('lwDialog', LwDialogService)
  .provider('lwPermission', LwPermissionService)
  .provider('$query', QueryService)

  .run(runBlock)

  .controller('MainController', MainController)
  .controller('TradeController', TradeController)
  .controller('FinancesController', FinancesController)
  .controller('SafeController', SafeController)
  .controller('AuthController', AuthController)
  .controller('AdminController', AdminController)
  .controller('NewsController', NewsController)
  .controller('GuideController', GuideController)

  .component('header', HeaderComponent)
  .component('footer', FooterComponent)
  .component('tradeItems', TradeItemsComponent)
  .component('loginForm', LoginFormComponent)
  .component('registerForm', RegisterFormComponent)
  .component('financesItems', FinancesItemsComponent)
  .component('adminItems', AdminItemsComponent)
  .component('safeItems', SafeItemsComponent)
  .component('lineChart', LineChartComponent)
  .component('profile', ProfileComponent)
  .component('authForget', AuthForgetComponent)
  .component('telBind', telBindingDialogComponent)
  .component('googleCaptchaBind', googleCaptchaBindingDialogComponent)
  .component('datePick', DatePickComponent)
  .component('changePassword', ChangePwdComponent)
  .component('userList', UserListComponent)
  .component('pagination', Pagination)
  .component('adminDetail', AdminDetailComponent)
  .component('adminOutbox', AdminOutboxComponent)
  .component('adminActive', AdminActiveComponent)
  .component('adminPublic', AdminPublicComponent)
  .component('adminAdministrator', AdminAdministratorComponent)
  .component('adminBoughtDetail', AdminBoughtDetailComponent)
  .component('adminBuyingDetail', AdminBuyingDetailComponent)
  .component('adminDash', AdminDashComponent)
  .component('adminDatabase', AdminDatabaseComponent)
  .component('adminGuide', AdminGuideComponent)
  .component('adminInbox', AdminInboxComponent)
  .component('adminItemized', AdminItemizedComponent)
  .component('adminPermission', AdminPermissionComponent)
  .component('adminRecharge', AdminRechargeComponent)
  .component('adminRecord', AdminRecordComponent)
  .component('adminSellingDetail', AdminSellingDetailComponent)
  .component('adminSetting', AdminSettingComponent)
  .component('adminSoldDetail', AdminSoldDetailComponent)
  .component('adminStatistics', AdminStatisticsComponent)
  .component('adminTerms', AdminTermsComponent)
  .component('adminTransfer', AdminTransferComponent)
  .component('adminUnactive', AdminUnactiveComponent)
  .component('adminWithdrawals', AdminWithdrawalsComponent)

  .directive('dragPick', DragPickDirective)
  .directive('menuToggle', ToggleDirective);
