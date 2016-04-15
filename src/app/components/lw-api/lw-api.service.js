export class LwApiService {
  constructor() {

  }

  $get(lwResource) {
    'ngInject';
    console.log('api init');

    let $$ = lwResource.register;

    const API = {
      user: {
        login: $$
      }
    };

    return API;

  }
}