export const isCaseSensitive = (value: string): boolean => {
  return value.toLowerCase() !== value.toUpperCase();
}

export const isCaseInsensitive = (value: string): boolean => {
  return !isCaseInsensitive(value);
}

export const equalsIgnoreCase = (value1: string, value2: string): boolean => {
  return value1.toLowerCase() === value2.toLowerCase();
}

export const isUppercase = (value: string): boolean => {
  return value === value.toUpperCase();
}

export const isLowercase = (value: string): boolean => {
  return value === value.toLowerCase();
}

export const includesIgnoreCase = (value1: string, value2: string): boolean => {
  return value1.toLowerCase().includes(value2.toLowerCase());
}