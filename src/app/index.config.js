export function config($logProvider, toastrConfig, ngStoreProvider, SETTINGS) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(!SETTINGS.isProduct);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  // toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  ngStoreProvider.prefix('lw').exp(1000 * 3600 * 24 * 7);
}
