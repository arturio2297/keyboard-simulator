import {BaseUiComponentProps, Classnames, OnChange} from "../../contracts/common.contracts";
import {ChangeEvent, HTMLInputTypeAttribute, ReactNode} from "react";
import styles from "./styles.module.css";
import {cs, csc} from "../../utils/styles.utils";

type ClassnameKeys = 'container' | 'label' | 'inputContainer' | 'input' | 'error';

export interface InputProps extends BaseUiComponentProps<ClassnameKeys> {
  name: string;
  value: string;
  onChange: OnChange<ChangeEvent<HTMLInputElement>>;

  placeholder?: string;
  type?: HTMLInputTypeAttribute
  label?: ReactNode;
  error?: string;
  touched?: boolean;
  readOnly?: boolean;
  children?: ReactNode;
}

function Input(props: InputProps): JSX.Element {

  const classnames = props.classnames || {} as Classnames<ClassnameKeys>;

  return (
    <div className={cs(styles['container'], classnames.container)}>
      {props.label &&
          <label className={classnames.label}>
            {props.label}
          </label>}
      <div className={cs(styles['input-container'], classnames.inputContainer)}>
        <input
          className={classnames.input}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          type={props.type}
          readOnly={props.readOnly}
        />
        {props.children}
      </div>
      <div className={cs(styles['error'], classnames.error, csc({
        [styles['show']]: !!(props.touched && props.error)
      }))}>
        {props.error || 'error'}
      </div>
    </div>
  );
}

export default Input;