import styles from "./styles.module.css";
import {ReactNode} from "react";

export interface SelectItem {
  title: string;
  value: string | number;
}

export interface SelectProps {
  onChange: (value: string) => void;
  value: string | number;
  items: SelectItem[];

  label?: ReactNode;
  default?: string;
}

function Select(props: SelectProps):JSX.Element {

  return (
    <div className={styles['form-control']}>
      {props.label &&
      <label className={styles['label']}>
        {props.label}
      </label>}
      <select
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      >
        {props.items.map((item, itemI) =>
        <option key={itemI} value={item.value}>
          {item.title}
        </option>)}
        {props.default && <option disabled value="">
          {props.default}
        </option>}
      </select>
    </div>
  );
}

export default Select;