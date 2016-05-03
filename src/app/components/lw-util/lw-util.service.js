export default class LwUtilService {
  constructor() {

  }

  $get($state, $stateParams, SETTINGS) {
    'ngInject';

    let util = {};

    // 初始化meta信息
    util.initMeta = function () {
      return {
        limit: $stateParams.limit || 10,
        page: $stateParams.page || 0,
        skip: $stateParams.skip || 0
      }
    };

    // 翻页触发
    util.pageTrigger = function (page, skip, meta) {
      if (!meta || page < 0) return;
      meta.page = page;
      $state.go($state.current.name, {page: page * 1 === 0 ? null : page});
    };

    // 更改每页显示数量
    util.changeLimit = function (meta) {
      if (!meta) return;
      meta.page = 0;
      $state.go($state.current.name, {limit: meta.limit * 1 === 10 ? null : meta.limit, page: null});
    };

    // 解析验证码图片
    util.parseCaptchaImg = (captchaID = '')=> {
      if (!captchaID) return captchaID;
      let host = SETTINGS.hostApi;
      let path = '/api/v1/captcha/file/dynamic/';
      return host + path + captchaID + '.png';
    };

    return util;

  }
}