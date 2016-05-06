let TradeItemsComponent = {
  templateUrl($stateParams, $attrs){
    'ngInject';
    let tpl = $attrs.template || $stateParams.partial;
    return `app/components/trade-items/trade-${tpl}.html`;
  },
  controller($scope, $state, $stateParams, $q, lwUtil, lwTrade, SETTINGS, lwUser) {
    'ngInject';

    let $ctrl = this;

    const moneyTimes = SETTINGS.TIMES;

    $ctrl.stockList = [];
    $ctrl.stockListMeta = lwUtil.initMeta();
    $ctrl.latest = [];
    $ctrl.latestMeta = lwUtil.initMeta();

    let query = [
      {
        '%and': {
          '%ne': {
            num: '0'
          }
        }
      },
      {
        '%o': ['-created']
      },
      {
        '%l': $ctrl.latestMeta.limit || 10,
        '%p': $ctrl.latestMeta.page || 0,
        '%s': $ctrl.latestMeta.skip || 0
      }
    ];

    let getDealList = ()=> {
      lwTrade.dealList(query)
        .then((resp)=> {
          $scope.$apply(()=> {
            $ctrl.latest = resp.data;
            $ctrl.latestMeta = resp.meta;
          });
        });
    };

    // 翻页
    $ctrl.pageTrigger = page=> $state.go($state.current.name, angular.merge($stateParams, {page}));

    $ctrl.$onInit = ()=> {
      switch ($stateParams.partial) {
        case 'deal':
          lwTrade.getStockList()
            .then(({data, meta})=> {
              // 买出在前
              data = data.sort((a, b)=> {
                return a.type > b.type;
              });
              $ctrl.stockList = data;
              $ctrl.stockListMeta = meta;
            });
          getDealList();

          lwUser.getWallets()
            .then(({data={}})=> {
              $ctrl.wallets = {};
              angular.forEach(data, (v)=> {
                $ctrl.wallets[v.currency] = v;
              });
            });

          break;
        case 'record':
          getDealList();
          break;
        default:
      }
    };

  }
};

export default TradeItemsComponent;