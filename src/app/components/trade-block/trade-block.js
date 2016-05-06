const componentPath = 'app/components/trade-block';

let TradeBlockComponent = {
  templateUrl: componentPath + '/trade-block.html',
  bindings: {
    data: '=trade'
  },
  controller($window, lwTrade, lwUser) {
    'ngInject';
    let $ctrl = this;

    $ctrl.tpl = componentPath + '/trade-' + ($ctrl.data.type === 0 ? 'buy' : 'sell') + '.html';

    let price = $ctrl.data.price;

    $ctrl.buyItem = {price};

    $ctrl.sellItem = {price};

    $ctrl.USDWallet = {};

    $ctrl.max = 0;

    // 卖出
    $ctrl.sell = (num, form)=> {
      lwTrade.deal({num: $ctrl.data.num, price: 1, count: 1})
        .then((resp)=> {
          console.info(resp);
        }, (error)=> {
          console.error(error);
        });
    };

    // 买入
    $ctrl.buy = (form)=> {
      lwTrade.deal({num: $ctrl.data.num, price: 1, count: 1})
        .then((resp)=> {
          console.info(resp);
        }, (error)=> {
          console.error(error);
        });
    };

    // 最大可买XXX FBC
    $ctrl.maxBuy = ()=> {
      let max = parseFloat($ctrl.USDWallet.balance / $ctrl.buyItem.price);
      $ctrl.buyItem.maxBuy = $window.isNaN(max) ? 0 : max.toFixed(3);
    };

    // 最大可卖XXXUSD
    $ctrl.maxSell = ()=> {
      let max = parseFloat($ctrl.sellItem.price * $ctrl.sellItem.count);
      $ctrl.buyItem.maxSell = $window.isNaN(max) ? 0 : max.toFixed(3);
    };

    $ctrl.$onInit = ()=> {
      lwUser.getWallets()
        .then((resp)=> {
          angular.forEach(resp.data, (v)=> {
            if (v.currency === 'USD') $ctrl.USDWallet = v;
          });
          $ctrl.maxBuy();
          $ctrl.maxSell();
        });
    }

  }
};

export {TradeBlockComponent};