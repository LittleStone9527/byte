let FinancesItemsComponent = {
  templateUrl($stateParams){
    'ngInject';
    return `app/components/finances-items/finances-${$stateParams.partial}.html`;
  },
  controller($stateParams, lwApi, lwUser) {
    'ngInject';

    let $ctrl = this;

    $ctrl.wallets = [];

    $ctrl.drawCash = ()=> {
      alert('draw cash success');
      // lwApi.deal.api.post().$promise
      //   .then(()=> {
      //
      //   }, ()=> {
      //    
      //   });
    };

    $ctrl.charge = ()=> {
      lwApi.deal.api.post({
        type: 2,
        money: 100,
        currency: 'USD'
      }).$promise
        .then(()=> {
          alert('charge success');
        }, ()=> {

        });
    };

    $ctrl.transfer = ()=> {

      lwApi.deal.api.post({
        type: 0,
        money: 10,
        currency: 'USD',
        username: '17P8i4siqkWPzhkMytmfWPetN13u57G9cH'
      }).$promise
        .then(()=> {
          alert('transfer success');
        }, (e)=> {
          console.error(e.data.error);
        });
    };

    $ctrl.$onInit = ()=> {

      switch ($stateParams.partial) {
        case 'my':
          // 钱包列表
          lwUser.getWallets()
            .then((resp)=> {
              $ctrl.wallets = resp.data;
            });
          break;
        default:
      }
    };

  }


};

export {
  FinancesItemsComponent
};