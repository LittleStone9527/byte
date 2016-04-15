let HeaderComponent = {
  templateUrl: 'app/components/header/header.html',
  controller: function ($scope, $state, $stateParams) {
    'ngInject';

    $scope.$state = $state;
    console.log($state.includes('trade'));

    $scope.navData = [
      {title: '首页', state: 'home'},
      {title: '交易中心', state: 'trade'},
      {title: '财务中心', state: 'finances.home'},
      {title: '安全中心', state: 'safe'}
    ];

  }
};

export {
  HeaderComponent
};