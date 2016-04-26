export default class QueryService {
  constructor() {

  }
  $get(base64) {
    'ngInject';

    var $query = {
      parse: function (queryString) {
        let query = JSON.parse(queryString);
        angular.forEach(query, function (v, k) {
          if (/^00/.test(v)) {
            query[k] = base64.decode(v.replace(/^00/, ''));
          }
        });
        return query;
      },
      stringify: function (query) {
        let _query = angular.copy(query);
        angular.forEach(_query, function (v, k) {
          if (typeof v === 'object') {
            _query[k] = '00' + base64.encode(JSON.stringify(v));
          }
        });
        return JSON.stringify(_query);
      }
    };


    return $query;

  }
}