/**
 * Created by axetroy on 16-4-2.
 */


let AuthForgetComponent = {
  templateUrl: 'app/components/auth-forget/auth-forget.html',
  controller: function ($timeout, $interval, lwApi, lwDialog) {
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {};

    $ctrl.way = 2;                        // 默认显示邮箱找回

    let CAPTCHA_INTERVAL = 60;             // 验证码发送间隔，计时器
    $ctrl.isSending = false;              // 是否正在发送
    $ctrl.sendCodeBtnText = '发送验证码';   // 发送验证码按钮的字
    $ctrl.hasSended = false;

    // 发送验证码
    $ctrl.sendCaptcha = function () {

      if ($ctrl.isSending) return;

      $ctrl.isSending = true;
      lwApi.user.check.send.email.save({
        method: 'password',
        username: $ctrl.form.username
      }).$promise
        .then(function () {
          let $$CAPTCHA_INTERVAL = CAPTCHA_INTERVAL;
          $interval(function () {
            if ($$CAPTCHA_INTERVAL <= 0) {
              $ctrl.sendCodeBtnText = "发送验证码";
              $ctrl.isSending = false;
            } else {
              $ctrl.sendCodeBtnText = '重新发送' + '(' + --$$CAPTCHA_INTERVAL + ')';
            }
          }, 1000, CAPTCHA_INTERVAL + 1);
          $ctrl.hasSended = true;
        }, function () {
          debugger;
          $ctrl.sendCodeBtnText = "发送失败";
          $timeout(function () {
            $ctrl.sendCodeBtnText = "发送验证码";
          }, 2000);
          $ctrl.hasSended = false;
        });
    };

    // 提交表单
    $ctrl.submit = function (form) {
      lwApi.user.security.forget.save({
        username: $ctrl.form.username,
        password: $ctrl.form.password,
        captcha: $ctrl.form.captcha
      }).$promise
        .then(function () {
          lwDialog.success();
          return $state.go('auth.login');
        }, (resp)=>lwDialog.error(resp.data.error));
    };

  }
};

export default AuthForgetComponent;
