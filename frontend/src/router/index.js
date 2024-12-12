import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import withAuth from "../components/layouts/WithAuth";
import FlowChart from "../pages/Flow";
import Emails from "../pages/Emails";
import Embeddings from "../pages/Embeddings";

const Signin = lazy(() => import("../pages/Signin"));
const Inbox = lazy(() => import("../pages/Inbox"));
const List = lazy(() => import("../pages/List"));

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/chat" element={withAuth(Inbox)()} />
        <Route path="/" element={withAuth(List)()} />
        <Route path="/flow" element={withAuth(FlowChart)()} />
        <Route path="/emails" element={withAuth(Emails)()} />
        <Route path="/embeddings" element={withAuth(Embeddings)()} />
      </Routes>
    </Suspense>
  );
};

export default Router;
