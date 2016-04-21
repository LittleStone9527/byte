export function ToggleDirective() {
  'ngInject';
  return {
    restrict: 'E',
    replace: true,
    scope: {
      _width: '=width',
      _height: '=height'
    },
    templateUrl: 'app/components/animate-toggle/toggle.html',
    link: function ($scope, $element) {

      $scope.width = $scope._width ? $scope._width : 500;

      $scope.height = $scope._height ? $scope._height : 200;

      let $extend = $element.find('.child-menu');

      $element.bind('mouseenter', function () {
        $extend.show().stop().animate({height: $scope.height}, 'fast');
        return false;
      });

      $element.bind('mouseleave', function () {
        $extend.stop().animate({height: 0}, 'fast', function () {
          $(this).hide();
        });
        return false;
      });


    }
  }
}