import moment from 'moment';
/**
 * 隐藏姓名 手机号 身份证 银行卡 等中间字符信息
 * @param str
 * @returns {*}
 */
export function star(value) {
  let str = value.toString();
  if (str.length > 0 && str.length < 3) {
    return '*' + str.substring(1);
  } else if (str.length > 5 && str.length < 12) {
    return str.substr(0, 3) + '****' + str.substr(-4);
  } else if (str.length > 14) {
    return str.substr(0, 4) + '***********' + str.substr(-4);
  }
  return str;
}

/* 格式货币 */
const digitsRE = /(\d{3})(?=\d)/g;

export function currency(value, currency, decimals, separator = '') {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return '';
  currency = currency != null ? currency : '￥';
  decimals = decimals != null ? decimals : 2;
  var stringified = Math.abs(value).toFixed(decimals);
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? separator : '') : '';
  var _float = decimals ? stringified.slice(-1 - decimals) : '';
  var sign = value < 0 ? '-' : '';
  return (
    sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
  );
}

/**
 * 格式化时间
 * @param time
 * @param format
 * @returns {*}
 */
export function timeFormat(time, format) {
  if (!time) return '';
  format = format != null ? format : 'YYYY-MM-DD HH:mm:ss';
  return moment(time).format(format);
}
/* 格式化显示手机号 159 9999 9999
show boolean 表示是否隐藏中间的手机号 默认false
*/
export function telFormat(tel, show) {
  if (!tel) return '';
  let startTel = tel.slice(0, 3);
  let midTel;
  if (show) {
    midTel = '****';
  } else {
    midTel = tel.slice(3, 7);
  }
  let endTel = tel.slice(7, 11);
  return `${startTel} ${midTel} ${endTel}`;
}

/**
 * 格式化时间 -> 转化为天
 * @param time
 * @param format
 * @returns {*}
 */
export function timeFormatToDays(time) {
  if (!time) return '';
  return moment(time).diff(moment(), 'days') + 1;
}
/**
 * 格式化车牌 -> 鄂A88888 ->  鄂A 88888
 * @param time
 * @param format
 * @returns {*}
 */
export function carIdFormat(val) {
  if (!val) return '';
  let pre = val.slice(0, 2);
  let end = val.slice(2);
  return `${pre} ${end}`;
}
