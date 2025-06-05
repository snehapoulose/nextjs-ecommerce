"use client";

import { ReactNode } from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";

type ReduxProviderProps = {
  children: ReactNode;
};

export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
