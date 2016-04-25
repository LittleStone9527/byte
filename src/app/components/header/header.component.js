let HeaderComponent = {
  templateUrl: 'app/components/header/header.html',
  controller: function ($scope, $state, lwUser) {
    'ngInject';

    $scope.$state = $state;

    $scope.navData = [
      {title: '首页', state: 'home'},
      // {title: '交易中心', state: 'trade'},
      {title: '交易中心', state: 'trade.items', params: {partial: 'deal'}},
      // {title: '财务中心', state: 'finances'},
      {title: '财务中心', state: 'finances.items', params: {partial: 'my'}},
      //{title: '安全中心', state: 'safe'},
      {title: '安全中心', state: 'safe.items', params: {partial: 'setting'}},
      {title: '资讯', state: 'news'},
      {title: '新手指南', state: 'guide'}
    ];

    $scope.lwUser = lwUser;
    $scope.profile = lwUser.profile;

  }
};

export {
  HeaderComponent
};
