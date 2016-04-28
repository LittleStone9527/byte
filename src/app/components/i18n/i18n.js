export default class i18nService {
  constructor() {
  }

  $get($state, $window, $location) {
    'ngInject';

    let I18N = ()=> {

    };

    I18N.set = (lang)=> {
      let url = $state.current.url;
      // console.log(url);
      let path = $location.path();

      if (path === '/') {
        console.log('/' + lang);
        // $location.path('/' + lang);
        // let url = $location.absUrl();
        // let target = url + lang + '/';
        // console.log(target);
        // window.location = target;
        $location.path(lang);
      }
    };

    return I18N;

  }
}