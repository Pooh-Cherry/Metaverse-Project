import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import withAuth from "../components/layouts/WithAuth";
import FlowChart from "@pages/flow";
import Emails from "@pages/emails";
import Embeddings from "@pages/embeddings";

const Signin = lazy(() => import("../pages/Signin"));
const Messages = lazy(() => import("../pages/Messages"));
const List = lazy(() => import("../pages/List"));

const Router = () => {
  return (
    <Suspense fallback={<div className=""></div>}>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/chat" element={withAuth(Messages)()} />
        <Route path="/" element={withAuth(List)()} />
        <Route path="/flow" element={withAuth(FlowChart)()} />
        <Route path="/emails" element={withAuth(Emails)()} />
        <Route path="/embeddings" element={withAuth(Embeddings)()} />
      </Routes>
    </Suspense>
  );
};

export default Router;
