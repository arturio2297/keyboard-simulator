import {useState} from "react";
import {Action} from "../contracts/common.contracts";

interface Configuration {
  confirm?: Action;
  initialValue?: boolean;
}

const useDialog = (configuration?: Configuration) => {

  const [show, setShow] = useState<boolean>(!!configuration?.initialValue);

  return {
    show,
    open: () => setShow(true),
    close: () => setShow(false),
    confirm: () => {
      configuration?.confirm && configuration.confirm();
      setShow(false);
    }
  }
}

export default useDialog;