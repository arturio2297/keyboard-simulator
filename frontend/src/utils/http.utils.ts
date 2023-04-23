export const getParams = <T extends {}>(value: T): string => {
  if (!Object.values(value)) return '';
  const params = new URLSearchParams();
  for (const key in value) {
    params.append(key, value[key as keyof T] + '');
  }
  return '?' + params.toString();
}