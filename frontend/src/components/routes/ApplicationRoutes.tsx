import React, {lazy} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import urls from "../../urls";
import Suspense from "../common/suspence/Suspense";
import {observer} from "mobx-react-lite";
import useStores from "../../hooks/useStores";

const MainPage = lazy(() => import("../pages/main/MainPage"));
const RegistrationPage = lazy(() => import("../pages/registration/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/login/LoginPage"));
const WorkoutPage = lazy(() => import("../pages/workout/WorkoutPage"));
const AboutPage = lazy(() => import("../pages/about/AboutPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const PasswordRecoveryPage = lazy(() => import("../pages/password-recovery/PasswordRecoveryPage"));

function ApplicationRoutes(): JSX.Element {

  const {accountStore} = useStores();
  const {account} = accountStore;

  return (
    <Routes>
      {account
        ? <>
          <Route path={urls.profile} element={<Suspense><ProfilePage/></Suspense>}/>
        </>
        : <>
          <Route path={urls.login} element={<Suspense><LoginPage/></Suspense>}/>
          <Route path={urls.registration} element={<Suspense><RegistrationPage/></Suspense>}/>
          <Route path={urls.passwordRecovery} element={<Suspense><PasswordRecoveryPage/></Suspense>}/>
        </>}
      <Route path={urls.main} element={<Suspense><MainPage/></Suspense>}/>
      <Route path={urls.workout} element={<Suspense><WorkoutPage/></Suspense>}/>
      <Route path={urls.about} element={<Suspense><AboutPage/></Suspense>}/>
      <Route path="*" element={<Navigate to={urls.main}/>}/>
    </Routes>
  );
}

export default observer(ApplicationRoutes);
