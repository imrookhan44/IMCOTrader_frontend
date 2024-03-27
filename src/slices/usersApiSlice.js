import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';
const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = userApiSlice;
