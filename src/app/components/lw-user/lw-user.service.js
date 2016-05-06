export class LwUserService {
  constructor() {

  }

  $get($rootScope, $q, $state, SETTINGS, ngStore, lwApi) {
    'ngInject';

    let user = {};

    user.isAuth = false;          // 是否已登陆
    user.isAdmin = false;         // 是否是管理员
    user.profile = {};            // 用户资料
    user.trade = {};              // 交易信息
    user.wallets = [];            // 钱包列表信息
    user.loginActions = [];       // 登陆操作
    user.logoutActions = [];      // 登出操作
    user.tag = SETTINGS.sessionTag;

    /**
     * 用户注册
     * @param email
     * @param tel
     * @param password
     * @param nickname
     * @param captcha
     * @returns {*}
     */
    user.register = ({email=null, tel=null, password=null, nickname=email || tel, captcha=null})=> {
      let deferred = $q.defer();
      lwApi.user.signup.post({email, tel, nickname, password, captcha}).$promise
        .then(function (resp) {
          ngStore.set(user.tag, resp.headers[user.tag]);
          lwApi.init();
          deferred.resolve(resp);
          return user.getDetail();
        })
        .then(function () {
          $rootScope.$broadcast('signup');
        })
        .catch((error)=> {
          deferred.reject(error);
        })
        .finally(function () {
          $state.includes($state.current.name) ? $state.go('home') : $state.reload();
        });
      return deferred.promise;
    };

    /**
     * 触发登陆事件
     */
    user.loginTrigger = (resp) => {

      let data = resp;
      // 如果是登陆，会带headers
      if (resp.headers) {
        let session_key = user.tag;
        let session_value = resp.headers[session_key.toLowerCase()];
        ngStore.set(session_key, session_value);
        data = resp.data;
      }

      lwApi.init();

      user.isAuth = true;
      user.isAdmin = data.data.level === 100;

      user.profile = data.data;

      angular.forEach(user.loginActions, func=>angular.isFunction(func) && func());

    };

    user.login = ({username='', password='', captcha=''})=> {
      let deferred = $q.defer();
      if (!username || !password) {
        deferred.reject();
      } else {
        lwApi.user.login.post({username, password, captcha}).$promise
          .then(resp => {
            user.loginTrigger(resp);
            $rootScope.$broadcast('login');
            deferred.resolve(resp);
          }, error=> {
            deferred.reject(error);
          })
          .finally(function () {
            $state.reload();
          });
      }
      return deferred.promise;
    };

    /**
     * 触发登出事件
     */
    user.logoutTrigger = ()=> {

      user.isAuth = false;
      user.isAdmin = false;

      user.profile = {};

      user.wallets = [];

      ngStore.remove(user.tag);

      lwApi.init();

      angular.forEach(user.logoutActions, func=>angular.isFunction(func) && func());

    };

    user.logout = ()=> {
      let deferred = $q.defer();
      lwApi.user.logout.post().$promise
        .then(resp => {
          deferred.resolve(resp);
        }, error=> {
          deferred.reject(error);
        })
        .finally(()=> {
          user.logoutTrigger();
          $rootScope.$broadcast('logout');
          $state.reload();
        });
      return deferred.promise;
    };

    user.getSession = ()=> {
      let session = ngStore.get(user.tag);
      return !!session ? $q.resolve(session) : $q.reject();
    };

    user.getDetail = (username)=> {
      let deferred = $q.defer();

      if (!username) {
        // 获取自己的资料
        user.getSession()
          .then(() => {
            return lwApi.user.detail.get().$promise;
          })
          .then((resp)=> {
            user.loginTrigger(resp);
            deferred.resolve(resp);
          })
          .catch((error) => {
            console.info('fail get detail');
            user.logoutTrigger(error);
            deferred.reject(error);
          });
      } else {
        // 管理员获取他人的资料
        lwApi.user.manage.one.get({username}).$promise
          .then((resp)=>deferred.resolve(resp), (error)=>deferred.reject(error));
      }

      return deferred.promise;
    };

    user.getWallets = ()=> {
      let deferred = $q.defer();
      lwApi.user.wallet.list.get().$promise
        .then((resp)=> {
          user.wallets = resp.data;
          deferred.resolve(resp);
        }, (error)=>deferred.reject(error));
      return deferred.promise;
    };

    user.init = ()=> {
      user.getDetail();
      // 跨窗口
      ngStore.$watch(user.tag, function (newVal, oldVal) {
        // 登陆
        if (newVal && !oldVal) {
          user.getDetail();
        }
        // 登出
        else if (!newVal && oldVal) {
          user.logout();
        }
      });
    };

    return user;

  }
}