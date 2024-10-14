import {configureStore} from '@reduxjs/toolkit';

import {useDispatch} from 'react-redux';
import {RestApi} from './reducer/RestfulApi';
import IssueReducer from './reducer/IssueReducer';

export const store = configureStore({
  reducer: {
    issue: IssueReducer,
    [RestApi.reducerPath]: RestApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(RestApi.middleware),
});

export const useAppDispatch = () => useDispatch();
