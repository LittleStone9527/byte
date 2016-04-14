let HeaderComponent = {
  templateUrl: 'app/components/header/header.html',
  controller: function ($window,SETTINGS) {
    'ngInject';
    // console.log(window);
    console.log(SETTINGS);
  }
};

export {
  HeaderComponent
};