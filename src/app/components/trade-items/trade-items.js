let TradeItemsComponent = {
  templateUrl: ($stateParams, $templateCache, SETTINGS)=> {
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