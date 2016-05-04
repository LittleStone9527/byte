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


    $ctrl.$onInit = ()=> {

      getExchangeList();

    };

  }
};

export default AdminSettingComponent;