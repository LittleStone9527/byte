/**
 * Created by axetroy on 16-4-2.
 */


let googleCaptchaBindingDialogComponent = {
  templateUrl: 'app/components/google-captcha-binding-dialog/google-captcha-binding-dialog.html',
  controller: function ($scope) {
    'ngInject';

    $scope.closeThisDialog = ()=> {
      return $scope.$parent.closeThisDialog();
    };

  }
};

export default googleCaptchaBindingDialogComponent;
