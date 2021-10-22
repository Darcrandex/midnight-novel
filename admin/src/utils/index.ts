/**
 * @description 随机字符串
 * @param {number} len 字符串长度
 * @returns {string}
 */
export function randomStr(len = 16): string {
  const l = Math.max(1, Math.min(100, len));
  let str = "_";

  while (str.length < l) {
    str += Math.random()
      .toString(36)
      .slice(2);
  }

  return str.slice(0, l);
}
