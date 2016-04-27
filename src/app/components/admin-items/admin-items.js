import {sideBarData} from '../../admin/admin.controller';

let AdminItemsComponent = {
  templateUrl: ($stateParams)=> {
    'ngInject';
    return `app/components/admin-items/admin-${$stateParams.partial}.html`;
  },
  controller: function ($timeout, $stateParams, $query, base64, lwApi) {
    'ngInject';

    let $ctrl = this;
    
    $ctrl.$onInit = ()=> {
      angular.forEach(sideBarData, function (v) {
        angular.forEach(v.data, (v1)=> {
          if ($stateParams.partial === v1.partial) {
            v.$$open = true;
            v1.$$active = true;
          } else {
            v1.$$active = false;
          }
        });
      });
    };

    // let query = {
    //   limit: 10,
    //   page: 0,
    //   sort: ['+createTime', '+level'],
    //   query: {
    //     '%and': {
    //       '%eq': {key1: '333', key2: '444'},
    //       '%gq': {age: 18, level: 10}
    //     }
    //   }
    // };
    //
    // `
    //   [
    //     {
    //       "%and":{
    //         "%eq":{"key1":"A12"}
    //         "%gq":{"key2":"A13"}
    //         }
    //     },
    //     {
    //       "%l":5
    //     },
    //   ]
    // `;


    // // 步骤1：将url地址，解析成json对象
    // let params = $params.decode($stateParams);
    //
    // console.log(params);
    //
    // // 步骤2： 将json对象，转化成headers发送给服务器
    // let headers = $params.transform(params);
    //
    // console.log(headers);

  }
};

export default AdminItemsComponent;