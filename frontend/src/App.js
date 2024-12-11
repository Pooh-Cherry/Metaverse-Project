import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "@contexts/AuthContext";
import Router from "./router";
import Sidebar from "./components/layouts/sidebar";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <AuthProvider>
          <BrowserRouter>
            <Sidebar />
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </WebSocketProvider>
    </Provider>
  );
}

export default App;
