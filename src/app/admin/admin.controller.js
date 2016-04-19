export class AdminController {
  constructor() {
    'ngInject';

    let vm = this;

    vm.sideBarData = [
      {title: '仪表盘', partial: 'dash'},
      {title: '用户管理', partial: 'user'},
      {title: '交易管理', partial: 'deal'},
      {title: '财务管理', partial: 'finances'},
      {title: '信息中心', partial: 'message'},
      {title: '系统管理', partial: 'settings'}
    ];

  }
}
