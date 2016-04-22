export default class LwPermissionService {
  constructor() {
  }

  $get($q, lwUser) {
    'ngInject';

    /**
     * 是否已经登陆
     */
    let login = () => lwUser.isAuth ? $q.resolve(true) : lwUser.getDetail();

    /**
     * 是否是普通用户
     */
    let user = ()=> lwUser.isUser ? $q.resolve(true) : $q.reject(false);

    /**
     * 是否是管理员
     */
    let admin = ()=> lwUser.isAdmin ? $q.resolve(true) : $q.reject(false);

    return {login, user, admin}

  }
}