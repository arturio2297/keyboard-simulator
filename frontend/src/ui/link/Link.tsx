import {ReactNode} from "react";
import styles from "./styles.module.css";
import {NavLink} from "react-router-dom";
import {cs} from "../../utils/styles.utils";

export interface LinkProps {
  href: Link;

  variant?: 'light' | 'dark';
  underline?: 'none' | 'hover';
  external?: boolean;
  children?: ReactNode;
  classname?: string;
}

function Link(props: LinkProps): JSX.Element {

  const classname = cs(styles['link'], styles[props.variant || ''], styles[props.underline || ''], props.classname);

  if (props.external) {
    return (
      <a
        className={classname}
        href={props.href}
        target="_blank"
        rel="noreferrer"
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <NavLink
        className={classname}
        to={props.href}
      >
        {props.children}
      </NavLink>
    );
  }
}

export default Link;