export default class QueryService {
  constructor() {

  }

  $get(base64) {
    'ngInject';

    var $query = {
      /**
       * 查询字符串    string
       * @param queryString:string
       * @returns {{object}}
       */
      parse: function (queryString) {
        // let query = JSON.parse(queryString);
        // angular.forEach(query, function (v, k) {
        //   // 以00开头，表示是经过base64加密的
        //   if (/^00/.test(v)) query[k] = base64.decode(v.replace(/^00/, ''));
        // });

        // 以00开头，表示是经过base64加密的
        let query = {};
        if (/^00/.test(queryString)) {
          query = JSON.parse(base64.decode(queryString.replace(/^00/, '')));
        }

        return query;
      },
      /**
       * 接续查询字符串
       * @param query
       * @returns {string}
       */
      stringify: function (query) {
        // let _query = angular.copy(query);
        // angular.forEach(_query, function (v, k) {
        //   //
        //   if (typeof v === 'object') _query[k] = '00' + base64.encode(JSON.stringify(v));
        // });

        return '00' + base64.encode(JSON.stringify(query));
      }
    };


    return $query;

  }
}