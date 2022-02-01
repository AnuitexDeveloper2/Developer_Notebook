import { Store, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { AppState, rootReducer } from './reducers/rootReducer';
import { loadState, saveState } from "../helper/localStorage";

export function configureStore(): Store<AppState> {

const persistedState = loadState()

  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk),
      // (window as any).window.__REDUX_DEVTOOLS_EXTENSION__
      // ? (window as any).window.__REDUX_DEVTOOLS_EXTENSION__()
      // : null
    ),
  );

  store.subscribe(()=> {
    saveState(store.getState())
  })
  return store;
}
