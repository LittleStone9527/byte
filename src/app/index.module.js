/* global malarkey:false, moment:false */

import "babel-polyfill";

import {SETTINGS} from './settings';
import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';

// controller

import {MainController} from './main/main.controller';
import {TradeController} from './trade/trade.controller';
import {FinancesController} from '././finances/finances.controller';
import {SaveController} from '././safe/safe.controller';
import {AuthController} from '././auth/auth.controller';

// components
import {HeaderComponent} from './components/header/header.component'
import {FooterComponent} from './components/footer/footer.component';
import {TradeItemsComponent} from './components/trade-items/trade-items';
import {LoginFormComponent} from './components/login-form/login-form';
import {RegisterFormComponent} from './components/register-form/register-form';
import {FinancesItemsComponent} from './components/finances-items/finances-items';

// directive

// service
import {LwResourceService} from './components/lw-resource/lw-resource.service';
import {LwUserService} from './components/lw-user/lw-user.service';
import {LwApiService} from './components/lw-api/lw-api.service';
import {LwUtilService} from './components/lw-util/lw-util.service';


angular.module('lwTrade', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    'toastr',
    'ngStore'
  ])
  .constant('SETTINGS', SETTINGS)
  .config(config)
  .config(routerConfig)
  .provider('lwResource', LwResourceService)
  .provider('lwApi', LwApiService)
  .provider('lwUser', LwUserService)
  .provider('lwUtil', LwUtilService)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('TradeController', TradeController)
  .controller('FinancesController', FinancesController)
  .controller('SaveController', SaveController)
  .controller('AuthController', AuthController)
  .component('header', HeaderComponent)
  .component('footer', FooterComponent)
  .component('tradeItems', TradeItemsComponent)
  .component('loginForm', LoginFormComponent)
  .component('registerForm', RegisterFormComponent)
  .component('financesItems', FinancesItemsComponent);
