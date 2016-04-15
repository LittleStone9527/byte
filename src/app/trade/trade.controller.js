export class TradeController {
  constructor($scope, $state) {
    'ngInject';

    if ($state.current.name === 'trade') return $state.go('trade.home');

    $scope.$on('$stateChangeStart', (event, toState) => {
      if (toState.name === 'trade') {
        event.preventDefault();
        $state.go('trade.home');
      }
    });

  }
}
