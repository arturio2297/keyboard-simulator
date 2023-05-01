import Button, {ButtonProps} from "../button/Button";
import {OnChange} from "../../contracts/common.contracts";
import {ChangeEvent, MutableRefObject, ReactNode, useRef} from "react";

const accept = ['png', 'jpg', 'jpeg', 'bmp'];

export interface FileInputProps {
  onChange: OnChange<File>;

  buttonProps?: ButtonProps;
  children?: ReactNode;
}

function FileInput(props: FileInputProps): JSX.Element {

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files.item(0);
    file && props.onChange(file);
    e.target.value = '';
  }

  return (
    <Button
      {...props.buttonProps}
      onClick={() => inputRef.current.click()}
    >
      <input
        hidden
        ref={inputRef}
        type="file"
        multiple={false}
        accept={accept.join(',')}
        onChange={onChange}
      />
      {props.children}
    </Button>
  );
}

export default FileInput;