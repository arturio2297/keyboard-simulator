import {ReactNode} from "react";
import {Action} from "../../contracts/common.contracts";
import {cs, csc} from "../../utils/styles.utils";
import styles from "./styles.module.css";

export interface ButtonProps {
  onClick?: Action;
  children?: ReactNode;
  classname?: string;
  variant?: 'light' | 'dark' | 'success' | 'danger' | 'warning' | 'text';
  type?: 'button' | 'submit';
  loading?: boolean;
  loader?: ReactNode;
  disabled?: boolean;
}

function Button(props: ButtonProps): JSX.Element {

  const variant = props.variant || 'light';

  return (
    <button
      className={cs(styles['button'], 'with-title', styles[variant], props.classname, csc({
        [styles['loading']]: !!props.loading
      }))}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled || props.loading}
    >
      {props.loading ? (props.loader || 'Loading...') : props.children}
    </button>
  );
}

export default Button;