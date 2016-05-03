import i18n from './lang';
import {register} from './index.config';
import {SETTINGS} from './settings';

let registerAdmin = false;

let defaultVal = class {
  static get params() {
    return {
      page: {
        value: '0',
        squash: true
      },
      limit: {
        value: '10',
        squash: true
      },
      skip: {
        value: '0',
        squash: true
      }
    }
  }
};

let limit = ':limit?:page?:skip?';

let appPath = 'app';
let componentsPath = appPath + '/components';

let router = {
  home: {
    url: '/',
    views: {
      main: {
        templateUrl: 'app/main/main.html',
        controller: 'MainController as vm'
      }
    }
  },
  trade: {
    url: '/trade',
    views: {
      main: {
        templateUrl: 'app/trade/trade.html',
        controller: 'TradeController as vm'
      }
    },
    resolve: {
      login: ($q, $state, lwPermission)=> {
        'ngInject';
        return lwPermission.login().then(()=>$q.resolve(), ()=>$q.reject()).catch(()=>$state.go('auth.login'));
      }
    },
    $$child: {
      'trade.home': {
        views: {
          trade_items: {
            templateUrl: componentsPath + '/trade-items/trade-home.html'
          }
        }
      },
      'trade.items': {
        url: '/:partial',
        views: {
          trade_items: {
            template: '<trade-items></trade-items>'
          }
        }
      }
    }
  },
  finances: {
    url: '/finances',
    views: {
      main: {
        templateUrl: 'app/finances/finances.html',
        controller: 'FinancesController as vm'
      }
    },
    resolve: {
      login: ($q, $state, lwPermission)=> {
        'ngInject';
        return lwPermission.login().then(()=>$q.resolve(), ()=>$q.reject()).catch(()=>$state.go('auth.login'));
      }
    },
    $$child: {
      'finances.home': {
        views: {
          fin_items: {
            templateUrl: componentsPath + '/finances-items/finances-home.html'
          }
        }
      },
      'finances.items': {
        url: '/:partial',
        views: {
          fin_items: {
            template: '<finances-items/>'
          }
        }
      }
    }
  },
  safe: {
    url: '/safe',
    views: {
      main: {
        templateUrl: 'app/safe/safe.html',
        controller: 'SafeController as vm'
      }
    },
    resolve: {
      login: ($q, $state, lwPermission)=> {
        'ngInject';
        return lwPermission.login().then(()=>$q.resolve(), ()=>$q.reject()).catch(()=>$state.go('auth.login'));
      }
    },
    $$child: {
      'safe.home': {
        views: {
          safe_items: {templateUrl: componentsPath + '/safe-items/safe-home.html'}
        }
      },
      'safe.items': {
        url: '/:partial',
        views: {
          safe_items: {template: '<safe-items/>'}
        }
      }
    }
  },
  auth: {
    url: '/auth',
    abstract: true,
    views: {
      main: {
        templateUrl: 'app/auth/auth.html',
        controller: 'AuthController as vm'
      }
    },
    resolve: {
      unLogin: ($q, lwPermission)=> {
        'ngInject';
        return lwPermission.login().then(()=> $q.reject(), ()=>$q.resolve());
      }
    },
    $$child: {
      'auth.register': {
        url: '/register?:from?',
        views: {
          auth_items: {
            template: '<register-form/>'
          }
        }
      },
      'auth.login': {
        url: '/login',
        views: {
          auth_items: {
            template: '<login-form/>'
          }
        }
      },
      'auth.forget': {
        url: '/forget',
        views: {
          auth_items: {
            template: '<auth-forget/>'
          }
        }
      },
      'auth.active': {
        url: '/active',
        views: {
          auth_items: {
            template: '<active-form/>'
          }
        }
      }
    }
  },
  news: {
    url: '/news',
    views: {
      main: {
        templateUrl: 'app/news/news.html',
        controller: 'NewsController as vm'
      }
    }
  },
  guide: {
    url: '/guide',
    views: {
      main: {
        templateUrl: 'app/guide/guide.html',
        controller: 'GuideController as vm'
      }
    }
  },
  admin: {
    url: `/${SETTINGS.secureUrl}`,
    views: {
      main: {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController as vm'
      }
    },
    resolve: {
      login: ($q, $state, lwPermission)=> {
        'ngInject';
        return lwPermission.login().then(()=>$q.resolve(true), ()=>$q.reject(false)).catch(()=>$state.go('404'));
      },
      admin: (login, $q, $state, lwPermission)=> {
        'ngInject';
        (login ? $q.resolve() : $q.reject()).then(()=>lwPermission.admin()).catch(()=>$state.go('404'));
      },
      module: ($q)=> {
        'ngInject';

        let deferred = $q.defer();

        if (registerAdmin === false) {
          require.ensure('../async/admin/index', function (require) {
            console.info('load the admin module');
            let module = require('../async/admin/index');
            register
              .component('adminDetail', module.AdminDetailComponent)
              .component('adminOutbox', module.AdminOutboxComponent)
              .component('adminActive', module.AdminActiveComponent)
              .component('adminPublic', module.AdminPublicComponent)
              .component('adminAdministrator', module.AdminAdministratorComponent)
              .component('adminBoughtDetail', module.AdminBoughtDetailComponent)
              .component('adminBuyingDetail', module.AdminBuyingDetailComponent)
              .component('adminDash', module.AdminDashComponent)
              .component('adminDatabase', module.AdminDatabaseComponent)
              .component('adminGuider', module.AdminGuideComponent)
              .component('adminInbox', module.AdminInboxComponent)
              .component('adminItemized', module.AdminItemizedComponent)
              .component('adminPermission', module.AdminPermissionComponent)
              .component('adminRecharge', module.AdminRechargeComponent)
              .component('adminRecord', module.AdminRecordComponent)
              .component('adminSellingDetail', module.AdminSellingDetailComponent)
              .component('adminSetting', module.AdminSettingComponent)
              .component('adminSoldDetail', module.AdminSoldDetailComponent)
              .component('adminStatistics', module.AdminStatisticsComponent)
              .component('adminTerms', module.AdminTermsComponent)
              .component('adminTransfer', module.AdminTransferComponent)
              .component('adminUnactive', module.AdminUnactiveComponent)
              .component('adminWithdrawals', module.AdminWithdrawalsComponent);

            registerAdmin = true;

            deferred.resolve(true);
          }, 'admin');
        } else {
          deferred.resolve(true);
        }
        return deferred.promise;
      }
    },
    $$child: {
      'admin.items': {
        url: '/:partial?:order?:query' + limit,
        params: defaultVal.params,
        views: {
          admin_items: {
            template: '<admin-items></admin-items>'
          }
        }
      },
      'admin.detail': {
        url: '/:partial/:sub?:username?',
        views: {
          admin_items: {
            template: '<admin-detail></admin-detail>'
          }
        }
      }
    }
  },
  404: {
    views: {
      main: {
        templateUrl: 'app/views/404.html'
      }
    }
  },
  error: {
    views: {
      main: {
        templateUrl: 'app/views/error.html'
      }
    }
  }
};

