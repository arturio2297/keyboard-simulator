import React, {lazy} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Suspense from "./components/common/suspence/Suspense";
import urls from "./urls";

const MainPage = lazy(() => import("./components/pages/main/MainPage"));
const RegistrationPage = lazy(() => import("./components/pages/registration/RegistrationPage"));
const LoginPage = lazy(() => import("./components/pages/login/LoginPage"));
const WorkoutPage = lazy(() => import("./components/pages/workout/WorkoutPage"));
const StatisticPage = lazy(() => import("./components/pages/statistic/StatisticPage"));
const AboutPage = lazy(() => import("./components/pages/about/AboutPage"));

function App(): JSX.Element {

  return (
    <Router>
      <Routes>
        <Route path={urls.main} element={<Suspense><MainPage/></Suspense>}/>
        <Route path={urls.login} element={<Suspense><LoginPage/></Suspense>}/>
        <Route path={urls.registration} element={<Suspense><RegistrationPage/></Suspense>}/>
        <Route path={urls.workout} element={<Suspense><WorkoutPage/></Suspense>}/>
        <Route path="/stats" element={<Suspense><StatisticPage/></Suspense>}/>
        <Route path="/about" element={<Suspense><AboutPage/></Suspense>}/>
        <Route path="*" element={<Navigate to={urls.main}/>}/>
      </Routes>
    </Router>
  );
}

export default observer(App);
