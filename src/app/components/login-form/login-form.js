/**
 * Created by axetroy on 16-4-2.
 */


let LoginFormComponent = {
  templateUrl: 'app/components/login-form/login-form.html',
  controller: function ($q, $state, $timeout, lwUser, lwDialog, lwApi, lwUtil, ngStore, $resource) {
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {};

    $ctrl.captchaImageUrl = '';
    $ctrl.$$showCaptcha = false;

    /**
     * 登陆操作
     * @param loginForm
     */
    $ctrl.login = (loginForm)=> {
      let id = ngStore.get('captchaID');
      $ctrl.form.captcha = id + '.' + $ctrl.form.$$captcha;
      // new $resource('/api/v1/user/signin?captcha=:captcha')
      //   .post($ctrl.form).$promise
      //   .then(function () {
      //
      //   }, function () {
      //
      //   });
      lwUser.login($ctrl.form)
        .then(function () {
          lwDialog.success();
          return $state.go('home');
        }, function (resp) {
          lwDialog.error(resp.data.error);
        })
        .finally(()=>ngStore.remove('captchaID'));
    };

    /**
     * 获取验证码id
     * @returns {Promise}
     */
    $ctrl.getCaptchaId = ()=> {
      let id = ngStore.get('captchaID');
      return id ? $q.resolve(id) :
        lwApi.captcha.id.get().$promise
          .then((resp) => {
            id = resp.data;
            // 缓存 5 分钟
            ngStore.set('captchaID', id, 1000 * 60 * 5);
            return $q.resolve(id);
          }, (error)=> {
            ngStore.remove('captchaID');
            return $q.reject(error);
          })
    };

    /**
     * 获取验证码图片
     */
    $ctrl.getCaptchaImg = ()=> {
      $ctrl.getCaptchaId()
        .then((id)=> {
          $ctrl.captchaImageUrl = lwUtil.parseCaptchaImg(id);
          $ctrl.$$showCaptcha = true;
        }, ()=> {
          $ctrl.captchaImageUrl = '';
          ngStore.remove('captchaID');
          $ctrl.$$showCaptcha = false;
        });
    };

    /**
     * 刷新验证码
     */
    $ctrl.refreshCaptcha = ()=> {
      $ctrl.$$showCaptcha = false;
      $timeout(()=>$ctrl.$$showCaptcha = true, 200);
    };

    $ctrl.$onInit = ()=> {
      $ctrl.getCaptchaImg();
    };

  }
};

export default LoginFormComponent;
