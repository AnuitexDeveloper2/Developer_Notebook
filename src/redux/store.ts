import { Store, createStore, applyMiddleware, compose, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { AppState, rootReducer } from './reducers/rootReducer';
import { loadState, saveState } from '../helper/localStorage';

export function configureStore(): Store<AppState> {
  const __REDUX_DEVTOOLS_EXTENSION__ = (window as any).window
    .__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).window.__REDUX_DEVTOOLS_EXTENSION__()
    : null;
  const persistedState = loadState();

  let store: Store<AppState, AnyAction> = null;

  if (__REDUX_DEVTOOLS_EXTENSION__) {
    store = createStore(
      rootReducer,
      persistedState,
      compose(applyMiddleware(thunk), __REDUX_DEVTOOLS_EXTENSION__),
    );
  } else {
    store = createStore(
      rootReducer,
      persistedState,
      compose(applyMiddleware(thunk)),
    );
  }

  store.subscribe(() => {
    saveState(store.getState());
  });
  return store;
}
