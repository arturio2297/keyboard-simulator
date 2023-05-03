import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs} from "../../../utils/styles.utils";
import urls from "../../../urls";
import IconButton from "../../../ui/icon-button/IconButton";
import {GitHub, Home, Info} from "react-feather";
import Link from "../../../ui/link/Link";

export interface FooterProps {
  classname?: string;
}

function Footer(props: FooterProps): JSX.Element {

  return (
    <footer className={cs(styles['footer'], props.classname)}>
      <div className={styles['navigation']}>
        <Link
          href={urls.main}
          underline="none"
        >
          <IconButton variant="dark">
            <Home/>
            Home
          </IconButton>
        </Link>
        <Link
          href={urls.about}
          underline="none"
        >
          <IconButton variant="dark">
            <Info/>
            About
          </IconButton>
        </Link>
      </div>
      <Link
        href="https://github.com/arturio2297/keyboard-simulator"
        external
        underline="none"
      >
        <IconButton variant="dark">
          <GitHub/>
          GitHub
        </IconButton>
      </Link>
    </footer>
  );
}

export default observer(Footer);