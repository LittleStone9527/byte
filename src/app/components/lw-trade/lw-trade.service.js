export default class LwTradeService {
  constructor() {

  }

  $get($q, lwApi,SETTINGS) {
    'ngInject';

    let trade = {};

    const moneyTimes = SETTINGS.TIMES;

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
          angular.forEach(resp.data, (item)=> {
            item.amount = item.amount / moneyTimes;
            item.balance = item.balance / moneyTimes;
            item.price = item.price / moneyTimes;
          });
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

    trade.dealList = (metaQuery)=> {
      // 最近交易记录
      return lwApi.stock.dealList.get({}, {headers: {'Meta-Query': JSON.stringify(metaQuery)}}).$promise;
    };

    trade.removeStock = (num)=> {
      let deferred = $q.defer();
      lwApi.stock.manage.one.remove({num}).$promise
        .then(resp=>deferred.resolve(resp), error=>deferred.reject(error));
      return deferred.promise;
    };

    // 申请提现
    trade.draw = (data)=> {
      return lwApi.deal.draw.api.post(data).$promise
        .then(resp=>$q.resolve(resp), error=>$q.reject(error));
    };

    // 提现列表
    trade.drawList = ()=> {

    };

    // 管理员获取提现列表
    trade.drawListAdmin = ()=> {

    };

    return trade;

  }
}