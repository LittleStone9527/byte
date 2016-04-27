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
        /**
         * 安全方面
         */
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
        },
        /**
         * 钱包
         */
        wallet: {
          /**
           * 用户钱包信息
           * method:[get]
           *
           * *currency    USD or FBC
           */
          info: $$('wallet-info', '/api/v1/user/wallet?currency=:currency'),
          /**
           * 用户钱包列表
           * method:[get]
           */
          list: $$('wallet-list', '/api/v1/user/wallet/list')
        },
        /**
         * 用户管理
         */
        manage: {
          /*
           state

           0 无效
           1 冻结
           2 激活
           3 警告

           */
          /**
           * 获取用户信息(管理员)
           * method:[get]
           *
           * *username
           */
          one: $$('user-one', '/api/v1/user/manage/one?username=:username'),
          /**
           * 获取用户列表
           * method:[get]
           *
           * *MetaQuery     "state"
           * *MetaOrder     "state"   "created"
           */
          list: $$('user-list', '/api/v1/user/manage/list'),
          /**
           * 用户状态管理
           * method:[put]
           *
           * *username
           * *state         不修改则填-1
           * *level         不修改则填-1
           * *limit         不修改则填-1
           */
          state: $$('user-state', '/api/v1/user/manage/state'),
          /**
           * 用户信息管理(管理员)
           * method:[put]
           *
           * *username
           *
           * [tel]
           * [email]
           * [password]
           * 以上选填至少选择一种
           */
          profile: $$('user-profile', '/api/v1/user/manage/profile')
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