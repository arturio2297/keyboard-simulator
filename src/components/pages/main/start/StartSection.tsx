import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs, csc} from "../../../../utils/styles.utils";
import Button from "../../../../ui/button/Button";
import useStores from "../../../../hooks/useStores";
import {useState} from "react";
import Select from "../../../../ui/select/Select";
import Checkbox from "../../../../ui/checkbox/Checkbox";
import useClose from "../../../../hooks/useClose";
import {useNavigate} from "react-router-dom";

interface State {
  paragraphsCount: number;
  showHints: boolean;
}

const initialState: State = {
  paragraphsCount: 5,
  showHints: true
}

function StartSection(): JSX.Element {

  const [state, setState] = useState<State>(initialState);
  const [closed, close] = useClose();
  const navigate = useNavigate();
  const {simulationStore} = useStores();

  const onStartClick = () => {
    close(() => {
      simulationStore.ready(state.paragraphsCount, state.showHints);
    });
  }

  const onStatisticClick = () => {
    close(() => {
      navigate('/stats');
    });
  }

  const onAboutClick = () => {
    close(() => {
      navigate('/about');
    });
  }

  return (
    <section className={cs(styles['start-section'])}>
      <div className={cs(styles['inner'], 'section-appearance', csc({
        'section-disappearance': closed
      }))}>
        <p>
          Press <b>"Start"</b> to start your workout.
          Before start you can select the number of paragraphs and enable/disable virtual keyboard hints
        </p>
        <div className={styles['settings']}>
          <Select
            onChange={value => setState({...state, paragraphsCount: Number(value)})}
            value={state.paragraphsCount}
            label="Number of paragraphs"
            items={Array.from({length: 10}).map((_, index) => {
              return {
                title: (index + 1) + '',
                value: index + 1
              }
            })}
          />
          <Checkbox
            onChange={value => setState({...state, showHints: value})}
            value={state.showHints}
            label="Show keyboard hints"
          />
        </div>
        <Button
          onClick={onStartClick}
          variant="success"
        >
          Start
        </Button>
        <hr/>
        <p>
          Click on <b>"Statistic"</b> to see the results of all working sessions
        </p>
        <Button onClick={onStatisticClick}>
          Statistic
        </Button>
        <hr/>
        <p>
          Click to <b>"About"</b> to learn more about this application
        </p>
        <Button onClick={onAboutClick}>
          About
        </Button>
      </div>
    </section>
  );
}

export default observer(StartSection);