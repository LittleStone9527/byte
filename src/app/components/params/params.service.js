export default class QueryService {
  constructor() {

  }

  $get(base64) {
    'ngInject';

    let $params = {
      keys: function (object = {}) {
        if (!object) return [];
        return Object.keys(object);
      },
      /**
       * 解析$stateParams，返回json对象
       * @param _$stateParams
       * @returns {*}
       */
      decode: function (_$stateParams = {}) {
        let _params = angular.copy(_$stateParams);
        angular.forEach(_params, function (value, key) {
          if (/^00/.test(value)) {
            let decode = base64.decode(value.replace(/^00/, ''));
            let val = '';
            try {
              val = JSON.parse(decode);
            } catch (e) {
              val = decode;
            }
            _params[key] = val;
          }
        });
        return _params;
      },
      /**
       * 解析由decode转化好的json对象，返回字符串，放入headers里面
       * @param params
       * @returns {string}
       */
      transform: function (params = {}) {
        if (!params) return params;
        if (!$params.keys(params).length) return '';

        let collection = [];

        let query = {};
        let order = {};
        let limit = {};
        angular.forEach(params, function (value, key) {

          if (/^\s*(limit|page|skip)\s*$/.test(key)) {
            limit[key] = value;
          }
          else if (key === 'query') {
            query = value;
          }
          else if (key === 'order') {
            order = value;
          }

        });

        if ($params.keys(query).length) collection.push(query);
        if ($params.keys(order).length) collection.push(order);
        if ($params.keys(limit).length) collection.push(limit);

        return JSON.stringify(collection);

      }
    };

    return $params;

  }
}