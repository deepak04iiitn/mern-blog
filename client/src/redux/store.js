import { configureStore , combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user : userReducer,
});

const persistConfig = {
  key : 'root',
  storage,
  version : 1,
}

// redux persist is used to save the user in our local storage if we are using redux toolkit
const persistedReducer = persistReducer(persistConfig , rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>                          // to prevent default errors
    getDefaultMiddleware({ serializableCheck : false }),
});

export const persistor = persistStore(store);

