import { Socket, io } from "socket.io-client";
import React, { Dispatch } from "react";
import config from "@/config";
//============types
export enum PaintActionTypes {
  SET_COLOR = "SET_COLOR",
  SET_STROKE_WIDTH = "SET_STROKE_WIDTH",
}
export interface IAction<T> {
  type: PaintActionTypes;
  payload: T;
}
export interface IPaintState {
  dispatch: React.Dispatch<IAction<string | null | number>>;
  currentColor: string;
  strokeWidth: number;
  paintSocket: Socket | null;
}

//============functions
export const setCurrentColor = (color: string, dispacth: Dispatch<IAction<string>>) => {
  dispacth({
    type: PaintActionTypes.SET_COLOR,
    payload: color,
  });
};

export const setCurrentStrokeWidth = (width: number, dispatch: Dispatch<IAction<number>>) => {
  dispatch({
    type: PaintActionTypes.SET_STROKE_WIDTH,
    payload: width,
  });
};

//============Reducer functions
export const paintReducer = (state: IPaintState, action: IAction<string | null | number>): IPaintState => {
  switch (action.type) {
    case PaintActionTypes.SET_COLOR: {
      return { ...state, currentColor: action.payload as string };
    }
    case PaintActionTypes.SET_STROKE_WIDTH: {
      return { ...state, strokeWidth: action.payload as number };
    }
    default: {
      return { ...state };
    }
  }
};

//============inital state
export const initialState: IPaintState = {
  dispatch: () => null,
  currentColor: "#000",
  strokeWidth: 1,
  paintSocket: null,
};

//============context
export const PaintContext = React.createContext(initialState);

//============variables
const paintSocket: Socket = io(config.host, { path: "/paint" });
//============state
export default function PaintState({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(paintReducer, initialState);
  React.useEffect(() => {
    paintSocket.on("connect", () => {
      console.log("connected to paint socket");
    });
    paintSocket.on("disconnect", () => {
      console.log("disconnected from paint socket");
    });
  }, []);

  return <PaintContext.Provider value={{ ...state, paintSocket, dispatch }}>{children}</PaintContext.Provider>;
}
