export type Action = () => void;
export type LoadingState<T extends string> = Partial<Record<T, boolean>>;