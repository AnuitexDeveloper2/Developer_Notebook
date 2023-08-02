import { createMemoryHistory } from "history";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { RootState } from "../redux/store";
import { Topic, Record } from "../types/content";

const initialState: RootState = {
  headerReducer: {
    openLogin: false,
    openRegister: false,
  },
  authReducer: {},
  contentReducer: { topics: Array<Topic>(), records: Array<Record>() },
};

const middlewares: any = [thunk];
const mockStore = configureStore(middlewares);

export const wrapWithProvider = (
  componentToWrap: JSX.Element,
  state: Partial<RootState> = {}
) => {
  const mockState = Object.keys(state).reduce(
    (acc, item) => ({ ...acc, [item]: state[item] }),
    initialState
  );
  const store = mockStore(mockState);
  return <Provider store={store}>{componentToWrap}</Provider>;
};
