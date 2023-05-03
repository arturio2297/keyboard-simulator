export const isObject = <T extends {}>(obj: any, fields: Array<keyof T>): obj is T => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (obj[field] === undefined) {
      return false;
    }
  }
  return true;
}

export const noOp = () => {};