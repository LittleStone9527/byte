/**
 * Created by axetroy on 16-4-2.
 */


let telBindingDialogComponent = {
  templateUrl: 'app/components/tel-binding-dialog/tel-binding-dialog.html',
  controller: function ($scope) {
    'ngInject';

    $scope.closeThisDialog = ()=> {
      return $scope.$parent.closeThisDialog();
    };

  }
};

export default telBindingDialogComponent;
