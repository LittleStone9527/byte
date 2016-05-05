/**
 * Created by axetroy on 16-4-27.
 */

let AdminSettingComponent = {
  template: require('./admin-setting.html'),
  controller($q, lwApi, lwUtil, lwDialog, lwTrade){
    'ngInject';

    let $ctrl = this;

    $ctrl.exchangeList = [];
    $ctrl.exchangeListMeta = lwUtil.initMeta();

    $ctrl.form = {
      // 汇率
      ex: [
        {
          currency: 'USD',
          rate: 0
        }
      ]
    };

    $ctrl.hand = {};

    $ctrl.setExchange = ({currency, rate}={})=> {
      var deferred = $q.defer();
      if (!currency || !rate) return false;
      lwApi.exchange.rate.post({currency, rate}).$promise
        .then((resp)=> {
          lwDialog.success();
          deferred.resolve(resp);
        }, (error)=> {
          lwDialog.error();
          deferred.reject(error);
        });
      return deferred.promise;
    };

    // 获取汇率列表
    function getExchangeList() {
      let deferred = $q.defer();
      lwApi.exchange.list.get().$promise
        .then((resp)=> {
          $ctrl.exchangeList = resp.data || [];
          $ctrl.exchangeListMeta = resp.meta;
          deferred.resolve(resp);
        }, (error)=> {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    // 获取已挂出的交易列表
    function getStockList() {
      let deferred = $q.defer();
      lwTrade.getStockList()
        .then((resp) => {
          $ctrl.stockList = resp.data;
          $ctrl.stockListMeta = resp.meta;
          deferred.resolve(resp);
        }, (error)=>deferred.reject(error));
      return deferred.promise;
    }

    // 提交所有配置
    $ctrl.submit = function (data) {

      let {currency, rate} = data.ex[0];

      $ctrl.setExchange({currency, rate: rate * 1});
    };

    // 手动挂出交易
    $ctrl.addTrade = (form)=> {
      let data = $ctrl.hand;
      lwTrade.stock({
          type: data.type * 1,
          currency: data.currency,
          stocks: [
            {amount: 10000, start: '201605051025'},
            {amount: 20000, start: '201605051125'},
            {amount: 30000, start: '201605051225'}
          ],
          price: data.price * 1,
          // 'limit': 8000,
          // 'count': 10,
          // 'note': '',
          start: data.start || '201605011225',
          finish: data.finish || '201605201225'
        })
        .then(()=> {
          $ctrl.hand = {};
          form.$setPristine();
          return getStockList();
        }, (error)=> {
          lwDialog.error(error.data.error);
        });
    };


    // 手动撤销挂出的交易
    $ctrl.removeStock = (num)=> {
      lwDialog.confirm()
        .then(()=> {
          return lwTrade.removeStock(num);
        })
        .then(()=> {
          lwDialog.success('Remove Success');
          return getStockList();
        });
    };

    // 激活交易
    $ctrl.activeStock = ()=> {

    };

    $ctrl.$onInit = ()=> {

      getExchangeList();

      getStockList();

    };

  }
};

export default AdminSettingComponent;