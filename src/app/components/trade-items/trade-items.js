let TradeItemsComponent = {
  templateUrl($stateParams, $attrs){
    'ngInject';
    let tpl = $attrs.template || $stateParams.partial;
    return `app/components/trade-items/trade-${tpl}.html`;
  },
  controller($scope, $state, $stateParams, $q, lwUtil, lwTrade) {
    'ngInject';

    let $ctrl = this;

    $ctrl.stockList = [];
    $ctrl.stockListMeta = lwUtil.initMeta();
    $ctrl.latest = [];
    $ctrl.latestMeta = lwUtil.initMeta();
    console.log($ctrl.latestMeta);

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
          console.log(resp.data);
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
            .then((resp)=> {
              $ctrl.stockList = resp.data;
              $ctrl.stockListMeta = resp.meta;
            });
          getDealList();
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