let TradeItemsComponent = {
  templateUrl: ($stateParams, $attrs)=> {
    'ngInject';
    console.log($attrs);
    return `app/components/trade-items/trade-${$stateParams.partial}.html`;
  },
  controller: function () {
    'ngInject';
  }
};

export {
  TradeItemsComponent
};