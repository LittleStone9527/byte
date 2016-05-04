/**
 * Created by axetroy on 16-4-27.
 */

let AdminRechargeComponent = {
  template: require('./admin-recharge.html'),
  controller(lwApi, lwDialog){
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {currency: 'USD'};


    $ctrl.recharge = ({username='', money=0, currency='USD', tag=''}, form)=> {

      if (!username || money * 1 != money) {
        lwDialog.error('The form data is not invalid');
        return false;
      }

      lwApi.deal.manage.recharge.post({
        username, money: money * 1, currency, tag
      }).$promise
        .then(()=> {
          lwDialog.success();
          $ctrl.form = {currency: 'USD'};
          form.$setPristine();
        }, (e)=> {
          lwDialog.error(e.data.error);
        });
    };

  }
};

export default AdminRechargeComponent;