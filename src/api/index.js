import request from "@/utils/request";
import defaultSettings from "@/settings";

// 获取个人用户信息
export function getUserInfo(params) {
  return request({
    url: `/users/${defaultSettings.githubUserName}`,
    method: "get"
  });
}

/**
 * 获取blog仓库的label标签
 */
export function getBlogLabelList() {
  return request({
    url: `/repos/${defaultSettings.githubUserName}/${
      defaultSettings.githubResop
    }/labels`,
    method: "get"
  });
}

/**
 * 获取所有issues
 * @param {String} labelType
 * @param {object} params
 */
export function getAllIssues(params) {
  return request({
    url: `/repos/${defaultSettings.githubUserName}/${
      defaultSettings.githubResop
    }/issues`,
    method: "get",
    params
  });
}

/**
 * 获取指定issues详情
 * @param {object} params
 */
export function getIssuesDetails(number) {
  return request({
    url: `/repos/${defaultSettings.githubUserName}/${
      defaultSettings.githubResop
    }/issues/${number}`,
    method: "get"
  });
}

/**
 * 获取指定文件内容
 * @param {object} params
 */
export function getContentContent(path) {
  return request({
    // url: "https://api.github.com/repos/aisen60/blog/contents/timeline.md",
    url: `/repos/${defaultSettings.githubUserName}/${
      defaultSettings.githubResop
    }/contents/${path}`,
    method: "get",
    headers: {
      Accept: "application/vnd.github.VERSION.html"
    }
  });
}

/**
 * 获取一个issues下的所有评论
 * @param {object} params
 */
export function getIssuesAllContents(number) {
  return request({
    // url: "https://api.github.com/repos/aisen60/blog/contents/timeline.md",
    url: `/repos/${defaultSettings.githubUserName}/${
      defaultSettings.githubResop
    }/issues/${number}/comments`,
    method: "get"
    // headers: {
    //   Accept: "application/vnd.github.VERSION.html"
    // }
  });
}
