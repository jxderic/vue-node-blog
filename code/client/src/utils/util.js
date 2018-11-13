/*
 * @Author: jinxiaodong
 * @Date: 2018-08-15 16:42:24
 * @LastEditors: jinxiaodong
 * @LastEditTime: 2018-11-13 15:44:05
 * @Description: 公共的一些方法
 */
import moment from 'moment'
export default {
  /**
   * 判断字符串是否为空
   * @param {*} value
   * @returns
   */
  isEmpty(value) {
    return value === undefined || value === null || value === '';
  },
  /**
   * 判断是否被嵌在iframe内
   */
  isInIframe() {
    return !(window === top)
  },
  /**
   * 生成最近7天日期
   *
   * @returns
   */
  getDate() {
    const data = [];
    for (let index = 0; index < 7; index++) {
      data.push(moment().subtract(index, 'days').format('MM.DD'));
    }
    return data.reverse();
  },
  /**
   * 生成一定范围的随机数
   * @param {*} min
   * @param {*} max
   * @returns
   */
  getRandom(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
  },
  /**
   * 获取url中传递的参数
   * @param {*} name 参数名称
   * @returns
   */
  getQueryParam(name) {
    const result = window.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
    if (result == null || result.length < 1) {
      return '';
    }
    return result[1];
  }
}
