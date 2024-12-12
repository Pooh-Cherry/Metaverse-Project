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
            <div className="flex w-full">
              <Sidebar />
              <div className="flex-1 w-full min-w-0">
                <Router />
              </div>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </WebSocketProvider>
    </Provider>
  );
}

export default App;
