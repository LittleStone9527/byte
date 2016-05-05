export class LwApiService {
  constructor() {
  }

  $get($resource, SETTINGS, ngStore) {
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
      },
      // 交易
      deal: {

        /**
         * type
         *    0   支付
         *    1   收益
         *    2   充值
         *    3   提现
         *    4   换币
         *
         * status
         *    0   无效
         *    1   质疑
         *    2   处理中
         *    3   完成
         *    4   撤销
         *    5   拒绝
         */

        /**
         * 添加交易
         * method:[post]
         *
         * *type        // 非收益，非提现，非换币
         * *username    // 充值、提现可以不填
         * *currency    // 钱包currency
         * *money       // 非负数，非零
         * [tag]        // 最多16字节
         */
        api: $$('deal-api', '/api/v1/deal'),

        /**
         * 交易列表
         * method:[get]
         *
         *
         */
        list: $$('deal-list', '/api/v1/deal/list'),
        manage: {
          /**
           * 充值交易(管理员)
           * method:[post]
           *
           * *type        2 or 5
           * *username
           * *currency
           * *money
           * [tag]
           */
          api: $$('deal-man-recharge', '/api/v1/deal/manage'),
          /**
           * 交易列表(管理员)
           * method:[get]
           *
           * [username]
           */
          list: $$('deal-man-list', '/api/v1/deal/manage/list?username=:username'),
          /**
           * 确认交易(管理员)
           * method:[put]
           *
           * *status    1 or 3 or 4 or 5
           */
          confirm: $$('deal-man-confirm', '/api/v1/deal/manage/confirm?id=:id&status=:status')
        },
        /**
         * 确认交易
         * method:[put]
         *
         * *status    3 or 4
         */
        confirm: $$('deal-confirm', '/api/v1/deal/confirm?id=:id&status=:status')
      },
      // 汇率
      exchange: {
        /**
         * 创建汇率(管理员)
         * method:[post]
         *
         * *currency    货币，非FBC
         * *rate        浮点数，大于零，公式： 1FBC=货币rate
         *
         *
         * 获取指定汇率
         * method:[get]
         * [currency]   指定汇率
         */
        rate: $$('exchange-rate', '/api/v1/exchange/rate?currency=:currency'),
        /**
         * 获取汇率列表
         * method:[get]
         */
        list: $$('rate-list', '/api/v1/exchange/rate/list')
      },
      // 买卖交易
      stock: {
        /**
         * type
         *    0   买
         *    1   卖
         */

        /**
         * 挂出买卖交易(管理员)
         * method:[post]
         *
         * *type
         * *currency      交易币种
         * *stocks
         *      *amount   开放额度
         *      *start    起始时间
         * [limit]        限制购买额度
         * [count]        限制购买次数
         * [note]         备注
         * [start]        起始时间
         * [finish]       终止时间
         */
        api: $$('stock-api', '/api/v1/stock'),
        /**
         * 挂出的买卖交易列表
         * method:[get]
         */
        list: $$('stock-list', '/api/v1/stock/list'),
        /**
         * 创建买卖交易
         * method:[post]
         *
         * *num           买卖交易num
         * *currency      支付币种
         * *money         购买额度
         */
        deal: $$('stock-deal', '/api/v1/stock/deal'),
        /**
         * 买卖交易列表
         * method:[get]
         *
         * *MetaQuery         "num", "status", "created" // created: 例如20160427
         * *MetaOrder         "created"，推荐"-created"
         * *MetaLimit         limit <= 100
         */
        dealList: $$('stock-deal-list', '/api/v1/stock/deal/list'),

        manage: {
          /**
           * 买卖交易列表(管理员)
           */
          list: $$('stock-man-list', '/api/v1/stock/deal/manage/list?username=:username'),
          /**
           * 激活挂出的买卖交易(管理员)
           * method:[post]
           *
           * 撤销挂出的买卖交易(管理员)
           * method:[delete]
           */
          one: $$('stock-man-one', '/api/v1/stock/manage/one?num=:num '),
          confirm:$$('stock-man-confirm')
        }
      }
    };

  }
}