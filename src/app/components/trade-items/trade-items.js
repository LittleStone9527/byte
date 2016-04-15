let TradeItemsComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/trade-items/trade-${$stateParams.partial}.html`;
  },
  controller: function () {
    'ngInject';
    console.log('trade items init');
  }
};

export {
  TradeItemsComponent
};