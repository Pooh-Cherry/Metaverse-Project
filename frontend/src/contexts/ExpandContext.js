import React, { createContext, useState, useContext } from "react";

// Create the context
const ExpandContext = createContext();

// Provide context
export const ExpandProvider = ({ children }) => {
  const [expand, setExpand] = useState(false);

  return (
    <ExpandContext.Provider value={{ expand, setExpand }}>
      {children}
    </ExpandContext.Provider>
  );
};

// Custom hook to use the expand context
export const useExpand = () => useContext(ExpandContext);
