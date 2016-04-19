export class LwDialogService {
  constructor() {

  }

  $get($q, ngDialog, toastr, $rootScope, $templateCache, $log) {
    'ngInject';

    const CONFIRM = Symbol('confirm str Symbol');
    const ALERT = Symbol('alert str Symbol');

    let DIALOGS = {};

    let dialog = function (dialogID = '') {
      if (!dialogID) return;
      let config = {template: DIALOGS[dialogID].template};
      config = Object.assign(config, DIALOGS[dialogID].options);

      console.log(config);
      return ngDialog.open(config);
    };

    dialog.register = (dialogID, template, options = {})=> {
      DIALOGS[dialogID] = {
        template,
        options
      };
    };

    dialog.open = ()=> {
      ngDialog.open(...arguments);
    };

    dialog.confirm = ()=> {
      return dialog(CONFIRM).closePromise
        .then((resp)=> {
          return resp.value === 'resolve' ? $q.resolve(resp) : $q.reject(resp);
        }, (resp)=> {
          return resp.value === 'resolve' ? $q.resolve(resp) : $q.reject(resp);
        });
    };

    dialog.alert = (content = '!!ALERT')=> {
      var deferred = $q.defer();
      let $scope = $rootScope.$new();
      // 警告框的内容
      $scope.content = content;

      // 传过去的promise
      $scope.deferred = deferred;
      ngDialog.open({
        template: 'app/components/dialog/alert.html',
        scope: $scope
      });
      
      return deferred.promise;
    };

    dialog.success = function () {
      return toastr.success(...arguments)
    };

    dialog.error = function () {
      return toastr.error(...arguments)
    };

    dialog.warning = function () {
      return toastr.warning(...arguments);
    };

    dialog.info = function () {
      return toastr.info(...arguments);
    };

    dialog.clear = function () {
      return toastr.clear(...arguments);
    };

    dialog.register(CONFIRM, 'app/components/dialog/confirm.html');
    dialog.register(ALERT, 'app/components/dialog/alert.html');

    return dialog;

  }
}