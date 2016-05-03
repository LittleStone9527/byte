let HeaderComponent = {
  templateUrl: 'app/components/header/header.html',
  controller ($scope, $state, $stateParams, lwUser) {
    'ngInject';

    $scope.$state = $state;

    $scope.lang = $stateParams.lang || null;

    $scope.$stateParams = $stateParams;

    $scope.navData = [
      {title: '首页', state: 'home', params: {lang: $scope.lang}},
      {title: '交易中心', state: 'trade.items', params: {partial: 'deal', lang: $scope.lang}},
      {title: '财务中心', state: 'finances.items', params: {partial: 'my', lang: $scope.lang}},
      {title: '安全中心', state: 'safe.items', params: {partial: 'setting', lang: $scope.lang}},
      {title: '资讯', state: 'news', params: {lang: $scope.lang}},
      {title: '新手指南', state: 'guide', params: {lang: $scope.lang}}
    ];

    $scope.lwUser = lwUser;
    $scope.profile = lwUser.profile;

  }
};

export {
  HeaderComponent
};
