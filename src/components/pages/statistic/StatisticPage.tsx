import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs, csc} from "../../../utils/styles.utils";
import Button from "../../../ui/button/Button";
import useClose from "../../../hooks/useClose";
import {useNavigate} from "react-router-dom";
import TotalSection from "./total/TotalSection";
import ListSection from "./list/ListSection";
import useStores from "../../../hooks/useStores";
import {useState} from "react";
import Modal from "../../../ui/modal/Modal";

interface State {
  showClearWarningModal: boolean;
}

const initialState: State = {
  showClearWarningModal: false
}

function StatisticPage(): JSX.Element {

  const [closed, close] = useClose();
  const [state, setState] = useState<State>(initialState);
  const navigate = useNavigate();
  const {simulationStore} = useStores();
  const {sessionsResults} = simulationStore;

  const onBackClick = () => {
    close(() => {
      navigate('/');
    });
  }

  const onConfirmClearStatisticClick = () => {
    simulationStore.clearStatistic();
    setState({...state, showClearWarningModal: false});
  }

  const onClearStatisticClick = () => {
    setState({...state, showClearWarningModal: true});
  }

  const onCloseClearStatisticClick = () => {
    setState({...state, showClearWarningModal: false});
  }

  return (
    <main className={styles['statistic-page']}>
      <div className={cs(styles['inner'], 'section-appearance', csc({
        'section-disappearance': closed
      }))}>
        <div className={styles['header']}>
          <Button onClick={onBackClick}>
            Back
          </Button>
          {!!sessionsResults.length &&
          <Button
              onClick={onClearStatisticClick}
              variant="warning"
          >
              Clear statistic
          </Button>}
        </div>
        <div className={styles['segment']}>
          <TotalSection/>
          <ListSection/>
        </div>
      </div>
      {state.showClearWarningModal &&
      <Modal
          body={
            <>
              <p>Are you sure you want to clear all statistics?</p>
            </>
          }
          footer={
            <>
              <Button
                variant="danger"
                onClick={onCloseClearStatisticClick}
              >
                Cancel
              </Button>
              <Button
                variant="success"
                onClick={onConfirmClearStatisticClick}
              >
                Confirm
              </Button>
            </>
          }
          show
      />}
    </main>
  );
}

export default observer(StatisticPage);