import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import FamilyStore from './store/FamilyMembersStore';
import IllnesesStore from './store/IllnesStore';
import MedicinesStore from './store/MedicinesStore';

export const Context = createContext(null);

const root = createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    familyMembers: new FamilyStore(),
    illnes: new IllnesesStore(),
    medicines: new MedicinesStore()
  }}>
    <App />
  </Context.Provider>
);
