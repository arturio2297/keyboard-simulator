export const getTotal = <T extends {}>(items: T[], field: keyof T): number => {
  return items.reduce((total, item) => total += (item[field] as number), 0);
}