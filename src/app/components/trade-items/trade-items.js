let TradeItemsComponent = {
  templateUrl($stateParams, $attrs){
    'ngInject';
    let tpl = $attrs.template || $stateParams.partial;
    return `app/components/trade-items/trade-${tpl}.html`;
  },
  controller($q, lwApi, lwUtil) {
    'ngInject';

    let $ctrl = this;

    $ctrl.stockList = [];
    $ctrl.stockListMeta = lwUtil.initMeta();

    function getStock() {
      let deferred = $q.defer();
      lwApi.stock.list.get().$promise
        .then((resp)=> {
          $ctrl.stockList = resp.data;
          $ctrl.stockListMeta = resp.meta;
          deferred.resolve(resp);
        }, (err)=> {
          deferred.reject(err);
        });
      return deferred.promise;
    }

    $ctrl.$onInit = ()=> {
      getStock();
    };

  }
};

export default TradeItemsComponent;