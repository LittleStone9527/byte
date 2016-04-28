/**
 * Created by axetroy on 16-4-28.
 */

const LANG = {
  btn_ok: {zh: "好的", en: "OK"},
  btn_yes: {zh: "是的", en: "Yes"},
  btn_confirm: {zh: "确定", en: "Sure"},
  btn_cancel: {zh: "取消", en: "Cancel"},
  btn_delete: {zh: "删除", en: "Delete"},
  btn_Modify: {zh: "编辑", en: "Modify"},
  btn_login: {zh: "登陆", en: "Sign In"},


  // 错误代码
  E1000: {zh: "错误", en: "Error"},
  E1001: {zh: "错误", en: "Error"},
  E1002: {zh: "注册错误", en: "Error"},
  E1003: {zh: "修改失败，请稍后再试。", en: "Error"},
  // 成功代码
  S1000: {zh: "成功", en: "Success"},
  S1001: {zh: "登陆成功", en: "Success"},
  S1002: {zh: "注册成功", en: "Success"},
  S1003: {zh: "安全退出", en: "Success"},
  S1004: {zh: "修改成功", en: "Success"},
  S1005: {zh: "删除成功", en: "Success"}
};

var i18n = {};

// 支持的语言列表
i18n.supports = ['zh-CN', 'en-US'];

// 系统语言
i18n.systemlang = navigator.language ||
  (navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase)) || 'zh-CN';

// 当前地址path
let _href = location.pathname + location.hash;

angular.forEach(i18n.supports, (lang)=> {
  if (new RegExp('/' + lang + '/').test(_href)) {
    window.sessionStorage.lang = lang;
    // url上的语言标识
    i18n.urlLang = lang;
  }
});

// 当前页面正在使用的语言
i18n.lang = window.sessionStorage.lang || i18n.systemlang || 'zh-CN';
console.log(i18n.lang);

angular.forEach(LANG, function (langPacks, keyCode) {
  angular.forEach(langPacks, function (keyWord, lang) {
    if (!i18n[lang]) i18n[lang] = {};
    i18n[lang][keyCode] = keyWord;
  });
});

export default i18n;