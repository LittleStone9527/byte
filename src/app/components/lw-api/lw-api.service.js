export class LwApiService {
  constructor() {
  }

  $get(lwResource, $resource, SETTINGS, $q, ngStore) {
    'ngInject';

    let $$ = $resource.register;

    let init = function () {
      $resource.headers = {
        [SETTINGS.sessionTag]: ngStore.get(SETTINGS.sessionTag) || null
      };
    };

    init();

    return {
      // 初始化
      init,
      user: {
        /**
         * 注册
         * method:[post]
         */
        signup: $$('user-signUp', '/api/v1/user/signup'),
        /**
         * 登陆
         * method:[post]
         */
        login: $$('user-login', '/api/v1/user/signin?captcha=:captcha'),
        /**
         * 登出
         * method:[post]
         */
        logout: $$('user-logou', '/api/v1/user/signout'),
        /**
         * 获取用户信息
         * method:[get]
         */
        detail: $$('user-detail', '/api/v1/user/detail'),
        /**
         * 验证
         */
        check: {
          // 发送验证码
          send: {
            /**
             method:

             signup
             signin login
             password
             info profile
             auth
             */
            email: $$('send-email', '/api/v1/user/check/send/email?method=:method&username=:username'),
            tel: $$('send-msg', '/api/v1/user/check/send/tel?method=:method&username=:username')
          },
          /**
           * 验证邮箱
           * method:[post]
           *
           * *email
           * *captcha
           */
          email: $$('check-email', '/api/v1/user/check/email'),
          /**
           * 验证手机
           * method:[post]
           *
           * *tel
           * *captcha
           */
          tel: $$('check-tel', '/api/v1/user/check/tel')
        },
        security: {
          /**
           * 修改密码
           * method:[put]
           *
           * *oldPassword
           * *newPassword
           */
          password: $$('pwd-reset', '/api/v1/user/security/password'),
          /**
           * method:[post]
           * *username
           * *captcha
           * *password
           */
          forget: $$('pwd-forget', '/api/v1/user/security/forget')
        }
      },
      captcha: {
        /**
         * 获取图片验证码
         * method:[get]
         */
        id: $$('captcha-id', '/api/v1/captcha/id')
      }
    };

  }
}