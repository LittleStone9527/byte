/**
 * Created by axetroy on 16-4-14.
 */

const SETTINGS = {
  // 基本设置
  lang: "zh-CN",                                 // 当前语言
  isDebug: true,                              // 调试模式, 输出信息
  isProduct: false,                           // 生产模式
  isCors: true,                               // 是否跨域请求api
  sessionTag: "Authorization",                // session
  html5Mode: false,                            // html5 url模式
  isMobile: false,                            // 当前是否为移动端
  serverCanProxy: true,                       // 服务器是否能访问外部网络
  host: window.location.host,                 // 当前host
  hostApi: 'http://192.168.199.219:1005',     // api host
  // hostApi: 'http://222.216.131.244:1005',         // api host
  // hostApi: 'http://office.yichui.net:1005',         // api host
  hostImgLis: [                               // 图片服务器 阿里云
    ''
  ],
  hostImgLisLocal: [                          // 图片服务器 本地
    ''
  ],
  secureUrl: "admin",                         // 管理员地址
  isInit: false,                              // SETTINGS是否已初始化

  // 正则相关: 与后台要一致
  reg: {
    //email: /^([^@]+@[^@]+\.[^@]+)?$/,                     // 邮箱匹配
    tel: /^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/,             // 电话匹配
    email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,         // 邮箱匹配
    password: /^.{6,}$/,                                    // 密码匹配

    '': ''
  },

  // 初始化
  init: function (cmd) {

    if (SETTINGS.isInit || cmd !== "force") {
      return;
    }
    // 预判断窗口大小
    SETTINGS.isMobile = $(window).width() < 768;


    // 自动添加base href
    if (SETTINGS.html5Mode) {
      $('head').append('<base href="/" />');
    }

    // 生产模式下
    if (SETTINGS.isProduct) {
      SETTINGS.hostImgLisLocal = [];
    }

  },

  '': ''
};

// 初始化
SETTINGS.init('force');

// 冻结SETTINGS,不可写,不可改,不可删
if (!!Object.freeze) Object.freeze(SETTINGS);

export {SETTINGS};