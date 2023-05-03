import {ReactNode} from "react";
import styles from "./styles.module.css";
import {cs} from "../../utils/styles.utils";

export interface TextProps {
  children: ReactNode;

  variant?: 'light' | 'dark' | 'success' | 'warning' | 'danger';
  fontSize?: number | string;
  fontWeight?: number;
  classname?: string;
}

function Text(props: TextProps): JSX.Element {

  return (
    <p
      className={cs(styles['text'], styles[props.variant || 'dark'], props.classname)}
      style={{fontSize: props.fontSize, fontWeight: props.fontWeight}}
    >
      {props.children}
    </p>
  );
}

export default Text;