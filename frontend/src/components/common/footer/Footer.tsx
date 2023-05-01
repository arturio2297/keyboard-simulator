import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs} from "../../../utils/styles.utils";
import {NavLink} from "react-router-dom";
import urls from "../../../urls";
import Button from "../../../ui/button/Button";
import IconButton from "../../../ui/icon-button/IconButton";
import {GitHub} from "react-feather";

export interface FooterProps {
  hideAboutPageLink?: boolean;
  classname?: string;
}

function Footer(props: FooterProps): JSX.Element {

  return (
    <footer className={cs(styles['footer'], props.classname)}>
      {props.hideAboutPageLink
        ? <div/>
        : <NavLink to={urls.about}>
          <Button variant="dark">
            About This Application
          </Button>
        </NavLink>}
      <a
        href="https://github.com/arturio2297/keyboard-simulator"
        target="_blank"
        rel="noreferrer"
      >
        <IconButton>
          <GitHub/>
        </IconButton>
      </a>
    </footer>
  );
}

export default observer(Footer);