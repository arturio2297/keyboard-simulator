import {ReactNode, useCallback, useState} from "react";
import {Action} from "../../contracts/common.contracts";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import {cs, csc} from "../../utils/styles.utils";

export interface ModalProps {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  onClose?: Action;
  onBackdropClick?: Action;
  show?: boolean;
}

function Modal(props: ModalProps): JSX.Element {

  const [mouseModalEnter, setMouseModalEnter] = useState<boolean>(false);

  const onBackdropClick = useCallback(() => {
    !mouseModalEnter && props.onBackdropClick && props.onBackdropClick();
  }, [props.onBackdropClick, mouseModalEnter]);

  return ReactDOM.createPortal(
    <div
      onClick={onBackdropClick}
      className={cs(styles['backdrop'], csc({
        [styles['show']]: !!props.show,
        [styles['hide']]: props.show === false
      }))}
      tabIndex={-1}
    >
      <div className={styles['modal-wrapper']}>
        <div
          onMouseEnter={() => setMouseModalEnter(true)}
          onMouseLeave={() => setMouseModalEnter(false)}
          className={cs(styles['modal'], csc({
            [styles['show']]: !!props.show,
            [styles['hide']]: props.show === false
          }))}>
          {props.header &&
              <div className={styles['header']}>
                {props.header}
              </div>}
          {props.body &&
              <div className={styles['body']}>
                {props.body}
              </div>}
          {props.footer &&
              <div className={styles['footer']}>
                {props.footer}
              </div>}
        </div>
      </div>
    </div>,
    (document.getElementById('modal-portal') as HTMLElement)
  )
}

export default Modal;