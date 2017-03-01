/**
 * @file vue plugin
 * @author windwithfo(windwithfo@yeah.net)
 */

// 初始化SEO
const initSEO = {
    title: 'emiya title',
    keywords: 'emiya keywords',
    description: 'emiya description'
};

// 分别获取Index页面 title keywords description
const appTitle = document.querySelector('title');
const appKey = document.querySelector("meta[name='keywords']");
const appDes = document.querySelector("meta[name='description']");

/**
 * 初始化页面seo信息
 * @param {Object} info              seo
 * @param {String=} info.title       title
 * @param {String=} info.keywords    keywords
 * @param {String=} info.description description
 * @example  this.$setSEO({title:'xxx'})
 */
const setSEO = function (info = initSEO) {
    info.title = info.title || initSEO.title;
    info.keywords = info.keywords || initSEO.keywords;
    info.description = info.description || initSEO.description;

    appTitle.textContent = info.title;
    appKey.setAttribute('content', info.keywords);
    appDes.setAttribute('content', info.description);
};

module.exports = setSEO;
