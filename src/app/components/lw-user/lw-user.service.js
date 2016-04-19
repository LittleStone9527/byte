export class LwUserService {
  constructor() {

  }

  $get($q, SETTINGS, ngStore, lwApi, lwResource) {
    'ngInject';

    let user = {};

    user.isAuth = false;          // 是否已登陆
    user.isUser = false;          // 普通用户
    user.isAdmin = false;         // 是否是管理员
    user.profile = {};            // 用户资料
    user.trade = {};              // 交易信息
    user.loginActions = [];       // 登陆操作
    user.logoutActions = [];      // 登出操作

    user.register = ({username='', password='', captcha=''})=> {
      let deferred = $q.defer();
      if (!username || !password) {
        deferred.reject();
      } else {
        lwApi.user.register.post({username, password, captcha}).$promise
          .then(resp => {
            deferred.resolve(resp);
            logoutTrigger();
          }, error=> {
            deferred.reject(error);
          });
      }
      return deferred.promise;
    };

    /**
     * 触发登陆事件
     */
    function loginTrigger(resp) {
      lwResource.set(SETTINGS.sessionTag, 'Bearer ' + resp.session);

      lwResource.init('Bearer ' + resp.session);

      user.isAuth = true;
      user.isUser = !user.isAdmin;

      user.profile = resp.data;

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
            logoutTrigger();
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
      user.trade = {};
      user.th3 = undefined;

      ngStore.remove(SETTINGS.sessionTag);

      lwResource.init(null);

      angular.forEach(user.logoutActions, func=>angular.isFunction(func) && func());
    }

    user.logout = ()=> {
      let deferred = $q.defer();
      lwApi.user.logou.post().$promise
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

    user.getDetail = ()=> {
      let deferred = $q.defer();
      lwApi.user.info.get().$promise
        .then(resp => {
          deferred.resolve(resp);
          loginTrigger(resp)
        }, error=> {
          logoutTrigger(error);
          deferred.reject(error);
        });
      return deferred.promise;
    };

    return user;

  }
}