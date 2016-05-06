/**
 * Created by axetroy on 16-4-27.
 */

let AdminWithdrawalsComponent = {
  template: require('./admin-withdrawals.html'),
  controller(lwApi, lwTrade){
    'ngInject';

    let $ctrl = this;

    let query = [
      {
        '%and': {
          '%eq': {
            method: 1,
            currency: 'USD',
            status: 2
          },
          '%lte': {
            created: '20160427165810'
          }
        }
      },
      {
        '%o': ['-created']
      },
      {
        '%l': 100,
        '%p': 0,
        '%s': 0
      }
    ];

    function getDrawList() {
      lwApi.deal.draw.manage.list.get({}, {
        headers: {
          'Meta-Query': JSON.stringify(query)
        }
      }).$promise
        .then((resp)=> {
          console.log(resp);
        }, (error)=> {
          console.error(error);
        });
    }

    $ctrl.$onInit = ()=> {
      getDrawList();
    }

  }
};

export default AdminWithdrawalsComponent;