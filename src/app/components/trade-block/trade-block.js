const componentPath = 'app/components/trade-block';

let TradeBlockComponent = {
  templateUrl: componentPath + '/trade-block.html',
  bindings: {
    data: '=trade'
  },
  controller(lwTrade) {
    'ngInject';
    let $ctrl = this;

    $ctrl.tpl = componentPath + '/trade-' + ($ctrl.data.type === 0 ? 'buy' : 'sell') + '.html';

    $ctrl.buy = {};

    $ctrl.sell = {};

    // 卖出
    $ctrl.sell = (num, form)=> {
      console.log('sell submit');
      lwTrade.deal({num: $ctrl.data.num, price: 1, count: 1})
        .then((resp)=> {
          console.info(resp);
        }, (error)=> {
          console.error(error);
        });
    };

    // 买入
    $ctrl.buy = (form)=> {
      console.log('buy submit');
      lwTrade.deal({num: $ctrl.data.num, price: 1, count: 1})
        .then((resp)=> {
          console.info(resp);
        }, (error)=> {
          console.error(error);
        });
    };

  }
};

export {TradeBlockComponent};