/**
 * Created by axetroy on 16-4-2.
 */


let Pagination = {
  templateUrl: 'app/components/pagination/pagination.html',
  bindings: {
    meta: '=meta',
    _trigger: '=trigger'
  },
  controller: function ($scope) {
    'ngInject';

    let $ctrl = this;

    $ctrl.pageInfo = {
      now: 0,
      last: 0,
      preAble: true,
      nextAble: true,
      showMax: 5, // 显示页码最多
      showRange: [],
      showFirst: true,
      showLast: true,
      showPreJump: true,
      showNextJump: true
    };

    // callback
    $ctrl.trigger = function (cmd) {
      if (!$ctrl._trigger) return;
      var skip = $ctrl.meta ? $ctrl.meta.page * $ctrl.meta.limit : 0;
      var page;
      if ($ctrl.meta !== undefined) {
        if (cmd === "-") {
          skip -= $ctrl.meta.limit;
        } else if (cmd === "+") {
          skip += $ctrl.meta.limit;
        } else if (!isNaN(cmd)) {
          skip = (cmd - 1) * $ctrl.meta.limit;
        }
      }
      page = skip / $ctrl.meta.limit;
      $ctrl._trigger(page, skip, $ctrl.meta);
    };

    $ctrl.callback = function (page) {
      if ((page === "-" && $ctrl.pageInfo.now === 1) || (page === "+" && $ctrl.pageInfo.now === $ctrl.pageInfo.last)) {
        return
      } else if (!isNaN(page)) {
        if (page < 1) {
          page = 1
        }
        else if (page > $ctrl.pageInfo.last) {
          page = $ctrl.pageInfo.last;
        }
      }
      $ctrl.trigger(page);
    };

    let watcher = $scope.$watch('$ctrl.meta', (newVal, oldVal)=> {

      if (!newVal || angular.equals(newVal, oldVal)) return;

      $ctrl.pageInfo.now = (newVal.page * newVal.limit / newVal.limit) + 1;                // 当前页码
      $ctrl.pageInfo.last = Math.ceil(newVal.total / newVal.limit);                        // 最大页码

      // 显示区域
      $ctrl.pageInfo.showRange = [];
      var _from = $ctrl.pageInfo.now - Math.floor($ctrl.pageInfo.showMax / 2);
      _from = _from < 1 ? 1 : _from;
      _from = _from + $ctrl.pageInfo.showMax > $ctrl.pageInfo.last ? $ctrl.pageInfo.last - $ctrl.pageInfo.showMax + 1 : _from;
      for (var i = _from; i < _from + $ctrl.pageInfo.showMax; i++) {
        if (i > 0 && i <= $ctrl.pageInfo.last) {
          $ctrl.pageInfo.showRange.push(i);
        }
      }

      $ctrl.pageInfo.preAble = $ctrl.pageInfo.now !== 1;                     // 是否可以后退
      $ctrl.pageInfo.nextAble = $ctrl.pageInfo.now !== $ctrl.pageInfo.last;  // 是否可以前进

      $ctrl.pageInfo.showFirst = !!($ctrl.pageInfo.showRange.length > 0 && ($ctrl.pageInfo.showRange[0] > 1)); // 显示第一页码
      $ctrl.pageInfo.showLast = !!($ctrl.pageInfo.showRange.length > 0 &&
      ($ctrl.pageInfo.showRange[$ctrl.pageInfo.showRange.length - 1] < $ctrl.pageInfo.last)); // 显示最后页码


      $ctrl.pageInfo.showPreJump = $ctrl.pageInfo.showFirst;
      $ctrl.pageInfo.showNextJump = $ctrl.pageInfo.showLast;

    });

    $ctrl.$onDestroy = ()=> {
      !!watcher && angular.isFunction(watcher) && watcher();
    };

  }
};

export default Pagination;
