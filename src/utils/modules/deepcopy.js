//深度拷贝对象
export function deepCopy(data) {
  // data 是要复制的数组或对象，这样的数组或者对象就是指向新的地址的
  return JSON.parse(JSON.stringify(data));
}
