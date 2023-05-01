export const containFields = (obj: any, ...fields: string[]): boolean => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (obj[field] === undefined) {
      return false;
    }
  }
  return true;
}

export const noOp = () => {};