import styles from "./styles.module.css";
import {cs} from "../../utils/styles.utils";

export interface SpinnerProps {
  classname?: string;

  size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
}

function Spinner(props: SpinnerProps): JSX.Element {

  return (
    <div className={cs(styles['spinner'], styles[props.size || 'm'], props.classname)}>
      <div/>
    </div>
  );
}

export default Spinner;