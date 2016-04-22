let TradeItemsComponent = {
  templateUrl: ($stateParams, $attrs)=> {
    'ngInject';
    let tpl = $attrs.template || $stateParams.partial;
    return `app/components/trade-items/trade-${tpl}.html`;
  },
  controller: function () {
    'ngInject';
  }
};

export {
  TradeItemsComponent
};