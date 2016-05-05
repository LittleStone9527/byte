/**
 * Created by axetroy on 16-4-27.
 */

let AdminSettingComponent = {
  template: require('./admin-setting.html'),
  controller($q, lwApi, lwUtil, lwDialog){
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

    // 提交所有配置
    $ctrl.submit = function (data) {

      let {currency, rate} = data.ex[0];

      $ctrl.setExchange({currency, rate: rate * 1});
    };


    // 手动挂出交易
    $ctrl.addTrade = (data)=> {
      lwApi.stock.api.post({
        type: Number(data.type),
        currency: data.currency,
        // stocks: {
        //   amount: 10000,
        //   start: '201605051010'
        // },
        stocks: [
          10000, '201605051010'
        ],
        price: data.price * 1,
        start: '201605051010',
        finish: '201605203010'
      }).$promise
        .then((resp)=> {
          console.log(resp);
        }, (err)=> {
          console.error(err);
        });
    };

    $ctrl.$onInit = ()=> {

      getExchangeList();

    };

  }
};

export default AdminSettingComponent;