/**
 * Created by axetroy on 16-4-2.
 */


let googleCaptchaBindingDialogComponent = {
  templateUrl: 'app/components/google-captcha-binding-dialog/google-captcha-binding-dialog.html',
  controller: function ($scope) {
    'ngInject';
  
    $scope.closeThisDialog = ()=> {
      console.log('close');
      return $scope.$parent.closeThisDialog();
    };
  
    $scope.submit = ()=> {
  
    };
  
    $scope.cancel = ()=> {
  
    };
  
  }
};

export default googleCaptchaBindingDialogComponent;
