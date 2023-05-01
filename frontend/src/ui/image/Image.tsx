import {ReactNode, useState} from "react";
import {Action, BaseUiComponentProps, Classnames} from "../../contracts/common.contracts";

type ClassnameKeys = 'image' | 'fallback';

export interface ImageProps extends BaseUiComponentProps<ClassnameKeys> {
  src: Link;
  alt: string;

  onError?: Action;
  children?: ReactNode;
}

function Image(props: ImageProps): JSX.Element {

  const classnames = props.classnames || {} as Classnames<ClassnameKeys>;
  const [error, setError] = useState<boolean>(false);

  const onError = () => {
    setError(true);
    props.onError && props.onError();
  }

  if (error) {
    return (
      <div className={classnames.fallback}>
        {props.children}
      </div>
    );
  }

  return (
    <img
      className={classnames.image}
      onError={onError}
      src={props.src}
      alt={props.alt}
    />
  );
}

export default Image;