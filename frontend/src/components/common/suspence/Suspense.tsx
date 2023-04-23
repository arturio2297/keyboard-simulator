import {ReactNode, Suspense as DefaultSuspense} from "react";
import Loader from "../../../ui/loader/Loader";

export interface SuspenseProps {
  children: ReactNode;

  fallback?: ReactNode;
  loaderChildren?: ReactNode;
}

function Suspense(props: SuspenseProps): JSX.Element {

  return (
    <DefaultSuspense
      fallback={props.fallback || <Loader>{props.loaderChildren}</Loader>}
    >
      {props.children}
    </DefaultSuspense>
  );
}

export default Suspense;