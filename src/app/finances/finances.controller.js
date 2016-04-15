export class FinancesController {
  constructor($scope, $state) {
    'ngInject';

    if ($state.current.name === 'finances') return $state.go('finances.home');

    $scope.$on('$stateChangeStart', (event, toState) => {
      if (toState.name === 'finances') {
        event.preventDefault();
        $state.go('finances.home');
      }
    });


  }
}
