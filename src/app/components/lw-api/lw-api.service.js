export class LwApiService {
  constructor() {
  }

  $get(lwResource, $resource, SETTINGS, $q, ngStore) {
    'ngInject';

    let $$ = $resource.register;

    let init = function () {
      // set host api;
      $resource.hosts = SETTINGS.hostApi;

      // cros
      $resource.withCredentials = true;

      // 拦截器
      $resource.interceptor = function (response) {
        if (!response || response.status >= 400 || response.data.error || !response.data.success || !response.data) {
          return $q.reject(response);
        } else {
          // 登陆，拿session
          if (response.headers[SETTINGS.sessionTag]) {
            return $q.resolve(response);
          } else {
            return $q.resolve(response.data);
          }
        }
      };

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
          email: $$('send-email', '/api/v1/user/check/send/email?method=:method&username=:username')
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