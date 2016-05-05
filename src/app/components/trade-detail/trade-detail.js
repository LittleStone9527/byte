const _dataFormat = 'YYYYMMDDHHmmss';

// 当前日期
let _nowDate = window.moment();
let _nowDay = _nowDate.date();

let days = {
  0: _nowDate.clone().hour(0).minute(0).second(0).format(_dataFormat),
  7: _nowDate.clone().date(_nowDay - 7).hour(0).minute(0).second(0).format(_dataFormat),
  15: _nowDate.clone().date(_nowDay - 15).hour(0).minute(0).second(0).format(_dataFormat),
  30: _nowDate.clone().date(_nowDay - 30).hour(0).minute(0).second(0).format(_dataFormat),
  max: _nowDate.clone().hour(23).minute(0).second(0).format(_dataFormat)
};

let defaultQuery = [
  {
    "%and": {
      "%eq": {
        status: 3,
        currency: 'USD'
      },
      "%ne": {
        type: -1
      },
      // 不大于:今天
      "%lte": {
        created: days.max
      },
      // 不小于:七天前
      "%gte": {
        created: days[7]
      }
    }
  },
  {
    "%o": ['-created']
  },
  {
    "%l": 10,
    "%p": 0,
    "%s": 0
  }
];

let TradeDetailComponent = {
  templateUrl: 'app/components/trade-detail/trade-detail.html',
  controller($state, $stateParams, $moment, lwTrade, lwUtil, $query) {
    'ngInject';

    let $ctrl = this;

    const STATENAME = $state.current.name;

    $ctrl.tradeList = [];
    $ctrl.tradeListMeta = lwUtil.initMeta();

    let query = angular.copy(defaultQuery);

    $ctrl.query = query;

    angular.extend(query[0], $query.parse($stateParams.query));
    angular.extend(query[2], {
      '%l': $stateParams.limit * 1 || 10,
      '%p': $stateParams.page * 1 || 0,
      '%s': $stateParams.skip * 1 || 0
    });

    // 几天前
    let _gteDay = query[0]["%and"]["%gte"].created;
    let gteDayObj = $moment(_gteDay, _dataFormat);
    // 相差的时间ms
    let _diffTimes = $moment(days[0], [_dataFormat]).diff(gteDayObj);
    // 最终结果:相差多少天
    $ctrl.diffDays = parseInt(_diffTimes / (1000 * 3600 * 24), 10);

    // 按照时间筛选
    $ctrl.filterDate = (skipDay)=> {
      query[0]['%and']['%gte'].created = days[skipDay];
      GOGO();
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
      GOGO()
    };

    // 按照货币筛选
    $ctrl.filterCurrency = (currency)=> {
      query[0]['%and']['%eq'].currency = currency;
      GOGO();
    };

    // 跳转
    const GOGO = function () {
      $state.go(STATENAME, angular.merge($stateParams, {
        query: $query.stringify(query[0])
      }, {page: 0}));
    };

    // 翻页
    $ctrl.pageTrigger = page=> $state.go($state.current.name, angular.merge($stateParams, {page}));

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