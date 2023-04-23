import {ApplicationContextValue} from "../contracts/context.contracts";
import {useContext} from "react";
import {ApplicationContext} from "../context/ApplicationContextProvider";

const useStores = ():ApplicationContextValue => {
  return useContext(ApplicationContext);
}

export default useStores;