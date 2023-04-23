export const getRandom = <T>(elements:T[]): T => {
  const index = Math.round(Math.random() * (elements.length - 1));
  return elements[index];
}