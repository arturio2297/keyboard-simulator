import {ReactNode} from "react";
import {Action} from "../../contracts/common.contracts";
import {cs} from "../../utils/styles.utils";
import styles from "./styles.module.css";

export interface ButtonProps {
  onClick?: Action;
  children?: ReactNode;
  classname?: string;
  variant?: 'light' | 'dark' | 'success' | 'danger' | 'warning';
}

function Button(props: ButtonProps):JSX.Element {

  const variant = props.variant || 'light';

  return (
    <button
      className={cs(styles['button'], 'with-title', styles[variant], props.classname)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;