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

  }
}
