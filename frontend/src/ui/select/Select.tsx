import styles from "./styles.module.css";
import {ChangeEvent, ReactNode} from "react";
import {Formik, OnChange} from "../../contracts/common.contracts";

export interface SelectItem {
  title: string;
  value: string | number;
}

export interface SelectProps<T extends string | number, D extends {}> {
  name: keyof D & string;
  items: SelectItem[];

  value?: T;
  type?: 'string' | 'number';
  formik?: Formik<D>;
  onChange?: OnChange<T>;
  label?: ReactNode;
  default?: string;
}

function Select<T extends string | number, D extends {}>(props: SelectProps<T, D>):JSX.Element {

  const value = props.value || (props.formik && props.formik.values[props.name]) as T;

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = (props.type === 'number' ? Number(e.target.value) : e.target.value) as T;
    if (props.onChange) {
      props.onChange(value);
    }
    if (props.formik) {
      props.formik.setFieldValue(props.name, value, true);
    }
  }

  return (
    <div className={styles['form-control']}>
      {props.label &&
      <label className={styles['label']}>
        {props.label}
      </label>}
      <select
        value={value}
        onChange={onChange}
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