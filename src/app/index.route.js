let router = {
  home: {
    url: '/',
    views: {
      main: {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'Main'
      }
    }
  },
  trade: {
    url: '/trade',
    views: {
      main: {
        templateUrl: 'app/trade/trade.html',
        controller: 'TradeController',
        controllerAs: 'Trade'
      }
    },
    child: {
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
        controller: 'FinancesController',
        controllerAs: 'Fina'
      }
    }
  },
  safe: {
    url: '/safe',
    views: {
      main: {
        templateUrl: 'app/safe/safe.html',
        controller: 'SaveController',
        controllerAs: 'Save'
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
      config.child && endLessRouter(config.child);
    });
  })(router);

  $urlRouterProvider.otherwise(function ($injector, $location) {
    /**
     * http://www.xxx.com
     * 跳转到
     * http://www.xxx.com/#!/
     */
    let $state = $injector.get('$state');
    let target = !$location.path() || $state.current.name === "home" ? 'home' : '404';
    $state.go(target);
  });

}
