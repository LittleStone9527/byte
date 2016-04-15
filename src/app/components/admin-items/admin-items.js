let AdminItemsComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/admin-items/admin-${$stateParams.partial}.html`;
  },
  controller: function () {
    'ngInject';
    console.log('trade items init');
  }
};

export {
  AdminItemsComponent
};