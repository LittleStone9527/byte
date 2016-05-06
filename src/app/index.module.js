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
import {AdminItemsComponent} from '../async/admin/admin-items/admin-items';
import SafeItemsComponent from './components/safe-items/safe-items';
import {LineChartComponent} from './components/line-chart/chart.component';
import ProfileComponent from './components/profile/profile';
import AuthForgetComponent from './components/auth-forget/auth-forget';
import telBindingDialogComponent from './components/tel-binding-dialog/tel-binding-dialog';
import googleCaptchaBindingDialogComponent from './components/google-captcha-binding-dialog/google-captcha-binding-dialog';
import DatePickComponent from './components/date-pick/date-pick.component';
import ChangePwdComponent from './components/auth-change-pwd/change-pwd';
import Pagination from './components/pagination/pagination';
import TradeDetailComponent from './components/trade-detail/trade-detail';
import {TradeBlockComponent} from './components/trade-block/trade-block';

// directive
import {DragPickDirective} from './components/drag-pick/drag-pick.directive';
import {ToggleDirective} from './components/animate-toggle/toggle.directive';
import SlideDirective from './components/slide/slide.dereictive'

// service
import {LwUserService} from './components/lw-user/lw-user.service';
import {LwApiService} from './components/lw-api/lw-api.service';
import LwUtilService from './components/lw-util/lw-util.service';
import {LwDialogService} from './components/lw-dialog/lw-dialog.service';
import LwPermissionService from './components/lw-permission/lw-permission.service';
import QueryService from './components/query/query.service';
import i18nService from './components/i18n/i18n';
import LwTradeService from './components/lw-trade/lw-trade.service';


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
    'ngMask',
    'hc.marked',
    'monospaced.elastic'
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
  .provider('i18n', i18nService)
  .provider('lwTrade', LwTradeService)

  .run(runBlock)

  .controller('MainController', MainController)
  .controller('TradeController', TradeController)
  .controller('FinancesController', FinancesController)
  .controller('SafeController', SafeController)
  .controller('AuthController', AuthController)
  .controller('AdminController', AdminController)
  .controller('NewsController', NewsController)
  .controller('GuideController', GuideController)

  // common
  .component('header', HeaderComponent)
  .component('footer', FooterComponent)
  .component('pagination', Pagination)
  .component('datePick', DatePickComponent)

  // trade
  .component('tradeItems', TradeItemsComponent)
  .component('tradeDetail', TradeDetailComponent)
  .component('tradeBlock', TradeBlockComponent)
  // others items
  .component('financesItems', FinancesItemsComponent)
  .component('adminItems', AdminItemsComponent)
  .component('safeItems', SafeItemsComponent)
  // auth
  .component('loginForm', LoginFormComponent)
  .component('registerForm', RegisterFormComponent)
  .component('authForget', AuthForgetComponent)
  .component('changePassword', ChangePwdComponent)
  .component('profile', ProfileComponent)
  // widget
  .component('telBind', telBindingDialogComponent)
  .component('googleCaptchaBind', googleCaptchaBindingDialogComponent)
  .component('lineChart', LineChartComponent)

  .directive('dragPick', DragPickDirective)
  .directive('menuToggle', ToggleDirective)
  .directive('slide', SlideDirective);
