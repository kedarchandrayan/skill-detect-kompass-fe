import React from "react";
import { UserContextValue } from "./types";

const defaultContextValue: UserContextValue = {
  user: {},
};

const UserContext = React.createContext(defaultContextValue);

export const UserProvider = function ({ children }: any) {
  return (
    <UserContext.Provider value={defaultContextValue}>
      {children}
    </UserContext.Provider>
  );
};
