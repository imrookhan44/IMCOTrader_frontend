import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';
const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (details) => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
        body: details,
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
      providesTags: ['Product'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
