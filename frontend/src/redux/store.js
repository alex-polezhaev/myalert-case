import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage/index.js';
import userReducer from './slices/user.js';
import accountsReducer from './slices/accounts.js';
import connectorsReducer from './slices/connectors.js';
import combinationsReducer from './slices/combinations.js';

const persistConfig = { key: 'root', storage };
const reducers = combineReducers({
  user: userReducer,
  accounts: accountsReducer,
  connectors: connectorsReducer,
  combinations: combinationsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
