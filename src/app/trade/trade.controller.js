export class TradeController {
  constructor($scope, $state, $q, lwApi, lwUtil) {
    'ngInject';

    let vm = this;

    if ($state.current.name === 'trade') $state.go('trade.home');

    $scope.$on('$stateChangeStart', (event, toState) => {
      if (toState.name === 'trade') {
        event.preventDefault();
        $state.go('trade.home');
      }
    });

    vm.sideBarData = [
      {title: '卖出买入', partial: 'deal'},
      {title: '委托管理', partial: 'proxy'},
      {title: '交易记录', partial: 'record'}
    ];

    vm.tradeList = [];
    vm.tradeListMeta = lwUtil.initMeta();

    // 获取挂出的买卖交易列表
    function getTradeList() {
      let deferred = $q.defer();
      lwApi.stock.list.get().$promise
        .then((resp)=> {
          console.log(resp);
          vm.tradeList = resp.data;
          vm.tradeListMeta = resp.meta;
          deferred.resolve(resp);
        }, (error)=> deferred.reject(error));
      return deferred.promise;
    }

    getTradeList();

  }
}
