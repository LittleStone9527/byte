/**
 * Created by axetroy on 16-4-2.
 */


let ProfileComponent = {
  templateUrl: 'app/components/profile/profile.html',
  controller: function (lwUser) {
    'ngInject';

    let $ctrl = this;

    $ctrl.lwUser = lwUser;

  }
};

export default ProfileComponent;
