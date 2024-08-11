import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'products/api',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://6275fcfd15458100a6a9c207.mockapi.io/api/v1/form",
    }),
    refetchOnFocus: false,
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ()=> "",
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;