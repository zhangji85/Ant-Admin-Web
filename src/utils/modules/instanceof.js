// 数据类型&是否为空判断
// 返回 true or false
/**
 * type参数值String Null
 * type参数值String Undefined
 * type参数值String Object
 * type参数值String Array
 * type参数值String String
 * type参数值String Number
 * type参数值String Boolean
 * type参数值String Function
 * type参数值String RegExp
 */
export function dataTypeof(data, type, notEmpty = false) {
  if (Object.prototype.toString.call(data) == `[object ${type}]`) {
    if (notEmpty && !data && !data.length && JSON.stringify(data) == '{}') {
      return false;
    }
    return true;
  }
  return false;
}
