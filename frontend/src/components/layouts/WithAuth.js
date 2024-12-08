import React, { useEffect } from "react";
import { useAuth } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Replace this with your actual authentication logic

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/signin"); // Redirect to sign-in if not authenticated
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
};

export default withAuth;
