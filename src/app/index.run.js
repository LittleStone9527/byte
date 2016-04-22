export function runBlock($rootScope, $log, lwUser, lwApi, $resource) {
  'ngInject';

  lwUser.init();

  $log.debug('runBlock end');

  $rootScope.$on('$stateNoFount', function () {

  });

}
