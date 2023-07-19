export function isdiffWithStack(lhs: any, rhs: any): boolean {
  // 基础类型要求必须完全相同
  // func 也必须要求完全一致
  if (lhs === rhs) return true;

  // 如果是undefined 或者null
  // 上面又不相同，就直接返回false
  if (!lhs || !rhs) return false;

  // 后续的逻辑必须要求对象为object
  const ltype = typeof lhs;
  if (ltype !== 'object') return false;
  if (ltype !== typeof rhs) return false;

  if (Array.isArray(lhs)) {
    if (!Array.isArray(rhs)) return false;
    if (lhs.length !== rhs.length) return false;

    // 不能使用every，[,2] 会直接跳过第一个元素的判断
    // return lhs.every((item, index) => isdiffWithStack(item, rhs[index]));

    for (let i = lhs.length; i--;) {
      if (!isdiffWithStack(lhs[i], rhs[i])) return false;
    }
    return true;
  }

  if (Array.isArray(rhs)) return false;

  // const lkeys = Object.keys(lhs);
  // const rkeys = Object.keys(rhs);

  // 不能直接判断keys的长度，需要考虑undefined
  // if (lkeys.length !== rkeys.length) return false;

  const hasCheckedKeys: { [key: string]: true } = Object.create(null);
  return Object.keys(lhs).every((key) => {
    const ret = isdiffWithStack(lhs[key], rhs[key]);
    if (ret) hasCheckedKeys[key] = true;
    return ret;
  })
    && Object.keys(rhs).every((key) => {
      if (hasCheckedKeys[key] !== true) {
        return isdiffWithStack(lhs[key], rhs[key]);
      }
      return true;
    });
}
