/**
 * Created by axetroy on 16-4-27.
 */

import i18n from '../../lang';

let AdminPublicComponent = {
  templateUrl: 'app/components/admin-items/admin-public.html',
  controller: function () {
    'ngInject';

    let $ctrl = this;

    $ctrl.lang = i18n.lang;

    $ctrl.form = {};

  }
};

export default AdminPublicComponent;