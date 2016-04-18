export class SafeController {
  constructor($scope, $state) {
    'ngInject';

    let vm = this;

    if ($state.current.name === 'safe') $state.go('safe.home');
    
    $scope.$on('$stateChangeStart', (event, toState) => {
      if (toState.name === 'safe') {
        event.preventDefault();
        $state.go('safe.home');
      }
    });

    vm.sideBarData = [
      {title: '安全设置', partial: 'setting'},
      {title: '基本信息', partial: 'profile'},
      {title: '实名认证', partial: 'authentication'},
      {title: '消息', partial: 'message'}
    ];

  }
}
