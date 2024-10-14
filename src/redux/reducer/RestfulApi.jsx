// api.js
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {createApi} from '@reduxjs/toolkit/query/react';
// import {API_URL} from '@env';

export const RestApi = createApi({
  reducerPath: 'RestApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.naviedu.dev/'}),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'v1/identity/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: 'v1/identity/users',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation} = RestApi;
