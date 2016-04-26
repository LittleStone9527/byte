export function runBlock($rootScope, $log, $moment, lwUser) {
  'ngInject';

  lwUser.init();

  $log.debug('runBlock end');

  $rootScope.$on('$stateNoFount', function () {
    $state.go('404');
  });

  $moment.locale('zh-cn');

}
