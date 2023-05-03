import styles from "./styles.module.css";
import {ReactNode} from "react";
import {cs, csc} from "../../utils/styles.utils";
import {Formik, OnChange} from "../../contracts/common.contracts";

export interface CheckboxProps<D extends {}> {
  name: keyof D & string;

  value?: boolean;
  formik?: Formik<D>;
  onChange?: OnChange<boolean>;
  variant?: 'light' | 'dark';
  label?: ReactNode;
}

function Checkbox<D extends {}>(props: CheckboxProps<D>): JSX.Element {

  const value = props.value || (props.formik && props.formik.values[props.name]) as boolean;

  const onChange = () => {
    if (props.onChange) {
      props.onChange(!value);
    }
    if (props.formik) {
      props.formik.setFieldValue(props.name, !value, true);
    }
  }

  return (
    <div
      className={cs(styles['form-control'], styles[props.variant || 'light'])}
      onClick={onChange}
    >
      <div className={styles['checkbox']}>
        <div className={cs(styles['marker'], csc({
          [styles['checked']]: value
        }))}/>
      </div>
      {props.label &&
          <label className={styles['label']}>
            {props.label}
          </label>}
    </div>
  );
}

export default Checkbox;