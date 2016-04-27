let UserListComponent = {
  templateUrl: 'app/components/user-list/user-list.html',
  bindings: {
    state: '@'
  },
  controller: function (lwApi) {
    'ngInject';

    console.log('user-list init');

    let Query = [
      {
        "%and": {
          "%eq": {
            "state": "2"
          }
        }
      }
    ];

    lwApi.user.manage.list.get({}, {
      headers: {
        'Meta-Query': angular.toJson(Query)
      }
    }).$promise
      .then((resp)=> {
        console.log(resp);
      }, (error)=> {
        console.error(error);
      });

  }
};

export default UserListComponent;