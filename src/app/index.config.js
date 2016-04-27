export function config($logProvider, toastrConfig, ngStoreProvider, SETTINGS, $resourceProvider) {
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

  $resourceProvider
    .setWithCredentials(SETTINGS.isCors)
    .setResponseType('json')
    .setHosts(SETTINGS.hostApi)
    .setInterceptor((response, $q)=> {
      if (!response || response.status >= 400 || !response.data || response.data.error || !response.data.success) {
        return $q.reject(response);
      } else {
        // 登陆，拿session
        if (response.headers[SETTINGS.sessionTag.toLowerCase()]) {
          return $q.resolve(response);
        } else {
          return $q.resolve(response.data);
        }
      }
    });

}
