export function DragPickDirective() {
  'ngInject';
  return {
    restrict: 'E',
    // replace:true,
    scope: {
      percent: '=percentModel'
    },
    templateUrl: 'app/components/drag-pick/drag-pick.html',
    link: ($scope, $element)=> {

      $scope.$width = '50%';

      $scope.percent = $scope.percent || 50;

      let containerWidth = $element.find('div').eq(0).width();

      $element.bind('click', function (e) {
        containerWidth = $element.find('div').eq(0).width();
        let percent = e.offsetX / containerWidth;
        $scope.$apply(function () {
          $scope.$width = percent * 100 + '%';
          $scope.percent = parseInt(percent * 100, 10);
        });
      });

      $element.bind('mousedown', function () {

        $element.bind('mousemove', function (e) {
          containerWidth = $element.find('div').eq(0).width();
          let percent = e.offsetX / containerWidth;
          $scope.$apply(function () {
            $scope.$width = percent * 100 + '%';
            $scope.percent = parseInt(percent * 100, 10);
          });
        });

        $element.bind('mouseup', function () {
          $element.unbind('mousemove');
        });

        return false;

      });

      let watcher = $scope.$watch('percent', function (newVal) {
        $scope.$width = newVal + '%';
      });

      $scope.$on('$destroy', function () {
        watcher && angular.isFunction(watcher) && watcher();
      });

    }
  }
}