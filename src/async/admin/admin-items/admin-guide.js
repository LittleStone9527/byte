/**
 * Created by axetroy on 16-4-27.
 */
import i18n from '../../../app/lang'

let AdminGuideComponent = {
  template: require('./admin-guide.html'),
  controller() {
    'ngInject';
    
    let $ctrl = this;
    $ctrl.lang = i18n.lang;
    $ctrl.lang2 = i18n.lang;
    $ctrl.form = {};
  }
};

export default AdminGuideComponent;
