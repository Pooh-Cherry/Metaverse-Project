import React, { useState, lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import withAuth from "../components/layouts/WithAuth";
import FlowChart from "../pages/flow";
import Emails from "../pages/emails";
import Embeddings from "../pages/embeddings";
import RightChatbot from "../components/layouts/RightChatbot";

const Signin = lazy(() => import("../pages/Signin"));
const Messages = lazy(() => import("../pages/Messages"));
const List = lazy(() => import("../pages/List"));

const Router = () => {
  const location = useLocation();
  const [showChatbot, setShowChatbot] = useState(true);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/chat" element={withAuth(Messages)()} />
        <Route path="/" element={withAuth(List)()} />
        <Route path="/flow" element={withAuth(FlowChart)()} />
        <Route path="/emails" element={withAuth(Emails)()} />
        <Route path="/embeddings" element={withAuth(Embeddings)()} />
      </Routes>

      {/* Conditionally render Messages component if on /flow path */}
      {location.pathname === "/flow" && showChatbot && (
        <RightChatbot onClose={() => setShowChatbot(false)} />
      )}
    </Suspense>
  );
};

export default Router;