angular.forEach(router, (v)=> {
  if (v.url) {
    v.url = '/' + '{lang}' + v.url;
    v.params = {
      lang: {
        value: i18n.systemlang,
        squash: true
      }
    }
  }
});

export function routerConfig($locationProvider, $stateProvider, $urlRouterProvider, SETTINGS) {
  'ngInject';

  // html5支持
  $locationProvider.html5Mode(SETTINGS.html5Mode).hashPrefix('!');

  /**
   * 递归算法，无限层路由
   * @param route 遍历的配置项目
   */
  (function endLessRouter(route) {
    angular.forEach(route, function (config, stateName) {
      $stateProvider.state(stateName, config);
      config.$$child && endLessRouter(config.$$child);
    });
  })(router);

  $urlRouterProvider.otherwise(function ($injector, $location) {
    /**
     * http://www.xxx.com
     * 跳转到
     * http://www.xxx.com/#!/
     */
    let $state = $injector.get('$state');
    let path = $location.path();


    let isLang = false;
    i18n.supports.forEach((lang)=> {
      if (path.indexOf(lang) >= 1) {
        isLang = true;
      }
    });

    let target = '';
    let params = {};
    if (isLang) {
      target = 'home';
      params = {lang: path.replace(/^\/+/i, '')};
    } else {
      target = !$location.path() || $state.current.name === 'home' ? 'home' : '404';
    }

    $state.go(target, params);

  });
}
