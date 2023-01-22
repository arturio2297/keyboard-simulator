export const formatNumber = (value: number, fractionDigits = 2): number => {
  if (value === 0) return value;
  return Number(value.toFixed(fractionDigits));
}

export const calcPercent = (current: number | any[], total: number | any[], fractionDigits = 2): number => {
  const _current = Array.isArray(current) ? current.length : current;
  const _total = Array.isArray(total) ? total.length : total;
  if (_current === 0) return 0;
  const value = (_current / _total) * 100;
  return formatNumber(value, fractionDigits);
}