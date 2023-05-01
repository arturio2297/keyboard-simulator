import {observer} from "mobx-react-lite";
import {Action} from "../../../contracts/common.contracts";
import ConfirmDialog from "./ConfirmDialog";
import {ApiError} from "../../../contracts/api/error.contracts";

export interface ErrorDialogProps {
  error: ErrorMessage | ApiError;
  onClose: Action;
}

function ErrorDialog(props: ErrorDialogProps): JSX.Element {

  return (
    <ConfirmDialog
      title="Oops. There seems to be a small problem"
      text={typeof props.error === 'string' ? props.error : props.error.message}
      onConfirm={props.onClose}
    />
  );
}

export default observer(ErrorDialog);