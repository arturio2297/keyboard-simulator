import styles from "./styles.module.css";
import {ReactNode} from "react";
import {cs} from "../../utils/styles.utils";

export interface CardProps {
  classname?: string;
  children?: ReactNode;
}

function Card(props: CardProps): JSX.Element {

  return (
    <div className={cs(styles['card'], props.classname)}>
      {props.children}
    </div>
  );
}

export default Card;