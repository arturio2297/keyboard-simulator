export type Action = () => void;
export type OnChange<T> = (value: T) => void;
export type LoadingState<T extends string> = Partial<Record<T, boolean>>;
export type Classnames<T extends string> = Partial<Record<T, string>>;
export interface BaseUiComponentProps<T extends string> {
  classnames?: Classnames<T>;
}