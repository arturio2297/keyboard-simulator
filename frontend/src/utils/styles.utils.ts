export const cs = (...classnames: Array<string | undefined>):string => {
  return classnames.filter(x => !!x).join(' ');
}

export const csc = <Classname extends string>(classnamesConditions: Record<Classname, boolean>):string => {
  return Object.entries(classnamesConditions)
    .filter(([classname, condition]) => !!classname && !!condition)
    .map(([classname]) => classname)
    .join(' ');
}