export class LwDialogService {
  constructor() {

  }

  $get(toastr) {
    'ngInject';

    let dialog = function (dialogID) {

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
      return toastr.clear();
    };

    dialog.register = function () {

    };

    return dialog;

  }
}