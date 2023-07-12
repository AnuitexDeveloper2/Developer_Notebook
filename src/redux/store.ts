import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from "../helper/localStorage";
import headerReducer from './reducers/headerReducer';
import authReducer from './reducers/authReducer';
import contentReducer from './reducers/contentReducer';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const rootReducer = combineReducers({
  headerReducer,
  authReducer,
  contentReducer
})

export const setupStore = () => {
  const persistedState = loadState();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  });
  store.subscribe(() => {
    saveState(store.getState() as any);
  });
  return store;
};

type RootState = ReturnType<typeof rootReducer>;

type AppStore = ReturnType<typeof setupStore>;

type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;