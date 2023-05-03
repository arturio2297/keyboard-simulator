import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Button from "../../../../ui/button/Button";
import urls from "../../../../urls";
import Link from "../../../../ui/link/Link";

function ContentSection(): JSX.Element {

  return (
    <section className={styles['content-section']}>
      <Link href={urls.workout} underline="none">
        <Button variant="success">
          Let`s Go Workout!
        </Button>
      </Link>
    </section>
  );
}

export default observer(ContentSection);