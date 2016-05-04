export default class LwTradeService {
  constructor() {

  }

  $get($q, lwApi) {
    'ngInject';

    let trade = {};

    trade.list = [];      // 交易列表

    trade.getList = (...agms)=> {
      let deferred = $q.defer();
      lwApi.deal.list.get(...agms).$promise
        .then((resp)=> {
          trade.list = resp.data || [];
          deferred.resolve(resp);
        }, (error)=> deferred.reject(error));
      return deferred.promise;
    };

    return trade;

  }
}