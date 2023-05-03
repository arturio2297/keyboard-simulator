import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs} from "../../../utils/styles.utils";
import urls from "../../../urls";
import Button from "../../../ui/button/Button";
import IconButton from "../../../ui/icon-button/IconButton";
import {GitHub} from "react-feather";
import Link from "../../../ui/link/Link";

export interface FooterProps {
  hideAboutPageLink?: boolean;
  classname?: string;
}

function Footer(props: FooterProps): JSX.Element {

  return (
    <footer className={cs(styles['footer'], props.classname)}>
      {props.hideAboutPageLink
        ? <div/>
        : <Link
          href={urls.about}
          underline="none"
        >
          <Button variant="dark">
            About This Application
          </Button>
        </Link>}
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