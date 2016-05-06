/**
 * Created by axetroy on 16-4-27.
 */

"use strict";
let AdminAdministratorComponent = {
  template: require('./admin-administrator.html'),
  controller(){
    'ngInject';

    let $ctrl = this;

    $ctrl.permissions = [
      {
        label: '信息中心',
        options: [
          {selection: '发信箱'},
          {selection: '收信箱'},
          {selection: '服务条款'},
          {selection: '公告管理'},
          {selection: '新手指南'}
        ]
      },
      {
        label: '用户管理',
        options: [
          {selection: '已激活用户'},
          {selection: '未激活用户'}
        ]
      },
      {
        label: '财务管理',
        options: [
          {selection: '充值管理'},
          {selection: '网银充值记录'},
          {selection: '提现管理'},
          {selection: '转帐管理'},
          {selection: '流水明细'}
        ]
      },
      {
        label: '交易管理',
        options: [
          {selection: '正在买入的记录'},
          {selection: '正在卖出的记录'},
          {selection: '已完结的买入明细'},
          {selection: '已完结的卖出明细'}
        ]
      },
      {
        label: '系统管理',
        options: [
          {selection: '管理员设置'},
          {selection: '统计数据'},
          {selection: '参数设置'},
          {selection: '数据库操作'},
          {selection: '系统登陆控制'}
        ]
      }
    ];
    //全选按钮
    $ctrl.selectAllPermission = function () {
      var checked = !!$ctrl.permissions.$$check;
      angular.forEach($ctrl.permissions, function (label) {
        label.$$check = checked;
        angular.forEach(label.options, function (opt) {
          opt.$$check = checked;
        });
      });
    };
    //点击子选项前面父选项自动选择全部子选项
    $ctrl.selectAll = function (d) {
      var value = !!d.$$check;
      var result = true;
      angular.forEach($ctrl.permissions, function (v) {
        if (!v.$$check) result = false;
      });
      $ctrl.permissions.$$check = result;
      angular.forEach(d.options, function (opt) {
        opt.$$check = value;
      });
    };

    //点击每一个单独的子选项
    $ctrl.select = function (d) {
      var parent = true;
      // 父级
      angular.forEach(d.options, function (v) {
        if(!v.$$check) parent = false;
      });
      d.$$check = parent;

      var total = true;
      // 总的
      angular.forEach($ctrl.permissions, function (v) {
        if(!v.$$check) total = false;
      });
      $ctrl.permissions.$$check = total;
    };
    
  }
};

export default AdminAdministratorComponent;
