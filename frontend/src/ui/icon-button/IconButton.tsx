import Button, {ButtonProps} from "../button/Button";
import styles from "./styles.module.css";
import {cs} from "../../utils/styles.utils";

export interface IconButtonProps extends ButtonProps {
}

function IconButton(props: IconButtonProps): JSX.Element {

  return (
    <Button
      {...props}
      classname={cs(styles['icon-button'], styles[props.variant || 'light'], props.classname)}
    />
  );
}

export default IconButton;