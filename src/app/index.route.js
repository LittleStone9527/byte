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
    $$child: {
      'trade.home': {
        views: {
          trade_items: {
            templateUrl: 'app/components/trade-items/trade-home.html'
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
    $$child: {
      'finances.home': {
        views: {
          fin_items: {
            templateUrl: 'app/components/finances-items/finances-home.html'
          }
        }
      },
      'finances.items': {
        url: '/:partial',
        views: {
          fin_items: {
            template: '<finances-items></finances-items>'
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
    $$child: {
      'auth.register': {
        url: '/register?:from?',
        views: {
          auth_items: {
            template: '<register-form></register-form>'
          }
        }
      },
      'auth.login': {
        url: '/login',
        views: {
          auth_items: {
            template: '<login-form></login-form>'
          }
        }
      },
      'auth.forget': {
        url: '/forget',
        views: {
          auth_items: {
            template: '<forget-pwd-form></forget-pwd-form>'
          }
        }
      },
      'auth.active': {
        url: '/active',
        views: {
          auth_items: {
            template: '<active-form></active-form>'
          }
        }
      }
    }
  },
  admin: {
    url: '/admin',
    views: {
      main: {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController as vm'
      }
    },
    $$child: {
      'admin.items': {
        url: '/:partial',
        views: {
          admin_items: {
            template: '<admin-items></admin-items>'
          }
        }
      }
    }
  },
  404: {
    views: {
      main: {
        templateUrl: '404.html'
      }
    }
  },
  error: {
    views: {
      main: {
        templateUrl: 'error.html'
      }
    }
  }
};

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
    let target = !$location.path() || $state.current.name === 'home' ? 'home' : '404';
    $state.go(target);
  });

}
