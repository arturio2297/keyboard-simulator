import {ReactNode} from "react";
import styles from "./styles.module.css";

export interface LoaderProps {
  children?: ReactNode;
}

function Loader(props: LoaderProps): JSX.Element {

  return (
    <div className={styles['loader-wrapper']}>
        <div className={styles['loader']}>
          <div className={styles['indicator']}/>
          <div className={styles['text']}>
            {props.children || 'Loading...'}
          </div>
        </div>
    </div>
  );
}

export default Loader;