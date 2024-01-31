// AppProvider.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const AppContext = createContext<any>(null);
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <AppContext.Provider value={{ count, incrementCount }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
