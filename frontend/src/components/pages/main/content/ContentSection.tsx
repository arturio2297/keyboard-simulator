import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Button from "../../../../ui/button/Button";
import {NavLink} from "react-router-dom";
import urls from "../../../../urls";

function ContentSection(): JSX.Element {

  return (
    <section className={styles['content-section']}>
      <NavLink to={urls.workout}>
        <Button variant="success">
          Let`s Go Workout!
        </Button>
      </NavLink>
    </section>
  );
}

export default observer(ContentSection);