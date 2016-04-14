let router = {
  home: {
    url: '/',
    views: {
      main: {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }
    }
  },
  trade: {
    url: '/trade',
    views: {
      main: {
        templateUrl: 'app/trade/trade.html',
        controller: 'TradeController',
        controllerAs: 'trade'
      }
    }
  },
  finances: {
    url: '/finances',
    views: {
      main: {
        templateUrl: 'app/finances/finances.html',
        controller: 'FinancesController',
        controllerAs: 'fin'
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
      config.subState && endLessRouter(config.subState);
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

  $urlRouterProvider.otherwise('/');
}
