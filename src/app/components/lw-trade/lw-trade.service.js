export default class LwTradeService {
  constructor() {

  }

  $get($q, lwApi) {
    'ngInject';

    let trade = {};

    trade.list = [];          // 交易列表
    trade.stocks = [];        // 已挂出的交易列表

    trade.getList = (...agms)=> {
      let deferred = $q.defer();
      lwApi.deal.list.get(...agms).$promise
        .then((resp)=> {
          trade.list = resp.data || [];
          deferred.resolve(resp);
        }, (error)=> deferred.reject(error));
      return deferred.promise;
    };

    // 管理员挂出交易
    trade.stock = (config)=> {
      let deferred = $q.defer();
      lwApi.stock.api.post(config).$promise
        .then((resp)=>deferred.resolve(resp), (error)=>deferred.reject(error));
      return deferred.promise;
    };

    // 获取已挂出的交易列表
    trade.getStockList = ()=> {
      let deferred = $q.defer();
      lwApi.stock.list.get().$promise
        .then((resp)=> {
          trade.stocks = resp.data;
          deferred.resolve(resp);
        }, (error)=> {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    // 创建买卖交易
    trade.deal = ({num, price, count})=> {
      let deferred = $q.defer();
      lwApi.stock.deal.post({num, price, count}).$promise
        .then((resp)=> {
          deferred.resolve(resp);
        }, (error)=> {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    trade.removeStock = (num)=> {
      let deferred = $q.defer();
      lwApi.stock.manage.one.remove({num}).$promise
        .then((resp)=>deferred.resolve(resp), (error)=>deferred.reject(error));
      return deferred.promise;
    };

    return trade;

  }
}