let SafeItemsComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/safe-items/safe-${$stateParams.partial}.html`;
  },
  controller: function () {
    'ngInject';
  }
};

export {
  SafeItemsComponent
};