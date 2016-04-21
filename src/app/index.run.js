export function runBlock($rootScope, $log, lwUser) {
  'ngInject';

  lwUser.init();

  $log.debug('runBlock end');

  $rootScope.$on('$stateNoFount', function () {

  });

}
