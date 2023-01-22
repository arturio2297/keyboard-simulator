import styles from "./styles.module.css";
import {ReactNode} from "react";
import {cs, csc} from "../../utils/styles.utils";

export interface CheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;

  label?: ReactNode;
}

function Checkbox(props: CheckboxProps): JSX.Element {

  return (
    <div
      className={styles['form-control']}
      onClick={() => props.onChange(!props.value)}
    >
      {props.label &&
      <label className={styles['label']}>
        {props.label}
      </label>}
      <div className={styles['checkbox']}>
        <div className={cs(styles['marker'], csc({
          [styles['checked']]: props.value
        }))}/>
      </div>
    </div>
  );
}

export default Checkbox;