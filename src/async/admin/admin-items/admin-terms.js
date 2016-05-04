/**
 * Created by axetroy on 16-4-27.
 */

import i18n from '../../../app/lang';

let AdminTermsComponent = {
  template: require('./admin-terms.html'),
  controller(){
    'ngInject';

    let $ctrl = this;

    $ctrl.lang = i18n.lang;

    $ctrl.form = {};

  }
};

export default AdminTermsComponent;
