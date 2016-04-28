/**
 * Created by axetroy on 16-4-27.
 */

import i18n from '../../lang';

let AdminTermsComponent = {
  templateUrl: 'app/components/admin-items/admin-terms.html',
  controller: function () {
    'ngInject';

    let $ctrl = this;

    $ctrl.lang = i18n.lang;

    $ctrl.form = {};

  }
};

export default AdminTermsComponent;