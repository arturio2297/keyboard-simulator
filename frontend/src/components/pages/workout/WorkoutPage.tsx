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

  const {workoutStore} = useStores();
  const {loading} = workoutStore;

  return (
    <main className={styles['workout-page']}>
      {workoutStore.isStatus(SimulationStatus.NONE) &&
          <>
              <Header classname="fixed-header"/>
              <StartSection/>
              <Footer classname="fixed-footer"/>
          </>}
      {workoutStore.isStatus(SimulationStatus.READY, SimulationStatus.START, SimulationStatus.PAUSE, SimulationStatus.END) &&
          <SimulationSection/>}
      {workoutStore.isStatus(SimulationStatus.RESULT) &&
          <ResultSection/>}
      {loading.fetchText &&
          <Loader>
              Text generation...
          </Loader>}
      {loading.addSessionResult &&
          <Loader>
              Save result...
          </Loader>}
    </main>
  );
}

export default observer(WorkoutPage);