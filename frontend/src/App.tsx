import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ApplicationRoutes from "./components/routes/ApplicationRoutes";
import useStores from "./hooks/useStores";
import ErrorDialog from "./components/common/dialogs/ErrorDialog";

function App(): JSX.Element {

  const {uiStore} = useStores();
  const {error} = uiStore;

  return (
    <Router>
      <ApplicationRoutes/>
      {error &&
          <ErrorDialog
              onClose={() => uiStore.setError(null)}
              error={error}
          />}
    </Router>
  );
}

export default observer(App);
