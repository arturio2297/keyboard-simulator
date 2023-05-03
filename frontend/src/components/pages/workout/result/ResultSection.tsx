import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../../hooks/useStores";
import Button from "../../../../ui/button/Button";
import {cs, csc} from "../../../../utils/styles.utils";
import Text from "../text/Text";
import Progress from "../progress/Progress";
import useClose from "../../../../hooks/useClose";

function ResultSection():JSX.Element {

  const [closed, close] = useClose();
  const {workoutStore} = useStores();

  const onStartAgainClick = () => {
    close(() => workoutStore.reset());
  }

  return (
    <section className={styles['result-section']}>
      <div className={cs(styles['inner'], 'section-appearance', csc({
        'section-disappearance': closed
      }))}>
        <Text/>
        <div className={styles['segment']}>
          <Progress
            showFields={['accuracy', 'speed', 'time']}
            showDiffs
          />
          <Button onClick={onStartAgainClick}>
            Start again
          </Button>
        </div>
      </div>
    </section>
  );
}

export default observer(ResultSection);