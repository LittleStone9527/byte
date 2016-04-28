export default function SlideDirective() {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      status: '=',
      target: '@',
      hideClass: '@',
      extendClass: '@'
    },
    link: ($scope, $element)=> {
      let $target = angular.element($scope.target);

      if (!$scope.status) {
        $target.hide();
        if ($scope.hideClass) $element.addClass($scope.hideClass);
      } else {
        if ($scope.extendClass) $element.addClass($scope.extendClass);
      }

      $element.click(function () {
        $target = angular.element($scope.target);
        if ($scope.status) {
          if ($scope.hideClass) $element.addClass($scope.hideClass);
          if ($scope.extendClass) $element.removeClass($scope.extendClass);
          $target.slideUp();
        } else {
          if ($scope.extendClass) $element.addClass($scope.extendClass);
          if ($scope.hideClass) $element.removeClass($scope.hideClass);
          $target.slideDown();
        }
        $scope.status = !$scope.status;
      });

    }
  }
}