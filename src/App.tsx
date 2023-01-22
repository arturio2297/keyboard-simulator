import React, {lazy} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Suspense from "./components/common/suspence/Suspense";

const MainPage = lazy(() => import("./components/pages/main/MainPage"));
const StatisticPage = lazy(() => import("./components/pages/statistic/StatisticPage"));
const AboutPage = lazy(() => import("./components/pages/about/AboutPage"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Suspense><MainPage/></Suspense>}/>
        <Route path="/stats" element={<Suspense><StatisticPage/></Suspense>}/>
        <Route path="/about" element={<Suspense><AboutPage/></Suspense>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
    </Router>
  );
}

export default observer(App);
