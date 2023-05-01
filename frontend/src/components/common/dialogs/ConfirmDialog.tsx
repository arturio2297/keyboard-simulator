import {ReactNode} from "react";
import {Action} from "../../../contracts/common.contracts";
import Modal from "../../../ui/modal/Modal";
import Button from "../../../ui/button/Button";

export interface ConfirmDialogProps {
  title?: ReactNode;
  text?: ReactNode;
  onConfirm?: Action;
  onCancel?: Action;
}

function ConfirmDialog(props: ConfirmDialogProps): JSX.Element {

  return (
    <Modal
      show
      onClose={props.onCancel}
      onBackdropClick={props.onCancel}
      header={<b>{props.title}</b>}
      body={<p>{props.text}</p>}
      footer={
        <>
          {!!props.onCancel &&
              <Button
                  variant="warning"
                  onClick={props.onCancel}
              >
                  Cancel
              </Button>}
          {props.onConfirm &&
              <Button
                  variant="success"
                  onClick={props.onConfirm}
              >
                  Ok
              </Button>}
        </>
      }
    />
  );
}

export default ConfirmDialog;