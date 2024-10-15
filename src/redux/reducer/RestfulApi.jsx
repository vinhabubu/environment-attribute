// api.js
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {createApi} from '@reduxjs/toolkit/query/react';
// import {API_URL} from '@env';

export const RestApi = createApi({
  reducerPath: 'RestApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/'}),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation} = RestApi;
