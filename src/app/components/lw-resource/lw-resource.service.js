export class LwResourceService {
  constructor() {

  }

  $get($q, $resource, SETTINGS, ngStore) {
    'ngInject';
    // rest二次封装
    var resource = function (url, paramDefaults, actions, options) {
      // Don't strip trailing slashes from calculated URLs
      options = angular.extend({stripTrailingSlashes: false}, options);
      actions = angular.extend({
        // 重写方法
        'get': {method: 'GET', isArray: false, interceptor: resource.interceptor, headers: resource.headers},
        'post': {method: 'POST', isArray: false, interceptor: resource.interceptor, headers: resource.headers},
        'put': {method: 'PUT', isArray: false, interceptor: resource.interceptor, headers: resource.headers},
        'delete': {method: 'DELETE', isArray: false, interceptor: resource.interceptor, headers: resource.headers},
        // 重写query部分 isArray
        'query': {
          method: 'GET', isArray: true, interceptor: resource.interceptor, headers: resource.headers,
          transformResponse: function (data, headersGetter) {
            data = angular.fromJson(data);
            if (!data.error) {
              data = data.data;
            } else {
              data = [];
            }
            return data;
          }
        },
        'fetch': {method: 'GET', isArray: false, interceptor: resource.interceptor, headers: resource.headers},

        'save': {method: 'POST', isArray: false, interceptor: resource.interceptor, headers: resource.headers},
        'remove': {method: 'DELETE', isArray: false, interceptor: resource.interceptor, headers: resource.headers},
        // 添加update方法
        'update': {method: 'PUT', isArray: false, interceptor: resource.interceptor, headers: resource.headers},
        // 添加create方法
        'create': {method: 'POST', isArray: false, interceptor: resource.interceptor, headers: resource.headers}
      }, actions);
      return $resource(url, paramDefaults, actions, options);
    };

    resource.init = function (session) {
      session = session ? session : ngStore.get(SETTINGS.sessionTag);
      resource.headers[SETTINGS.sessionTag] = session;
    };

    // 所有api
    resource.q = {};

    // 取api
    resource.get = function (key) {
      return resource.q[key];
    };

    // headers
    resource.headers = {};

    // response handler
    resource.interceptor = {
      response: function (response) {
        if (!response.data) return $q.reject(response);

        if (response.data && response.data.result === false) {
          return $q.reject(response.data);
        }
        else if (response.data) {
          // 返回404页面
          if (angular.isString(response.data) && /<html\s?\S*/ig.test(response.data)) {
            return $q.reject(response);
          }
          else {
            return $q.resolve(response.data);
          }
        }
        else {
          return response;
        }
      },
      responseError: function (response) {
        if (!response.data || !response.status === -1) {
          return $q.reject(response);
        } else if (!!response.data && !!response.result) {
          return $q.resolve(response);
        }
      }
    };

    // handler error
    resource.handlerError = function () {
    };

    // 注册api
    resource.register = function (key, url, paramDefaults, actions, options) {
      // CORS
      if (SETTINGS && SETTINGS.isCors && SETTINGS.hostApi) {
        url = SETTINGS.hostApi + url;
      }
      var ret;
      if (key && url) {
        resource.q[key] = resource(url, paramDefaults, actions, options);
        ret = resource.q[key];
      }
      return ret;
    };

    return resource;
  }
}