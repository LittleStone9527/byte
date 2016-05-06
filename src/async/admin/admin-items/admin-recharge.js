/**
 * Created by axetroy on 16-4-27.
 */

let AdminRechargeComponent = {
  template: require('./admin-recharge.html'),
  controller(lwApi, lwDialog, SETTINGS){
    'ngInject';

    let $ctrl = this;

    $ctrl.form = {currency: 'USD'};


    $ctrl.recharge = ({username='', money=0, currency='USD', tag=''}, form)=> {

      if (!username || money * 1 != money) {
        lwDialog.error('The form data is not invalid');
        return false;
      }

      money = money * SETTINGS.TIMES;

      let type = money > 0 ? 2 : 5;

      money = Math.abs(money);

      lwApi.deal.manage.api.post({type, username, money, currency, tag}).$promise
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