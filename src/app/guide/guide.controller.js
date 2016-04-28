export default class GuideController {
  constructor() {
    'ngInject';

    let vm = this;

    vm.sideBarData = [
      {
        title: '注册登录',
        data: [
          {title: '...'},
          {title: '...'},
          {title: '...'},
          {title: '...'},
          {title: '...'}
        ]
      },
      {
        title: '新用户注册',
        data: [
          {title: '...'},
          {title: '...'}
        ]
      },
      {
        title: '安全设置',
        data: [
          {title: '...'},
          {title: '...'},
          {title: '...'},
          {title: '...'},
          {title: '...'}
        ]
      }
    ];

    vm.toggle = (d)=> {
      angular.forEach(vm.sideBarData, (item)=> {
        if (item.title !== d.title) {
          item.$$extend = false;
        }
      });
      d.$$extend = !d.$$extend;
    };

  }
}
