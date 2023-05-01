import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../hooks/useStores";
import {SimulationStatus} from "../../../contracts/simulation.contracts";
import StartSection from "./start/StartSection";
import SimulationSection from "./simulation/SimulationSection";
import ResultSection from "./result/ResultSection";
import Loader from "../../../ui/loader/Loader";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/Header";

function WorkoutPage(): JSX.Element {

  const {simulationStore} = useStores();
  const {loading} = simulationStore;

  return (
    <main className={styles['workout-page']}>
      {simulationStore.isStatus(SimulationStatus.NONE) &&
          <>
              <Header classname="fixed-header"/>
              <StartSection/>
              <Footer classname="fixed-footer"/>
          </>}
      {simulationStore.isStatus(SimulationStatus.READY, SimulationStatus.START, SimulationStatus.PAUSE, SimulationStatus.END) &&
          <SimulationSection/>}
      {simulationStore.isStatus(SimulationStatus.RESULT) &&
          <ResultSection/>}
      {loading.fetchText &&
          <Loader>
              Text generation...
          </Loader>}
    </main>
  );
}

export default observer(WorkoutPage);