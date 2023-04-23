export enum TimeFormat {
  HH_MM_SS = 'hh_mm_ss',
  MM_SS = 'mm_ss',
  SS = 'ss'
}

export const formatTime = (value: number, format: TimeFormat = TimeFormat.MM_SS): string => {
  const hh = Math.floor(value / 3600);
  const mm = Math.floor((value - hh * 3600) / 60);
  const ss = Math.floor(value - mm * 60 - hh * 3600);
  return Object.entries({ hh, mm, ss })
    .filter(([key, _]) => format.includes(key))
    .map(([_, value]) => value < 10 ? '0' + value : value)
    .join(':');
}