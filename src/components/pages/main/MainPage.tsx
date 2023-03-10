import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../hooks/useStores";
import {SimulationStatus} from "../../../contracts/simulation.contracts";
import StartSection from "./start/StartSection";
import SimulationSection from "./simulation/SimulationSection";
import ResultSection from "./result/ResultSection";
import Loader from "../../../ui/loader/Loader";

function MainPage():JSX.Element {

  const {simulationStore} = useStores();
  const {loading} = simulationStore;

  return (
    <main className={styles['main-page']}>
      {simulationStore.isStatus(SimulationStatus.NONE) && <StartSection/>}
      {simulationStore.isStatus(SimulationStatus.READY, SimulationStatus.START, SimulationStatus.PAUSE, SimulationStatus.END) &&
      <SimulationSection/>}
      {simulationStore.isStatus(SimulationStatus.RESULT) &&
      <ResultSection/>}
      {loading.text &&
      <Loader>
          Text generation...
      </Loader>}
    </main>
  );
}

export default observer(MainPage);