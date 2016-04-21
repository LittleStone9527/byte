let HeaderComponent = {
  templateUrl: 'app/components/header/header.html',
  controller: function ($scope, $state, lwUser) {
    'ngInject';

    $scope.$state = $state;

    $scope.navData = [
      {title: '首页', state: 'home'},
      {title: '交易中心', state: 'trade'},
      {title: '财务中心', state: 'finances'},
      {title: '安全中心', state: 'safe'}
    ];

    $scope.lwUser = lwUser;
    $scope.profile = lwUser.profile;

  }
};

export {
  HeaderComponent
};