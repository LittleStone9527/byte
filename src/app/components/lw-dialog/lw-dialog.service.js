export class LwDialogService {
  constructor() {

  }

  $get($q, ngDialog, toastr, $rootScope) {
    'ngInject';

    const CONFIRM = Symbol('confirm str Symbol');
    const ALERT = Symbol('alert str Symbol');

    let DIALOGS = {};

    let dialog = function (dialogID = '') {
      if (!dialogID) return;
      let config = {template: DIALOGS[dialogID].template};
      config = Object.assign(config, DIALOGS[dialogID].options);

      return ngDialog.open(config);
    };

    dialog.register = (dialogID, template, options = {})=> {
      DIALOGS[dialogID] = {
        template,
        options
      };
    };

    dialog.open = function () {
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

    dialog.success = function (content = 'Permission Success', title = 'Success') {
      return toastr.success(content, title)
    };

    dialog.error = function (content = 'Permission Error', title = 'Error') {
      return toastr.error(content, title)
    };

    dialog.warning = function (content = 'This could be dangerous', title = 'Danger') {
      return toastr.warning(content, title);
    };

    dialog.info = function (content = '', title = 'Notice That') {
      return toastr.info(content, title);
    };

    dialog.clear = () => toastr.clear();

    dialog.register(CONFIRM, 'app/components/dialog/confirm.html');
    dialog.register(ALERT, 'app/components/dialog/alert.html');

    return dialog;

  }
}