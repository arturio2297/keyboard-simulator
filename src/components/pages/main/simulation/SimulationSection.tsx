import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Text from "../text/Text";
import Keyboard from "./keyboard/Keyboard";
import {useEffect} from "react";
import useStores from "../../../../hooks/useStores";
import Progress from "../progress/Progress";
import Modal from "../../../../ui/modal/Modal";
import {SimulationStatus} from "../../../../contracts/simulation.contracts";
import {cs, csc} from "../../../../utils/styles.utils";
import Button from "../../../../ui/button/Button";
import useClose from "../../../../hooks/useClose";

function SimulationSection():JSX.Element {

  const [closed, close] = useClose();
  const {simulationStore} = useStores();
  const {status} = simulationStore;

  useEffect(() => {

    const keyUpListener = (e: KeyboardEvent) => {
      e.preventDefault();
      let key = e.key;
      switch (e.code) {
        case 'Enter':
          key = 'nl';
          break;
      }
      simulationStore.press(key, e.code);
    }

    document.addEventListener('keyup', keyUpListener);

    return () => {
      document.removeEventListener('keyup', keyUpListener);
    }
  }, []);

  useEffect(() => {
    simulationStore.isStatus(SimulationStatus.END) && close();
  }, [status]);

  const onStartClick = () => {
    simulationStore.start();
  }

  const onContinueClick = () => {
    simulationStore.continue();
  }

  const onRestartClick = () => {
    close(() => simulationStore.reset());
  }

  return (
    <section className={styles['simulation-section']}>
      <div className={cs(styles['inner'], 'section-appearance', csc({
        'section-disappearance': closed
      }))}>
        <Text
          showCurrentIndication
        />
        <Keyboard/>
        <Progress
          showAllFields
          showCompleteIndication
        />
      </div>
      {simulationStore.isStatus(SimulationStatus.READY) &&
      <Modal
          body={
            <>
              <p>
                To start, press any key or click to <b>"Start"</b>
              </p>
              <p>
                To pause, press to <b>"Escape"</b> on your own or virtual keyboard
              </p>
              <p>
                Your progress is displayed at the bottom of the screen.
                Successful work!
              </p>
            </>
          }
          footer={
            <>
              <Button
                onClick={onStartClick}
                variant="success"
              >
                Start
              </Button>
            </>
          }
          show
      />}
      {(simulationStore.isStatus(SimulationStatus.PAUSE) && !closed) &&
      <Modal
          body={
            <>
              <p>
                To continue, press any key or click to <b>"Continue"</b>.
              </p>
              <p>
                Click to <b>"Restart"</b> to start again
              </p>
            </>
          }
          footer={
            <>
              <Button
                onClick={onRestartClick}
                variant="warning"
              >
                Restart
              </Button>
              <Button
                onClick={onContinueClick}
                variant="success"
              >
                Continue
              </Button>
            </>
          }
          show
      />}
    </section>
  );
}

export default observer(SimulationSection);