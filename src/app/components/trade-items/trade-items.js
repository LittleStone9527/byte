let TradeItemsComponent = {
  templateUrl($stateParams, $attrs){
    'ngInject';
    let tpl = $attrs.template || $stateParams.partial;
    return `app/components/trade-items/trade-${tpl}.html`;
  },
  controller($q, lwUtil, lwTrade) {
    'ngInject';

    let $ctrl = this;

    $ctrl.stockList = [];
    $ctrl.stockListMeta = lwUtil.initMeta();


    $ctrl.$onInit = ()=> {
      lwTrade.getStockList()
        .then((resp)=> {
          $ctrl.stockList = resp.data;
          $ctrl.stockListMeta = resp.meta;
        }, (error)=> {
          console.error(error);
        });
    };

  }
};

export default TradeItemsComponent;