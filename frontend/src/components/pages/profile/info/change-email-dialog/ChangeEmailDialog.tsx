import {observer} from "mobx-react-lite";
import {Action, OnChange} from "../../../../../contracts/common.contracts";
import ConfirmDialog from "../../../../common/dialogs/ConfirmDialog";

interface Props {
  onCancel: Action;
  onConfirm: OnChange<Email>;
}

function ChangeEmailDialog(props: Props): JSX.Element {

  const onConfirm = () => {

  }

  return (
    <ConfirmDialog
      onCancel={props.onCancel}
      onConfirm={onConfirm}
    />
  );
}

export default observer(ChangeEmailDialog);