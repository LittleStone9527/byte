/**
 * Created by axetroy on 16-4-2.
 */


let ProfileComponent = {
  templateUrl: 'app/components/profile/profile.html',
  controller(lwUser) {
    'ngInject';

    let $ctrl = this;

    $ctrl.lwUser = lwUser;

    $ctrl.wallets = [];

    $ctrl.USD = {balance: 0};
    $ctrl.FBC = {balance: 0};

    $ctrl.$onInit = ()=> {
      lwUser.getWallets()
        .then((resp)=> {
          $ctrl.wallets = resp.data;
          $ctrl.wallets.forEach((v)=> {
            if (v.currency === 'USD') $ctrl.USD = v;
            if (v.currency === 'FBC') $ctrl.FBC = v;
          });
        });
    }
  }
};

export default ProfileComponent;
