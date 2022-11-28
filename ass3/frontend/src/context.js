import React, { createContext } from 'react';

export const initialValue = {
  token: null,
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;
