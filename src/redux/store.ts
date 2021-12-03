import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import AsyncStorage from '@react-native-community/async-storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunkMiddleware from '../core/middleWare/middleWare';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
}

// AsyncStorage.clear();

const persistedReducer = persistReducer(persistConfig, reducers);

const middleWare = [
	thunkMiddleware(),
];

export const configureStore = (callback?: () => void) => {
	const store = createStore(persistedReducer, composeWithDevTools({})(applyMiddleware(...middleWare)));
	const persistor = persistStore(store, {}, callback);

	return { store, persistor };
}