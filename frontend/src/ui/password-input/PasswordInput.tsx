import Input, {InputProps} from "../input/Input";
import styles from "./styles.module.css";
import {useState} from "react";
import IconButton from "../icon-button/IconButton";
import {Eye, EyeOff} from "react-feather";

export interface PasswordInputProps extends InputProps {
}

function PasswordInput(props: PasswordInputProps): JSX.Element {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
    >
      <IconButton
        classname={styles['button']}
        type="button"
        variant="text"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff/> : <Eye/>}
      </IconButton>
    </Input>
  );
}

export default PasswordInput;