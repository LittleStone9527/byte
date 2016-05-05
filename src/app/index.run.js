// import i18n from './lang';

export function runBlock($rootScope, $state, $moment, lwUser) {
  'ngInject';

  lwUser.init();

  $rootScope.$on('$stateNoFount', () =>$state.go('404'));

  $rootScope.$on('$stateChangeError', ()=> $state.go('error'));

  $moment.locale('zh-CN');


}
