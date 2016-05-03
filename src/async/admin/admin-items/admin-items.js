import {sideBarData} from '../../../app/admin/admin.controller';

// var css = require("!css!sass!./admin-items.scss");

// require('./admin-items.scss');

let AdminItemsComponent = {
  template: ($stateParams)=> {
    'ngInject'
    let partial = $stateParams.partial;
    return `<admin-${partial}/>`
  },
  controller: function ($timeout, $stateParams) {
    'ngInject';

    let $ctrl = this;

    /**
     * 初始化侧边栏
     */
    $ctrl.$onInit = ()=> {

      angular.forEach(sideBarData, function (v) {
        angular.forEach(v.data, (v1)=> {
          if ($stateParams.partial === v1.partial) {
            v.$$open = true;
            v1.$$active = true;
          } else {
            v1.$$active = false;
          }
        });
      });

    };

  }
};

export {AdminItemsComponent};


