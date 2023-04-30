import {RootStore} from "../stores/RootStore";
import {ApplicationContextValue} from "../contracts/context.contracts";
import {createContext, ReactNode} from "react";

const rootStore = new RootStore();
const contextValue: ApplicationContextValue = {
  rootStore,
  simulationStore: rootStore.simulatorStore,
  registrationStore: rootStore.registrationStore
}

export const ApplicationContext = createContext<ApplicationContextValue>(contextValue);

function ApplicationContextProvider(props: { children: ReactNode }):JSX.Element {
  return (
    <ApplicationContext.Provider value={contextValue}>
      {props.children}
    </ApplicationContext.Provider>
  );
}

export default ApplicationContextProvider;