// api.js
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {createApi} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '@env';


export const RestApi = createApi({
  reducerPath: 'RestApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
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
    getBuilding: builder.mutation({
      query: credentials => ({
        url: 'buildings',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials?.token}`,
        },
      }),
    }),
    createBuilding: builder.mutation({
      query: credentials => ({
        url: 'buildings',
        method: 'POST',
        body: credentials?.body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials?.token}`,
        },
      }),
    }),
    createAttribute: builder.mutation({
      query: credentials => ({
        url: 'assessment',
        method: 'POST',
        body: credentials?.body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials?.token}`,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: credentials => ({
        url: `users/update/${credentials?.id}`,
        method: 'PUT',
        body: credentials?.body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials?.token}`,
        },
      }),
    }),
    getAttributeByUser: builder.mutation({
      query: credentials => ({
        url: `assessment/user/${credentials?.id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials?.token}`,
        },
      }),
    }),
    updateBuilding: builder.mutation({
      query: credentials => ({
        url: `buildings/${credentials?.id}`,
        method: 'PUT',
        body: credentials?.body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials?.token}`,
        },
      }),
    }),
    getAllAttribute: builder.mutation({
      query: credentials => ({
        url: 'assessment',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials?.token}`,
        },
      }),
    }),
    getAllUser: builder.mutation({
      query: credentials => ({
        url: 'users',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials?.token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetBuildingMutation,
  useCreateAttributeMutation,
  useUpdateUserMutation,
  useGetAttributeByUserMutation,
  useCreateBuildingMutation,
  useUpdateBuildingMutation,
  useGetAllAttributeMutation,
  useGetAllUserMutation,

} = RestApi;
