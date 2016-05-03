let TradeDetailComponent = {
  templateUrl: 'app/components/trade-detail/trade-detail.html',
  controller($stateParams, $moment, lwTrade, lwUtil) {
    'ngInject';

    let $ctrl = this;

    let query = [
      {
        "%and": {
          "%eq": {
            status: 3
          },
          "%lte": {
            created: 20160527
          }
        }
      },
      {
        "%o": ['-created']
      },
      {
        "%l": $stateParams.skip * 1 || 10
      }
    ];

    let days = {
      0: new Date(),
      7: 123,
      15: 15,
      30: 30
    };

    $ctrl.tradeList = [];
    $ctrl.tradeListMeta = lwUtil.initMeta();

    /**
     * 按照日期赛选
     */
    $ctrl.filterDate = (date)=> {
      let d = $moment("20160601", "YYYYMMDD", true);
      console.log(d);
    };

    $ctrl.$onInit = ()=> {
      // 交易列表
      lwTrade.getList({}, {
          headers: {'Meta-Query': JSON.stringify(query)}
        })
        .then((resp)=> {
          $ctrl.tradeList = resp.data;
          $ctrl.tradeListMeta = resp.meta;
        });
    }

  }
};

export default TradeDetailComponent;