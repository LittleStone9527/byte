/**
 * Created by axetroy on 16-4-2.
 */


let Pagination = {
  templateUrl: 'app/components/pagination/pagination.html',
  bindings: {
    _meta: '=meta'
  },
  controller: function ($scope) {
    'ngInject';

    let $ctrl = this;

    $ctrl.meta = $ctrl._meta || {};


    $ctrl.M = {
      showFirst:false
    };

    $scope.$watch('$ctrl._meta', (newVal, oldVal)=> {

      if (!newVal || angular.equals(newVal, oldVal)) return;

      console.log(newVal);

    });

  }
};

export default Pagination;
