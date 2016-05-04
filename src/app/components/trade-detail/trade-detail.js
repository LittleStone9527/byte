let TradeDetailComponent = {
  templateUrl: 'app/components/trade-detail/trade-detail.html',
  controller($state, $stateParams, $moment, lwTrade, lwUtil, $query) {
    'ngInject';

    let $ctrl = this;

    let _dataFormat = 'YYYYMMDD';

    $ctrl.tradeList = [];
    $ctrl.tradeListMeta = lwUtil.initMeta();

    // 当前日期
    let _nowDate = $moment();
    let _nowDay = _nowDate.date();

    let days = {
      "-1": _nowDate.clone().date(_nowDay + 1).format(_dataFormat),
      0: _nowDate.clone().format(_dataFormat),
      1: _nowDate.clone().date(_nowDay - 1).format(_dataFormat),
      7: _nowDate.clone().date(_nowDay - 7).format(_dataFormat),
      15: _nowDate.clone().date(_nowDay - 15).format(_dataFormat),
      30: _nowDate.clone().date(_nowDay - 30).format(_dataFormat)
    };

    let query = [
      {
        "%and": {
          "%eq": {
            status: 3
          },
          "%ne": {
            type: -1
          },
          // 不大于
          "%lte": {
            created: days[0]
          },
          // 不小于
          "%gte": {
            created: days[7]
          }
        }
      },
      {
        "%o": ['-created']
      },
      {
        "%l": $ctrl.tradeListMeta.limit
      }
    ];


    $ctrl.query = query;

    let _query = $query.parse($stateParams.query);

    query[0] = $stateParams.query && angular.isObject(_query) && Object.keys(_query) ? _query : query[0];

    let _gteDay = query[0]["%and"]["%gte"].created;

    _gteDay = $moment(_gteDay, _dataFormat);
    // 相差的时间ms
    let _diffTimes = $moment(days[0], [_dataFormat]).diff(_gteDay);
    // 相差多少天
    $ctrl.diffDays = _diffTimes / (1000 * 3600 * 24);

    // 按照时间筛选
    $ctrl.filterDate = (skipDay)=> {
      query[0]['%and']['%gte'].created = days[skipDay];
      $state.go($state.current.name, angular.merge($stateParams, {
        query: $query.stringify(query[0])
      }));
    };

    // 按照类型筛选
    $ctrl.filterType = (type)=> {
      // 不等于
      if (type < 0) {
        if (!query[0]['%and']['%ne']) query[0]['%and']['%ne'] = {};
        if (query[0]['%and']['%eq']) delete query[0]['%and']['%eq'].type;
        query[0]['%and']['%ne'].type = type
      } else {
        if (query[0]['%and']['%ne']) delete query[0]['%and']['%ne'];
        query[0]['%and']['%eq'].type = type;
      }
      $ctrl.$onInit();
    };

    // 按照货币筛选
    $ctrl.filterCurrency = (currency)=> {
      console.log(currency);
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