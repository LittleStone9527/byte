let DatePickComponent = {
  templateUrl: 'app/components/date-pick/date-pick.html',
  bindings: {
    _date: '=date'    // out put
  },
  controller: function ($scope, $moment) {
    'ngInject';

    let $ctrl = this;

    $ctrl.date = {
      date: $moment(new Date()),
      hours: '00',
      min: '00',
      sec: '00'
    };

    // 更新日期
    $ctrl.updateDate = (newMoments = $ctrl.date.date)=> {

      let d = newMoments.set({
        hour: $ctrl.date.hours >= 24 ? $ctrl.date.hours - 24 : $ctrl.date.hours,
        minute: $ctrl.date.min >= 60 ? $ctrl.date.min - 60 : $ctrl.date.min,
        second: $ctrl.date.sec >= 60 ? $ctrl.date.sec - 60 : $ctrl.date.sec
      }).format("YYYY-MM-DD HH:mm:ss");

      $ctrl._date = d;

    };

    let watcher;

    $ctrl.$onInit = ()=> {
      $ctrl.updateDate();
      watcher = $scope.$watch('$ctrl.date.date', function (newVal, oldVal) {
        if (!newVal || newVal === oldVal || angular.equals(newVal, oldVal) || angular.isString(newVal) || !newVal.year || !angular.isObject(newVal))  return;
        $ctrl.updateDate(newVal);
      });
    };

    $ctrl.$onDestroy = ()=> {
      !!watcher && angular.isFunction(watcher) && watcher();
    };

  }
};

export default DatePickComponent;