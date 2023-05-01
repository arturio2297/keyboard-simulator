import Image from "../image/Image";
import styles from "./styles.module.css";
import {cs} from "../../utils/styles.utils";
import {User} from "react-feather";

export interface AvatarProps {
  userId: UniqueId;

  loading?: boolean;
  classname?: string;
  variant?: 'light' | 'dark';
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
}

function Avatar(props: AvatarProps): JSX.Element {

  const size = props.size || 'm';
  const variant = props.variant || 'light';

  if (props.loading) {
    return (
      <div className={cs(styles['avatar'], styles[size], styles[variant], props.classname)}/>
    );
  }

  return (
    <Image
      classnames={{
        image: cs(styles['avatar'], styles[size], styles[variant], props.classname),
        fallback: cs(styles['fallback'], styles[size], styles[variant], props.classname)
      }}
      src={`/api/v1/user/avatar/${props.userId}`}
      alt="avatar"
    >
      <User/>
    </Image>
  );
}

export default Avatar;