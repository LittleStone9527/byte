let FinancesItemsComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/finances-items/finances-${$stateParams.partial}.html`;
  },
  controller: function () {
    'ngInject';
    console.log('trade items init');
  }
};

export {
  FinancesItemsComponent
};