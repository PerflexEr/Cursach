import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";

export const Context = createContext(null);

const root = createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user: new UserStore(),
  }}>
    <App />
  </Context.Provider>
);