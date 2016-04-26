let SafeItemsComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/safe-items/safe-${$stateParams.partial}.html`;
  },
  controller: function ($scope, $timeout, lwUser) {
    'ngInject';

    let $ctrl = this;

    $ctrl.profile = lwUser.profile;

    $ctrl.items = [
      {'title': '绑定邮箱'},
      {'title': '绑定手机'},
      {'title': '绑定谷歌验证码'},
      {'title': '登陆密码'},
      {'title': '交易密码'}
    ];

    $ctrl.toggleDetail = (index)=> {
      angular.forEach($ctrl.items, (item, i)=> i !== index && (item.$$detail = false));
      $ctrl.items[index].$$detail = !$ctrl.items[index].$$detail;
    };

    $ctrl.safeEmail = (email)=> {
      let part = email.split('@');
      let username = part[0];
      let vendor = part[1];
      let spiteLength = Math.ceil(username.length / 2);
      username = username.replace(new RegExp('.' + '{' + spiteLength + '}$', 'ig'), (function () {
        let it = '';
        while (spiteLength--) {
          it += '*';
        }
        return it;
      })());
      return username + '@' + vendor;
    };

    $ctrl.$onInit = ()=> {
      $ctrl.profile.emailSafe = $ctrl.safeEmail($ctrl.profile.email);
    };

  }
};

export default SafeItemsComponent;