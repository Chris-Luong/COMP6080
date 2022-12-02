import React, { createContext } from 'react';

export const initialValue = {
  token: null,
  user: null,
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;
