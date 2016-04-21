export class LwUserService {
  constructor() {

  }

  $get($q, SETTINGS, ngStore, lwApi, lwResource, $resource) {
    'ngInject';

    let user = {};

    user.isAuth = false;          // 是否已登陆
    user.isUser = false;          // 普通用户
    user.isAdmin = false;         // 是否是管理员
    user.profile = {};            // 用户资料
    user.trade = {};              // 交易信息
    user.loginActions = [];       // 登陆操作
    user.logoutActions = [];      // 登出操作

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
          deferred.resolve(resp);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    /**
     * 触发登陆事件
     */
    function loginTrigger(resp) {

      let data = resp;
      // 如果是登陆，会带headers
      if (resp.headers) {
        let session_key = SETTINGS.sessionTag;
        let session_value = resp.headers[session_key];
        ngStore.set(session_key, session_value);
        data = resp.data;
      }

      user.isAuth = true;
      user.isUser = !user.isAdmin;

      user.profile = data.data;

      angular.forEach(user.loginActions, func=>angular.isFunction(func) && func());

    }

    user.login = ({username='', password='', captcha=''})=> {
      let deferred = $q.defer();
      if (!username || !password) {
        deferred.reject();
      } else {
        lwApi.user.login.post({username, password, captcha}).$promise
          .then(resp => {
            deferred.resolve(resp);
            loginTrigger(resp);
          }, error=> {
            deferred.reject(error);
          });
      }
      return deferred.promise;
    };

    /**
     * 触发登出事件
     */
    function logoutTrigger() {

      user.isAuth = false;
      user.isAdmin = false;
      user.isUser = !user.isAdmin;

      user.profile = {};

      ngStore.remove(SETTINGS.sessionTag);

      angular.forEach(user.logoutActions, func=>angular.isFunction(func) && func());
    }

    user.logout = ()=> {
      let deferred = $q.defer();
      lwApi.user.logout.post().$promise
        .then(resp => {
          deferred.resolve(resp);
        }, error=> {
          deferred.reject(error);
        })
        .finally(()=> {
          logoutTrigger();
        });
      return deferred.promise;
    };

    user.getSession = ()=> {
      let session = ngStore.get(SETTINGS.sessionTag);
      return !!session ? $q.resolve(session) : $q.reject();
    };

    user.getDetail = ()=> {
      let deferred = $q.defer();
      user.getSession()
        .then(function () {
          return lwApi.user.detail.get().$promise;
        })
        .then(function (resp) {
          deferred.resolve(resp);
          loginTrigger(resp)
        })
        .catch(function (error) {
          logoutTrigger(error);
          deferred.reject(error);
        });

      return deferred.promise;
    };

    user.init = ()=> {
      return user.getDetail();
    };

    return user;

  }
}