import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";

function ContentSection(): JSX.Element {

  return (
    <section className={styles['content-section']}>

    </section>
  );
}

export default observer(ContentSection);