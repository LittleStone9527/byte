export class FinancesController {
  constructor($scope, $state) {
    'ngInject';

    let vm = this;

    if ($state.current.name === 'finances') $state.go('finances.home');

    $scope.$on('$stateChangeStart', (event, toState) => {
      if (toState.name === 'finances') {
        event.preventDefault();
        $state.go('finances.home');
      }
    });

    vm.sideBarData = [
      {title: '美元充值', partial: 'recharge'},
      {title: '美元提现', partial: 'withdrawals'},
      {title: '个人财务', partial: 'my'},
      {title: '委托管理', partial: 'proxy'},
      {title: '会员转账', partial: 'transfer'}
    ];

  }
}
