let TradeItemsComponent = {
  templateUrl($stateParams, $attrs){
    'ngInject';
    let tpl = $attrs.template || $stateParams.partial;
    return `app/components/trade-items/trade-${tpl}.html`;
  },
  controller($stateParams, $q, lwUtil, lwTrade, lwApi) {
    'ngInject';

    let $ctrl = this;

    $ctrl.stockList = [];
    $ctrl.stockListMeta = lwUtil.initMeta();
    $ctrl.latest = [];
    $ctrl.latestMeta = lwUtil.initMeta();

    let query = [
      {
        '%and': {
          // '%eq': {
          //   num: '160505154701',
          //   status: 0
          // },
          '%ne': {
            num: '0'
          }
        }
      },
      {
        '%o': ['-created']
      },
      {
        '%l': 10
      }
    ];

    $ctrl.$onInit = ()=> {
      switch ($stateParams.partial) {
        case 'deal':
          lwTrade.getStockList()
            .then((resp)=> {
              $ctrl.stockList = resp.data;
              $ctrl.stockListMeta = resp.meta;
            });

          // 最近交易记录
          // lwApi.stock.dealList.get({}, {
          //   headers: {
          //     'Meta-Query': JSON.stringify(query)
          //   }
          // }).$promise
          //   .then((resp)=> {
          //     $ctrl.latest = resp.data;
          //     $ctrl.latestMeta = resp.meta;
          //   }, (error)=> {
          //     console.error(error);
          //   });

          lwTrade.dealList(query)
            .then((resp)=> {
              $ctrl.latest = resp.data;
              $ctrl.latestMeta = resp.meta;
              console.log($ctrl.latest);
            });

          break;
        default:
      }
    };

  }
};

export default TradeItemsComponent;