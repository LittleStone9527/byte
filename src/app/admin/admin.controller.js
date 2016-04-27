let sideBarData = [];

class AdminController {
  constructor($state, lwUser, lwApi) {
    'ngInject';

    let vm = this;

    sideBarData = [
      {
        title: '信息中心',
        icon: 'ion-chatbox-working',
        data: [
          {title: '发信箱', partial: 'outbox'},
          {title: '收信箱', partial: 'inbox'},
          {title: '服务条款', partial: 'terms'},
          {title: '公告管理', partial: 'public'},
          {title: '新手指南', partial: 'guide'}
        ]
      },
      {
        title: '用户管理',
        icon: 'ion-person-stalker',
        data: [
          {title: '已激活用户', partial: 'active'},
          {title: '未激活用户', partial: 'unactive'}
        ]
      },
      {
        title: '财务管理',
        icon: 'ion-calculator',
        data: [
          {title: '充值管理', partial: 'recharge'},
          {title: '网银充值记录', partial: 'record'},
          {title: '提现管理', partial: 'withdrawals'},
          {title: '转账管理', partial: 'transfer'},
          {title: '流水明细', partial: 'itemized'}
        ]
      },
      {
        title: '交易管理',
        icon: 'ion-stats-bars',
        data: [
          {title: '正在买入的记录', partial: 'buying-detail'},
          {title: '正在卖出的记录', partial: 'selling-detail'},
          {title: '已完结的买入明细', partial: 'bought-detail'},
          {title: '已完结的卖出明细', partial: 'sold-detail'}
        ]
      },
      {
        title: '系统设置',
        icon: 'ion-gear-a',
        data: [
          {title: '管理员设置', partial: 'administrator'},
          {title: '统计数据', partial: 'statistics'},
          {title: '参数设置', partial: 'setting'},
          {title: '数据库操作', partial: 'database'},
          {title: '系统登陆控制', partial: 'permission'}
        ]
      }
    ];

    vm.sideBarData = sideBarData;

    // 收起全部标签，然后再展开
    vm.openTab = (d = {})=> {
      angular.forEach(vm.sideBarData, function (v) {
        if (d.title === v.title) return;
        v.$$open = false;
      });

      d.$$open = !d.$$open;
    };

    vm.logout = ()=> {
      lwApi.user.logout.post().$promise
        .finally(function () {
          lwUser.logoutTrigger();
          $state.go('home');
        });
    };

  }
}

export {AdminController, sideBarData};
