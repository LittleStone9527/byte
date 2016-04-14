let router = {
  home: {
    url: '/',
    views: {
      main: {
        templateUrl: 'app/main/main.html',
        controller: 'MainController as Main'
      }
    }
  },
  trade: {
    url: '/trade',
    views: {
      main: {
        templateUrl: 'app/trade/trade.html',
        controller: 'TradeController as Trade'
      }
    },
    $$child: {
      'trade.items': {
        url: '/:partial',
        views: {
          trade_items: {
            templateUrl: 'app/components/trade-items/trade-items.html'
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
        controller: 'FinancesController as Fina'
      }
    }
  },
  safe: {
    url: '/safe',
    views: {
      main: {
        templateUrl: 'app/safe/safe.html',
        controller: 'SaveController as Save'
      }
    }
  },
  auth: {
    url: '/auth',
    abstract: true,
    views: {
      main: {
        templateUrl: 'app/auth/auth.html',
        controller: 'AuthController as Auth'
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
    console.log(target);
    $state.go(target);
  });

}
