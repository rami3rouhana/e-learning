import { Dispatch } from 'react';

export interface GlobalStateInterface {
  name: string,
  loggedIn: boolean,
  role: number,
  jwt: string,
  children?: React.ReactNode
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};
