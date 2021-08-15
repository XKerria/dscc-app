export const sum = (arr, attr = null) => {
  if (!(arr instanceof Array) || !arr.length) return 0
  return arr.reduce((sum, current) => sum + (attr ? current[attr] : current), 0)
}
