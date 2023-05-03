import {observer} from "mobx-react-lite";
import {Action} from "../../../contracts/common.contracts";
import ConfirmDialog from "./ConfirmDialog";
import {ApiError, ServerError} from "../../../contracts/api/error.contracts";
import {isObject} from "../../../utils/object.utils";

type Error = ErrorMessage | ServerError;

export interface ErrorDialogProps {
  error: ErrorMessage | ServerError;
  onClose: Action;
}

const getErrorMessage = (error: Error): ErrorMessage => {
  if (typeof error === 'string') {
    return error;
  }
  if (isObject<ApiError>(error, ['message', 'code'])) {
    return error.message;
  }
  return 'Unknown server error. Don\'t worry, we\'ll fix it soon';
}

function ErrorDialog(props: ErrorDialogProps): JSX.Element {

  return (
    <ConfirmDialog
      title="Oops. There seems to be a small problem"
      text={getErrorMessage(props.error)}
      onConfirm={props.onClose}
    />
  );
}

export default observer(ErrorDialog);